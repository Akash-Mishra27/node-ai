import { CloudClient } from 'chromadb'
import dotenv from 'dotenv'
import { generateEmbeddings } from './index.js'
import e from 'express'
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

async function main() {
    const embedContent = await generateEmbeddings(
        [
            "Akash works in bajaj finserv as a software engineer.",
            "Akash is learning AI models and their integration with nodejs.",
            "Akash is interested in generative AI models.",
            "Akash lives in bangalore.",
            "Akash is 25 years old."
        ]
    )
    console.log("wmbed", embedContent.embeddings);
    const collection = await chroma.getOrCreateCollection({
        name: 'usersData'
    });
    collection.add({
        ids: ['1', '2', '3', '4', '5'],
        // metadatas: [{name: 'akash data'}],
        documents: [
            "Akash works in bajaj finserv as a software engineer.",
            "Akash is learning AI models and their integration with nodejs.",
            "Akash is interested in generative AI models.",
            "Akash lives in bangalore.",
            "Akash is 25 years old."
        ],
        embeddings: embedContent.embeddings.map(item => item.values)
    }
    )
    console.log("Data stored");

}

async function findSimilarity() {
    const collection = await chroma.getOrCreateCollection({
        name: 'usersData'
    });
    const queryEmbedding = await generateEmbeddings("waht is age of Akash");
    const results = await collection.query({
        queryEmbeddings: [queryEmbedding.embeddings[0].values],
        nResults: 1,
    });
    console.log("Similarity Results:", results);
}

findSimilarity();
// main();