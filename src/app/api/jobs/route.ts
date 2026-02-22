import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { query } = await req.json();
        const role = query?.trim() || "Software Engineer";

        const { text } = await generateText({
            model: groq('llama-3.3-70b-versatile'), // Using a stronger model for reliable formatting
            system: `You are a realistic simulated deep-scraping job board API. 
Return ONLY a valid JSON array of exactly 5 highly-relevant job opportunities that match the user's requested role. 
DO NOT INCLUDE ANY OTHER TEXT, DO NOT WRAP IN MARKDOWN BLOCKS (\`\`\`json). OUTPUT RAW JSON ONLY.

Each object in the array MUST strictly follow this structure:
{
  "id": "(generate a random string)",
  "title": "Realistic Job Title",
  "company": "Plausible Company Name",
  "location": "City, State or Remote",
  "salary": "Salary Range string (e.g. $140k - $180k)",
  "source": "Realistic Platform Name (e.g. LinkedIn, Greenhouse)",
  "posted": "Time ago string (e.g. 2h ago)",
  "match": (integer between 85 and 99),
  "tags": ["Skill 1", "Skill 2", "Skill 3"],
  "link": "https://linkedin.com/jobs/view/mock-id"
}

Make the jobs look highly realistic, impressive, and tailored to the requested role. Provide realistic URLs in the "link" field.`,
            prompt: `Find me 5 outstanding jobs for this role: ${role}`
        });

        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const parsedJobs = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);

        return NextResponse.json(parsedJobs);
    } catch (error) {
        console.error("Failed to generate AI jobs", error);

        // Fallback if AI fails or rate limits
        return NextResponse.json([
            {
                id: "fallback-1",
                title: "Senior Role",
                company: "TechNexus",
                location: "Remote",
                salary: "$120k+",
                source: "LinkedIn Search",
                posted: "Just now",
                match: 95,
                tags: ["Leadership", "Strategy"],
                link: "https://linkedin.com/jobs"
            }
        ]);
    }
}
