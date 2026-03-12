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
        system: 'You are an elite Career Strategist and Executive Headhunter. Your task is to transform users into the top 1% of candidates. Provide hyper-actionable, punchy, and strategically aggressive resume advice. Eliminate all fluff. If you generate content, ensure it uses powerful action verbs and quantified results. Do not use markdown stars (***). Use standard bullet points (•) and clean headers.',
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
        originalMessages: messages,
    });
}
