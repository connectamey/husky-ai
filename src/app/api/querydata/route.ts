//@ts-nocheck
import { NextResponse } from "next/server";
import { queryData, queryMessage } from "@/lib/pineconeClient";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const text = url.searchParams.get("text");

        // Check if ID parameter is provided and valid
        if (!text) {
            console.error('No text query provided');
            return NextResponse.json({ success: false, message: "Missing text query parameter" }, { status: 400 });
        }
        console.log('Text Query----->',text)

        // Query message with the provided ID
        const documents = await queryMessage(text);
        if (!documents || !documents.length) {
            console.error('No valid response or documents found for text query:', text);
            return NextResponse.json({ success: false, message: "No data found for the provided text query" }, { status: 404 });
        }

        // Extract pageContent and metadata from each document
        const data = documents.map(doc => ({
            pageContent: doc.pageContent,
            metadata: doc.metadata
        }));

        // Uncomment the following line to see the response from queryMessage in your console logs
        // console.log('Documents response:', data);

        return NextResponse.json({ success: true, data: data });

    } catch (error) {
        console.error('Failed to query data:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
