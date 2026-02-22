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
        system: 'You are an expert Resume Builder Coach. Be concise, act like a senior HR manager giving blunt, actionable advice on bullet points, skills, and formatting.',
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
        originalMessages: messages,
    });
}
