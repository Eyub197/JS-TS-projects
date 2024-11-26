import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


if(!import.meta.env.VITE_OPENAI_API_KEY) { throw new Error("Missing OPEN_AI_API_KEY") }

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const privateKey = import.meta.env.VITE_SUPABASE_API_KEY

if(!privateKey) { throw new Error("Missing SUPABASE_API_KEY") }

const url = import.meta.env.VITE_SUPABASE_URL

if(!url) { throw new Error("Missing SUPABASE_URL") }

export const supabase = createClient(url, privateKey)

const splitDocument = async document => {
    const response = await fetch(document)
    const text = await response.text()
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 250,
        chunkOverlap: 35,
    })
    const output = await splitter.createDocuments([text])
    return output
}

const createAndStoreEmbeddings = async () => {
    const chunkData = await splitDocument('movies.txt')
    const data = await Promise.all(
        chunkData.map(async (chunk) => {
          const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: chunk.pageContent
          })

          return { 
            content: chunk.pageContent, 
            embedding: embeddingResponse.data[0].embedding 
          }
        })
    )
    await supabase.from('movies').insert(data)
}

createAndStoreEmbeddings()