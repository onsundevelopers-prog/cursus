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
        system: 'You are an expert Career Link Setup Coach. Help users build their online portfolio and showcase their skills effectively.',
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
        originalMessages: messages,
    });
}
