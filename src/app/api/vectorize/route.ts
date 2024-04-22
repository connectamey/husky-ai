// import { NextResponse } from "next/server";
// import { z } from "zod";

// const bodyParser = z.object({
//   text: z.string(),
// });

// export async function POST(req: Request, res: Response) {
//   try {
//     const body = await req.json();
//     const { text } = bodyParser.parse(body);

//     if (!text || text.trim() === "") {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Text is required and cannot be empty",
//         },
//         { status: 400 }
//       );
//     }

//     // Here you would normally call an external service to vectorize the text
//     // For demo purposes, let's generate a dummy vector of size 384
//     const vector = Array.from({ length: 764 }, () => Math.random() - 0.5);

//     // Ideally, you would store the vector in the database or perform another action here
//     // For simplicity, we will just return the vector in the response
//     return NextResponse.json({ vector });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Invalid body",
//         },
//         { status: 400 }
//       );
//     } else {
//       console.error('Error during vectorization:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Internal Server Error",
//         },
//         { status: 500 }
//       );
//     }
//   }
// }

import { NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
  text: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { text } = bodyParser.parse(body);

    if (!text || text.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Text is required and cannot be empty",
        },
        { status: 400 }
      );
    }

    // Generate a dummy vector of size 764
    const vectorValues = Array.from({ length: 768 }, () => Math.random() - 0.5);

    // Generating a dummy vector ID and metadata
    const vectorId = `vector_${new Date().getTime()}`;  // Example ID based on timestamp
    const metadata = { conversation: "standard123" };  // Example metadata

    // Structuring the response as per Pinecone upsert format
    const vectorData = {
      vectors: [
        {
          id: vectorId,
          values: vectorValues,
          metadata: metadata
        }
      ]
    };

    // Return the structured vector data for upserting
    return NextResponse.json(vectorData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body",
        },
        { status: 400 }
      );
    } else {
      console.error('Error during vectorization:', error);
      return NextResponse.json(
        {
          success: false,
          error: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  }
}

