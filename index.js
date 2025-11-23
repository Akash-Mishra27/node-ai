import {GoogleGenAI} from '@google/genai'
import express from 'express'
import dotenv from 'dotenv'
import { readFileSync, write, writeFileSync } from 'fs'
import multer from 'multer'
dotenv.config()
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.Gemini_Key || '',
})

const app = express()
const upload = multer({dest: 'uploads'})


app.get('/', (req, res) => {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="image" />
      <button type="submit">Upload Image</button>
      `)
}
)

app.post('/upload', upload.single('image'), async (req, res) => {
  const filePath = req.file.path
  if (!filePath) {
    return res.status(400).send('No file uploaded.')
  }
  const base64 = readFileSync(filePath, { encoding: 'base64' })
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
  res.send(`Response: ${response.text}`)
})
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})



function main() {
  const response  = googleGenAI.models.generateImages({
    model: 'gemini-3-pro-image-preview',
    prompt: 'A futuristic cityscape at sunset, with flying cars and towering skyscrapers, digital art',
    config: {
      // imageCount: 1,
      // imageSize: '1024x1024',
    }
  })

  const image = response.generatedImages[0].image.imageBytes
  const buffer = Buffer.from(image, 'base64')
  writeFileSync('generated_image.png', buffer)
  console.log(response);
  
}
main()