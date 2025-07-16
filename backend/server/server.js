import express from "express";
import { supabase } from "./config/supabase.js";


const app = express();

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
    const { title, description, due_date, time, is_completed } = request.body;
    
    // Basic validation
    if (!title || !due_date || !time) {
      return response.status(400).json({ 
        error: "Title, due_date, and time are required" 
      });
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, description, due_date, time, is_completed: false }])
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

    const { data, error } = await supabase
      .from("tasks")
      .update({ title, description, due_date, time, is_completed })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    response.json(data);
  } catch (error) {
    console.error("Error updating task:", error);
    response.status(500).json({ error: "Failed to update task" });
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
    const { title, description, due_date, time, is_completed, parent } = request.body;
    
    if (!title || !parent) {
      return response.status(400).json({ 
        error: "Title and parent are required" 
      });
    }

    const { data, error } = await supabase
      .from("subtasks")
      .insert([{ title, description, due_date, time, is_completed, parent }])
      .select("*")
      .single();
    
    if (error) throw error;
    response.status(201).json(data);
  } catch (error) {
    console.error("Error creating subtask:", error);
    response.status(500).json({ error: "Failed to create subtask" });
  }
});

// PUT update subtask
app.put("/subtasks/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description, due_date, time, is_completed } = request.body;
    const { data, error } = await supabase
      .from("subtasks")
      .update({ title, description, due_date, time, is_completed })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    response.json(data);
  } catch (error) {
    console.error("Error updating subtask:", error);
    response.status(500).json({ error: "Failed to update subtask" });
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

app.listen(PORT, () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${PORT}...`
  )
);