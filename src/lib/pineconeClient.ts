// @ts-nocheck
// src/lib/pineconeClient.ts
import { Pinecone } from '@pinecone-database/pinecone';
import { z } from "zod";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Document } from "@langchain/core/documents";

// Define the input schema using zod
const textValidator = z.object({
  text: z.string().min(1).trim(),
});

const pineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});
const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX_NAME_2);

export async function upsertData(vectors: Array<{ id: string; values: number[]; metadata: any }>) {
  const index = pineconeClient.index('myindex');
  return index.namespace('prompt').upsert(vectors);
}


export async function queryData(queryVector: number[]) {
  const index = pineconeClient.index(process.env["PINECONE_INDEX_NAME_2 "]);
  return index.namespace('prompt').query({
    topK: 2,
    vector: queryVector,
    includeValues: true,
    includeMetadata: true,
  });
}

export async function queryMessage(query: string){
  try {

    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { pineconeIndex }
    );

    /* Search the vector DB independently with metadata filters */
    const results = await vectorStore.similaritySearch( query );

    return results

  }catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return {
        success: false,
        error: "Invalid input: Text is required and cannot be empty."
      };
    }
    else {
      console.error('Error during vectorization:', error);
      return {
        success: false,
        error: "Internal Server Error"
      };
    }
  }
}
export async function vectorizeData(docs:Document[]){
  try{
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
      maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    });
    return {
      success: true,
      message: "Data vectorized successfully."
    };
  }catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return {
        success: false,
        error: "Invalid input: Text is required and cannot be empty."
      };
    }
    else {
      console.error('Error during vectorization:', error);
      return {
        success: false,
        error: "Internal Server Error"
      };
    }
  }
}