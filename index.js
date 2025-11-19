import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OpenAI_Key,
});

const context = [
  { role: "system",
    content: "keep answers short and concise ",
  },
]


async function aiAnswer(question) {
  context.push({ role: "user", content: question });
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: context,
  });
  context.push({ role: "assistant", content: response.output_text });
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

