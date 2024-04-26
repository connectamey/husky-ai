// pages/api/pinecone.ts
import { NextResponse } from "next/server";
import { vectorizeData } from "@/lib/pineconeClient";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Request Body----> ', body)
        // Validate body and extract documents
        if (!body.documents || !Array.isArray(body.documents)) {
            console.error('Invalid request: Missing or invalid documents array');
            return NextResponse.json({ success: false, message: "Missing or invalid documents array" }, { status: 400 });
        }

        // Call the vectorizeData function with the documents from the request body
        const vectorizeResponse = await vectorizeData(body.documents);
        console.log('Vectorized Response',vectorizeResponse)
        // Check if vectorization was successful
        // @ts-ignore
        if (!vectorizeResponse.success) {
            // @ts-ignore
            console.error('Vectorization failed:', vectorizeResponse.error);
            return NextResponse.json(vectorizeResponse, { status: 400 });
        }

        // If vectorization is successful, you might need to handle the response further or use it
        // Send a JSON response with the vectorization result
        return NextResponse.json({ success: true, data: vectorizeResponse });
    } catch (error) {
        console.error('Failed to process request:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


