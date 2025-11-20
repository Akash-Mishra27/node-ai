import OpenAI from "openai";
import dotenv from "dotenv";
import { writeFileSync, createReadStream } from "fs";


dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OpenAI_Key,
});

async function main() {
  const response = await client.audio.transcriptions.create({
    file: createReadStream("audio.mp3"),
    model: "whisper-1",
    response_format: "text",
    language: "en",
  });
  console.log("Transcription:", response);

  writeFileSync("transcription.txt", response.text,"utf-8");
}

main();