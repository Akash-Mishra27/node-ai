import {CloudClient} from 'chromadb'
import dotenv from 'dotenv'
import { generateEmbeddings } from './index.js'
dotenv.config()

const chroma = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY || '',
  tenantId: process.env.CHROMA_TENANT || '',
  databaseName: process.env.CHROMA_DATABASE || '',
})

// without embedding
// async function main(){
//   console.log("Chroma Client Initialized:", chroma);
//   const collection = await chroma.getCollection({
//     name: 'node-ai-collection'
//   });
//   collection.add({
//     ids: ['2'],
//     metadatas: [{name: 'dog'}],
//     documents: ['Dog is a domesticated carnivorous mammal.'],
//     embeddings: [[0.4,0.5,0.4,0.2]]
//   }
//   )
// }

// with embedding make sure structure will be same as chroma embedding structure

async function main(){
    const embedContent = await generateEmbeddings("apple")
  console.log("Chroma Client Initialized:", chroma);
  const collection = await chroma.getOrCreateCollection({
    name: 'colors'
  });
  collection.add({
    ids: ['4'],
    metadatas: [{name: 'apple'}],
    documents: ['apple is a fruit'],
    embeddings: [embedContent.embeddings[0].values]
  }
  )
  console.log("Data stored");
  
}

async function findSimilarity(){
const collection = await chroma.getOrCreateCollection({
    name: 'colors'
  });
  const queryEmbedding = await generateEmbeddings("get me fruit");
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding.embeddings[0].values],
    nResults: 1,
  });
  console.log("Similarity Results:", results);
}

findSimilarity();
// main();