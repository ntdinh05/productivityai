import express from "express";
import env from "dotenv";

env.config();

import { createClient } from "@supabase/supabase-js"; 

const app = express();

const supabase = createClient(process.env.DATABASE_URL,process.env.DATABASE_KEY);

app.get("/", (_, response) =>
  response.json({ info: "Express app with Supabase" })
);

app.listen(process.env.PORT, () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${process.env.PORT}...`
  )
);



