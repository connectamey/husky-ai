// utils/transcriptService.ts
import fetch from 'node-fetch';

interface TranscriptResponse {
    status: string;
    text?: string;
    id?: string;
}

// Ensure your API key is correctly configured in your .env.local file
// Using a non-null assertion here because we are confident the key should be there.
const apiKey = process.env.ASSEMBLYAI_API_KEY!; 

/**
 * Fetches the transcript for a given video URL using the AssemblyAI API.
 * @param videoUrl The URL of the video to transcribe.
 * @returns The transcript as a string.
 */
export async function fetchTranscript(videoUrl: string): Promise<string> {
    const transcriptEndpoint = 'https://api.assemblyai.com/v2/transcript';

    // Start transcription
    const startResponse = await fetch(transcriptEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ audio_url: videoUrl })
    });
    const startData: TranscriptResponse = await startResponse.json();

    // Check if transcription was successfully started
    if (startData.status === 'queued' || startData.status === 'processing') {
        // Poll for results
        return await pollForTranscript(startData.id as string);
    } else {
        throw new Error('Failed to start the transcription process');
    }
}

/**
 * Polls the AssemblyAI API to retrieve the completed transcript.
 * @param transcriptId The ID of the transcription to poll for.
 * @returns The completed transcript as a string.
 */
async function pollForTranscript(transcriptId: string): Promise<string> {
    const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;
    
    while (true) {
        const result = await fetch(pollingEndpoint, {
            headers: {
                'Authorization': apiKey
            }
        });
        const data: TranscriptResponse = await result.json();

        if (data.status === 'completed' && data.text) {
            return data.text.replace(/\n/g, " ");  // Replace new lines with spaces
        } else if (data.status === 'failed') {
            throw new Error('Transcription failed');
        }

        // Wait for 5 seconds before retrying if the transcription is still processing
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}
