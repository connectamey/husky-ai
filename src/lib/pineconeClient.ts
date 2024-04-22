// src/lib/pineconeClient.ts
import { Pinecone } from '@pinecone-database/pinecone';

export const pineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

export async function upsertData(vectors: Array<{ id: string; values: number[]; metadata: any }>) {
  const index = pineconeClient.index('myindex');
  return index.namespace('prompt').upsert(vectors);
}





export async function queryData(queryVector: number[]) {
  const index = pineconeClient.index('myindex');
  return index.namespace('prompt').query({
    topK: 2,
    vector: queryVector,
    includeValues: true,
    includeMetadata: true,
  });
}
