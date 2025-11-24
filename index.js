import {GoogleGenAI} from '@google/genai'
import express from 'express'
import dotenv from 'dotenv'
import { readFileSync, write, writeFileSync } from 'fs'
import multer from 'multer'
dotenv.config()
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.Gemini_Key || '',
})

const data = ["dog","cat","bird"]

async function main() {
  const response =await googleGenAI.models.embedContent({
    model: 'gemini-embedding-001',
    contents: data,
  }) 
  console.log(response.embeddings);
  const manageEmbeedings= response.embeddings.map((embedding, index) => {
    const itemKey = data[index];
    return {
      [itemKey] : embedding.values
    }
  })
  writeFileSync('output.json',JSON.stringify(manageEmbeedings))
}
main()