import OpenAI from "openai";
import dotenv from "dotenv";
import { encoding_for_model } from "tiktoken";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OpenAI_Key,
});


async function aiAnswer(question) {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: question,
  });

  console.log(response.output_text)
}
process.stdout.write("Ask me anything: ");
process.stdin.on("data", (data) => {
  const question = data.toString().trim();
  if(question.toLowerCase() === "exit") {
    process.exit();
  }
  aiAnswer(question);
});

