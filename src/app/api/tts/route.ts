// src/app/api/tts/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        const apiKey = process.env.SPEECH_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'Speech API key not configured' }, { status: 500 });
        }

        // We assume Cartesia because the key is sk_ + 64 hex characters
        // Cartesia TTS endpoint
        const response = await fetch('https://api.cartesia.ai/tts/bytes', {
            method: 'POST',
            headers: {
                'Cartesia-Version': '2024-06-10',
                'X-API-Key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model_id: 'sonic-english',
                transcript: text,
                voice: {
                    mode: 'id',
                    id: '794f9389-43e3-45b4-bc8b-1b9ed371457f', // Sonic (English) - default voice
                },
                output_format: {
                    container: 'mp3',
                    encoding: 'mp3',
                    sample_rate: 44100,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Cartesia API error:', errorText);

            // If Cartesia fails, try ElevenLabs as a fallback with the same key
            // (Just in case it's actually an ElevenLabs key and the length was misleading)
            const elResponse = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4llvDq8ikWAM', {
                method: 'POST',
                headers: {
                    'xi-api-key': apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_monolingual_v1',
                }),
            });

            if (elResponse.ok) {
                return new Response(elResponse.body);
            }

            return NextResponse.json({ error: 'TTS request failed' }, { status: response.status });
        }

        return new Response(response.body);
    } catch (error: any) {
        console.error('TTS Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
