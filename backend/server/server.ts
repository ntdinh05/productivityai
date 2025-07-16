import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();

// Environment variables with type safety
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_KEY = process.env.DATABASE_KEY;
const PORT = process.env.PORT || 3000;

if (!DATABASE_URL || !DATABASE_KEY) {
  throw new Error('Missing required environment variables: DATABASE_URL and DATABASE_KEY');
}

const supabase = createClient(DATABASE_URL, DATABASE_KEY);

// Middleware
app.use(express.json());

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Types for your data models
interface Task {
  id?: string;
  title: string;
  description?: string;
  due_date: string;
  time: string;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

interface SubTask {
  id?: string;
  title: string;
  description?: string;
  due_date: string;
  time: string;
  is_completed: boolean;
  parent: string;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

// Helper function to create consistent API responses
const createResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string,
  count?: number
): ApiResponse<T> => ({
  success,
  data,
  message,
  error,
  count
});

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json(createResponse(true, {
    info: "Express app with Supabase (TypeScript)",
    timestamp: new Date().toISOString(),
    endpoints: ["/tasks", "/subtasks"]
  }, "Server is running"));
});

// GET all tasks
app.get("/tasks", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    res.status(200).json(createResponse(
      true,
      data || [],
      "Tasks retrieved successfully",
      undefined,
      data?.length || 0
    ));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json(createResponse(
      false,
      undefined,
      undefined,
      "Failed to fetch tasks"
    ));
  }
});

// POST new task
app.post("/tasks", async (request: Request, response: Response) => {
  try {
    const { title, description, due_date, time, is_completed }: Partial<Task> = request.body;
    
    // Basic validation
    if (!title || !due_date || !time) {
      return response.status(400).json(createResponse(
        false,
        undefined,
        undefined,
        "Title, due_date, and time are required"
      ));
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, description, due_date, time, is_completed: false }])
      .select()
      .single();
    
    if (error) throw error;
    
    response.status(201).json(createResponse(
      true,
      data,
      "Task created successfully"
    ));
  } catch (error) {
    console.error("Error creating task:", error);
    response.status(500).json(createResponse(
      false,
      undefined,
      undefined,
      "Failed to create task"
    ));
  }
});

// PUT update task
app.put("/tasks/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { title, description, due_date, time, is_completed }: Partial<Task> = request.body;

    const { data, error } = await supabase
      .from("tasks")
      .update({ title, description, due_date, time, is_completed })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    
    response.status(200).json(createResponse(
      true,
      data,
      "Task updated successfully"
    ));
  } catch (error) {
    console.error("Error updating task:", error);
    response.status(500).json(createResponse(
      false,
      undefined,
      undefined,
      "Failed to update task"
    ));
  }
});

// DELETE task
app.delete("/tasks/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) throw error;
    
    response.status(200).json(createResponse(
      true,
      undefined,
      "Task deleted successfully"
    ));
  } catch (error) {
    console.error("Error deleting task:", error);
    response.status(500).json(createResponse(
      false,
      undefined,
      undefined,
      "Failed to delete task"
    ));
  }
});

// GET all subtasks
app.get("/subtasks", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("subtasks")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    res.status(200).json(createResponse(
      true,
      data || [],
      "Subtasks retrieved successfully",
      undefined,
      data?.length || 0
    ));
  } catch (error) {
    console.error("Error fetching subtasks:", error);
    res.status(500).json(createResponse(
      false,
      undefined,
      undefined,
      "Failed to fetch subtasks"
    ));
  }
});

// POST new subtask
app.post("/subtasks", async (request: Request, response: Response) => {
  try {
    const { title, description, due_date, time, is_completed, parent }: Partial<SubTask> = request.body;
    
    if (!title || !parent) {
      return response.status(400).json(createResponse(
        false,
        undefined,
        undefined,
        "Title and parent are required"
      ));
    }

    const { data, error } = await supabase
      .from("subtasks")
      .insert([{ title, description, due_date, time, is_completed: is_completed || false, parent }])
      .select()
      .single();
    
    if (error) throw error;
    
    response.status(201).json(createResponse(
      true,
      data,
      "Subtask created successfully"
    ));
  } catch (error) {
    console.error("Error creating subtask:", error);
    response.status(500).json(createResponse(
      false,
      undefined,
      undefined,
      "Failed to create subtask"
    ));
  }
});

// PUT update subtask
app.put("/subtasks/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { title, description, due_date, time, is_completed }: Partial<SubTask> = request.body;
    
    const { data, error } = await supabase
      .from("subtasks")
      .update({ title, description, due_date, time, is_completed })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    
    response.status(200).json(createResponse(
      true,
      data,
      "Subtask updated successfully"
    ));
  } catch (error) {
    console.error("Error updating subtask:", error);
    response.status(500).json(createResponse(
      false,
      undefined,
      undefined,
      "Failed to update subtask"
    ));
  }
});

// DELETE subtask
app.delete("/subtasks/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const { error } = await supabase
      .from("subtasks")
      .delete()
      .eq("id", id);

    if (error) throw error;
    
    response.status(200).json(createResponse(
      true,
      undefined,
      "Subtask deleted successfully"
    ));
  } catch (error) {
    console.error("Error deleting subtask:", error);
    response.status(500).json(createResponse(
      false,
      undefined,
      undefined,
      "Failed to delete subtask"
    ));
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json(createResponse(
    false,
    undefined,
    undefined,
    'Internal server error'
  ));
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json(createResponse(
    false,
    undefined,
    undefined,
    `Cannot ${req.method} ${req.originalUrl}`
  ));
});

app.listen(PORT, () => {
  console.log(`${new Date().toLocaleTimeString()}: TypeScript Server is running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`Database connected to Supabase`);
});

export default app;