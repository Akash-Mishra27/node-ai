import {GoogleGenAI} from '@google/genai'
import dotenv from 'dotenv'
dotenv.config()
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.Gemini_Key || '',
})


async function main() {
  const response  = await googleGenAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: "Tell me about india",
    config: {
      systemInstruction: "tell me in 50 words",
      // maxOutputTokens: 1024,
      temperature: 2.0,
      thinkingConfig: {
        // enabled: true,
        includeThoughts: true,
      },
    },
  })
  console.log(response.candidates[0].content);
}
main()