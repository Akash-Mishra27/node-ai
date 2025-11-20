import OpenAI from "openai";
import dotenv from "dotenv";
import { writeFileSync, createReadStream } from "fs";
import express from "express";
import multer from "multer";

const app = express();

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OpenAI_Key,
});


const storage = multer.diskStorage({
  diskStorage: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `audiofile-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="audiofile" accept="audio/*" />
    <button type="submit">Upload Audio</button>
  </form>`);
});


app.post("/upload", upload.single("audio"),async (req, res) => {
  try {
    const filePath = req.file.path;
    const response = await client.audio.transcriptions.create({
      file: createReadStream(filePath),
      model: "whisper-1",
      response_format: "text",
    });
    writeFileSync("transcription.txt", response,"utf-8");
    res.send(`Transcription completed. ${response.text}`);
  } catch (error) {
    console.error("Error during transcription:", error);
    res.status(500).send("An error occurred during transcription.");
  }
});

      


app.listen(3200, () => {
  console.log("Server is running on http://localhost:3200");
});