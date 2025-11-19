import OpenAI from "openai";
import dotenv from "dotenv";
import { encoding_for_model } from "tiktoken";

dotenv.config();


const project="node-ai"
console.log(`Project Name: ${project}`);


const openai = new OpenAI({apiKey: process.env.OpenAI_Key});

// const response = await openai.responses.create({
//   instructions: "Provide the color of the given fruit.",
//   model: "gpt-4o",
//   input:"color of apple",
// });
const prompt = "Explain the theory of relativity in simple terms.";
const model = "gpt-4o";
const responses = await openai.responses.create({
  model: model,
  input: [
    // { role: "system", content: "answer in hindi language" },
    // { role: "developer", content: "gave a basic example in js" },
    { role: "user", content: prompt }
  ],
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a helpful assistant that provides concise answers." },
    { role: "user", content: "What is the capital of France?" }
  ],
  max_tokens: 50,
});


function countTokens(text, model = "gpt-4o") {
  const encoder = encoding_for_model(model);
  const tokenCount = encoder.encode(text).length;
  encoder.free();
  return tokenCount;
}
console.log(response);
