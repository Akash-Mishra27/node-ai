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
    <form action="/generate" method="post" enctype="multipart/form-data">
      <input type="text" name="imageText" />
      <button type="submit">Genrate Image</button>
      `)
}
)

app.post('/generate', express.urlencoded({ extended: true }), async (req, res) => {
  const imageText = req.body.imageText
  const response  = await main(imageText)
  res.send(`Image generated and saved as generated_image.png`)
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



function main(image) {
  const response  = googleGenAI.models.generateImages({
    model: 'gemini-3-pro-image-preview',
    prompt: image,
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
// main()