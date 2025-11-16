import OpenAI from "openai";
const project="node-ai"
console.log(`Project Name: ${project}`);
const apiKey = process.env.OPEN_AI
console.log(`Project Name: ${apiKey}`);


const openai = new OpenAI({apiKey: apiKey});

const response = await openai.responses.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: "Write a hello world program in python",
    },
  ],
});

console.log(response);
