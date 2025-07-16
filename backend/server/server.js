import express from "express";
import env from "dotenv";

env.config();

import { createClient } from "@supabase/supabase-js"; 

const app = express();

const supabase = createClient(process.env.DATABASE_URL,process.env.DATABASE_KEY);
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (_, response) =>
  response.json({ info: "Express app with Supabase" })
);


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
});

app.listen(process.env.PORT, () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${process.env.PORT}...`
  )
);