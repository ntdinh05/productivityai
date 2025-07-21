import express from "express";
import { supabase } from "./config/supabase.js";


const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (_, response) =>
  response.json({ info: "Express app with Supabase" })
);


// GET all tasks
app.get("/tasks", async (_, response) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    response.json(data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    response.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST new task
app.post("/tasks", async (request, response) => {
  try {
    const { title, description, due_date, time, is_completed, user_id } = request.body;
    
    console.log("Creating task with data:", { title, description, due_date, time, is_completed, user_id });
    
    // Basic validation
    if (!title || !due_date || !time) {
      return response.status(400).json({ 
        error: "Title, due_date, and time are required" 
      });
    }

    // Use provided user_id or null (some tasks can be created without user_id)
    const taskData = {
      title,
      description,
      due_date,
      time,
      is_completed: is_completed || false,
      user_id: user_id || null
    };

    console.log("Inserting task with data:", taskData);

    const { data, error } = await supabase
      .from("tasks")
      .insert([taskData])
      .select("*")
      .single();
    if (error) throw error;
    response.status(201).json(data);
  } catch (error) {
    console.error("Error creating task:", error);
    response.status(500).json({ error: "Failed to create task" });
  }
});

// PUT update task
app.put("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description, due_date, time, is_completed } = request.body;

    console.log(`Updating task ${id} with data:`, { title, description, due_date, time, is_completed });

    const { data, error } = await supabase
      .from("tasks")
      .update({ title, description, due_date, time, is_completed })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error updating task:", error);
      throw error;
    }
    
    console.log("Task updated successfully:", data);
    response.json(data);
  } catch (error) {
    console.error("Error updating task:", error);
    response.status(500).json({ error: "Failed to update task", details: error.message });
  }
});

// DELETE task
app.delete("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) throw error;
    response.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    response.status(500).json({ error: "Failed to delete task" });
  }
});

// Subtasks endpoints

// GET all subtasks
app.get("/subtasks", async (_, response) => {
  try {
    const { data, error } = await supabase
      .from("subtasks")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    response.json(data);
  } catch (error) {
    console.error("Error fetching subtasks:", error);
    response.status(500).json({ error: "Failed to fetch subtasks" });
  }
});

// POST new subtask
app.post("/subtasks", async (request, response) => {
  try {
    const { title, description, due_date, time, is_completed, parent, user_id } = request.body;
    
    console.log("Creating subtask with data:", { title, description, due_date, time, is_completed, parent, user_id });
    
    if (!title || !parent) {
      console.log("Validation failed: missing title or parent");
      return response.status(400).json({ 
        error: "Title and parent are required" 
      });
    }

    // Use provided user_id or a default UUID if not provided
    const defaultUserId = "77cd5029-91ff-4d91-854b-7ae0b8339b3e"; // Default user for testing
    const subtaskData = {
      title,
      description,
      due_date,
      time,
      is_completed: is_completed || false,
      parent,
      user_id: user_id || defaultUserId
    };

    console.log("Inserting subtask with data:", subtaskData);

    const { data, error } = await supabase
      .from("subtasks")
      .insert([subtaskData])
      .select("*")
      .single();
    
    if (error) {
      console.error("Supabase error creating subtask:", error);
      throw error;
    }
    
    console.log("Subtask created successfully:", data);
    response.status(201).json(data);
  } catch (error) {
    console.error("Error creating subtask:", error);
    response.status(500).json({ error: "Failed to create subtask", details: error.message });
  }
});

// PUT update subtask
app.put("/subtasks/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description, due_date, time, is_completed } = request.body;
    
    console.log(`Updating subtask ${id} with data:`, { title, description, due_date, time, is_completed });
    
    const { data, error } = await supabase
      .from("subtasks")
      .update({ title, description, due_date, time, is_completed })
      .eq("id", id)
      .select("*")
      .single();
      
    if (error) {
      console.error("Supabase error updating subtask:", error);
      throw error;
    }
    
    console.log("Subtask updated successfully:", data);
    response.json(data);
  } catch (error) {
    console.error("Error updating subtask:", error);
    response.status(500).json({ error: "Failed to update subtask", details: error.message });
  }
});

// DELETE task
app.delete("/subtasks/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const { error } = await supabase
      .from("subtasks")
      .delete()
      .eq("id", id);

    if (error) throw error;
    response.json({ message: "Subtask deleted successfully" });
  } catch (error) {
    console.error("Error deleting subtask:", error);
    response.status(500).json({ error: "Failed to delete subtask" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${PORT}...`
  )
);