import OpenAI from "openai";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OpenAI_Key,
});

async function main() {
  const response = await client.images.generate({
    model: "dall-e-3",
    prompt: "A futuristic cityscape at sunset, with flying cars and towering skyscrapers, in the style of cyberpunk art",
    size: "1024x1024",
    response_format: "b64_json",
    n: 1,
  });
  console.log(response.data);

  const imageData = response.data[0].b64_json;
  const path = "./futuristic_cityscape.png";
  writeFileSync(path, Buffer.from(imageData, "base64"));
  console.log(`Image saved to ${path}`);
}

main();
