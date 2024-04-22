// pages/api/pinecone.ts
import { NextResponse } from "next/server";
import { upsertData, queryData } from "@/lib/pineconeClient";






export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Call the upsert function with vectors from the request body
    const response = await upsertData(body.vectors);
    
    // Ensure the response is serializable
    // For demonstration, we'll assume response can be directly serialized,
    // If not, adjust accordingly, for example:
    const serializableResponse = JSON.stringify(response);
    
    // Send a JSON response with the serializable part of the upsert response
    return NextResponse.json({ success: true, data: serializableResponse });
  } catch (error) {
    console.error('Failed to upsert data:', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}















