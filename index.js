import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import { writefileSync } from "fs";

const app = express();

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OpenAI_Key,
});


async function main() {
  const response  = await client.audio.speech.create({
    model: "whisper-1",
    input: "helo how are you",
    voice: "alloy",
  })
  const baseRes = Buffer.from( await response.arrayBuffer());
  console.log(response);
  writefileSync("output.mp3", Buffer.from(baseRes));
  
}


main();