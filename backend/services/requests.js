import express from "express";
import env from "dotenv";

env.config();

import { createClient } from "@supabase/supabase-js"; 

const app = express();

const supabase = createClient(process.env.DATABASE_URL,process.env.DATABASE_KEY);
// Get all tasks

app.get("/tasks", async (_, response) => {
  try {
    const { data, error } = await supabase.from("tasks").select();
    console.log(data);
    return response.send(data);
  } catch (error) {
    return response.send({ error });
  }
});

//Post

app.post("/tasks", async (request, response) => {
  try {
    console.log(request.body);
    const { data, error } = await supabase.from("tasks").insert(request.body);
    if (error) {
      return response.status(400).json(error);
    }
    response.status(200).json(request.body);
  } catch (error) {
    response.send({ error });
  }
})
