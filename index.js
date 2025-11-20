import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import { writefileSync } from "fs";

const app = express();

app.use(express.urlencoded({ extended: true }));

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OpenAI_Key,
});

app.get("/", (req, res) => {
  res.send(`<Form method="POST" action="/audio">
    <input name="text" />
    <button type="submit">Submit</button>
  </Form>`);
});

app.post("/audio", async (req, res) => {
  res.send(req?.body?.text);
  const response  = await client.audio.speech.create({
    model: "whisper-1",
    input: req?.body?.text,
    voice: "alloy",
  })
  const baseRes = await response.arrayBuffer();
  console.log(response);
  writefileSync("output.mp3", Buffer.from(baseRes));
});


app.listen(3200, () => {
  console.log("Server is running on port 3200");
});