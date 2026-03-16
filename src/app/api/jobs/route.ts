import { NextResponse } from 'next/server';

const JSEARCH_API_KEY = "ak_5dv38gdb3j0u0j0bofyhxanovpd4xr4srhdi282yheogdkw";
const JSEARCH_BASE_URL = "https://jsearch.p.rapidapi.com";

export async function POST(req: Request) {
    try {
        const { query, location, remote, salary, experience } = await req.json();
        
        let searchQuery = query || "Software Engineer";
        if (location) searchQuery += ` in ${location}`;
        if (remote) searchQuery += " remote";

        const params = new URLSearchParams({
            query: searchQuery,
            page: '1',
            num_pages: '1',
            date_posted: 'all'
        });

        // Add additional filters if provided
        if (experience) params.append('experience', experience);

        const response = await fetch(`${JSEARCH_BASE_URL}/search?${params.toString()}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': JSEARCH_API_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch jobs from provider');
        }

        const data = await response.json();
        const rawJobs = data.data || [];

        // Map the real data to our app's format
        const jobs = rawJobs.map((job: any) => ({
            id: job.job_id || Math.random().toString(36).substr(2, 9),
            title: job.job_title,
            company: job.employer_name,
            location: job.job_city && job.job_state ? `${job.job_city}, ${job.job_state}` : job.job_country,
            salary: job.job_min_salary && job.job_max_salary 
                ? `$${(job.job_min_salary/1000).toFixed(0)}k - $${(job.job_max_salary/1000).toFixed(0)}k` 
                : "Salary not disclosed",
            source: job.job_publisher || "AI Provider",
            posted: job.job_posted_at_datetime_utc ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString() : "Just now",
            match: Math.floor(Math.random() * (98 - 88 + 1)) + 88, // In a real app, this would be AI calculated
            tags: [job.job_employment_type, job.job_is_remote ? "Remote" : "On-site"].filter(Boolean),
            link: job.job_apply_link,
            description: job.job_description,
            skills: job.job_highlights?.Qualifications || []
        }));

        return NextResponse.json(jobs);
    } catch (error: any) {
        console.error("Job Search API Error:", error);
        
        // Fallback with a helpful message
        return NextResponse.json({ 
            error: true, 
            message: error.message || "Something went wrong with the job search." 
        }, { status: 500 });
    }
}
