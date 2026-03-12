import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';

const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: groq('llama-3.1-8b-instant'),
        system: 'You are a Senior Technical Recruiter at a top-tier tech firm. Your goal is to conduct a high-pressure, realistic mock interview. Be incredibly sharp, observant, and critical. Ask deep follow-up questions about architecture, trade-offs, and soft skills. If the user is using voice mode, keep responses short (1-3 sentences) but punchy. Never break character.',
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
        originalMessages: messages,
    });
}
