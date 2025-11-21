import {GoogleGenAI} from '@google/genai'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.Gemini_Key || '',
})
const app = express()


app.get('/', async(req, res) => {
  const response  = await googleGenAI.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: "Tell me about ai in details",
  })

  for await (const chunk of response) {
    const text = chunk.text
    if (text) res.write(text)
    // console.log(text);
  }
  res.send("Check your console")
  // console.log(response.candidates[0].content);
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
