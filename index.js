import {GoogleGenAI} from '@google/genai'
import express from 'express'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
dotenv.config()
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.Gemini_Key || '',
})


async function main() {

  const base64 = readFileSync('test.png', { encoding: 'base64' }) 
  const response = await googleGenAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        inlineData:{
          mimeType: 'image/png',
          data: base64,
        } 
      },
      {
        text: 'read text from image',  
      },
    ]
  }
  )
  console.log('Response:', response.text)
}

main()