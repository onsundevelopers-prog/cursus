"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRightIcon,
    GlobeIcon,
    UpdateIcon,
    RocketIcon,
} from "@radix-ui/react-icons";
import { 
    Sparkles, 
    Zap, 
    Target, 
    ShieldCheck, 
    Search, 
    Database, 
    Fingerprint, 
    FileText, 
    Upload, 
    ChevronRight,
    MapPin,
    Building2,
    DollarSign,
    Briefcase,
    Lightbulb
} from "lucide-react";
import GuestBanner from "../../components/GuestBanner";
import { cn } from "@/lib/utils";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import LoadingLines from "@/components/ui/loading-lines";
import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalTitle, 
    ModalBody, 
    ModalFooter 
} from "@/components/ui/modal";

function JobsContent() {
    const searchParams = useSearchParams();
    const isGuest = searchParams.get('guest') === 'true';
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
    const [jobs, setJobs] = useState<any[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const [scanProgress, setScanProgress] = useState(0);
    const [query, setQuery] = useState("");
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [isMatching, setIsMatching] = useState(false);
    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [matchDetails, setMatchDetails] = useState<any>(null);

    const scanLogs = [
        "Connecting to WebNinja JSearch API...",
        "Scouring LinkedIn, Indeed, and Google Jobs...",
        "Filtering by location and remote status...",
        "Double-checking compensation data...",
        "Analyzing job descriptions for match accuracy...",
        "Finalizing your personalized job feed...",
        "Ready!"
    ];

    const startScan = async (searchQuery?: string) => {
        const activeQuery = searchQuery || query;
        if (!activeQuery.trim()) return;

        setStatus('scanning');
        setScanProgress(0);
        setLogs([]);

        for (let i = 0; i < scanLogs.length; i++) {
            setLogs(prev => [...prev, scanLogs[i]]);
            setScanProgress(((i + 1) / scanLogs.length) * 100);
            await new Promise(r => setTimeout(r, 400));
        }

        try {
            const res = await fetch('/api/jobs', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    query: activeQuery,
                    location: "USA", // Default
                    remote: true
                })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.message);
            setJobs(data);
            setStatus('results');
        } catch (err) {
            console.error(err);
            alert("API Error: Check your WebNinja keys or subscription.");
            setStatus('idle');
        }
    };

    const handleMatchJob = async (job: any) => {
        if (!resumeUploaded) {
            alert("Please upload your resume first to see AI matching!");
            return;
        }
        setIsMatching(true);
        // Simulate AI Matching
        await new Promise(r => setTimeout(r, 2000));
        setMatchDetails({
            score: job.match,
            reasons: [
                "Your experience with React matches perfectly.",
                "Previous work in Fintech aligns with company domain.",
                "Desired salary range is within budget."
            ],
            missing: ["Cloud Infrastructure experience", "Python (preferred)"]
        });
        setIsMatching(false);
    };

    return (
        <div style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            <GuestBanner />

            <div className="flex justify-between items-end mb-12">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ fontSize: '3.5rem', fontWeight: 850, letterSpacing: '-0.05em', lineHeight: 1 }}
                    >
                        WebNinja Job Scanner <span className="text-orange-600 italic">Pro</span>
                    </motion.h1>
                </div>
                
            </div>

            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center p-16 bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 text-center"
                    >
                        <div className="relative mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-[-20px] border-2 border-dashed border-orange-200 rounded-full opacity-50"
                            />
                            <div className="bg-orange-50 p-10 rounded-full relative z-10 border border-orange-100">
                                <Search className="w-16 h-16 text-orange-500" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-black mb-4 tracking-tight text-slate-900">
                            Real-time Search. <span className="text-orange-600 underline decoration-orange-200 underline-offset-8">Zero Noise.</span>
                        </h2>
                        <p className="text-slate-500 mb-10 max-w-xl text-lg leading-relaxed">
                            WebNinja deep-crawls 100+ platforms including LinkedIn, Indeed, and niche boards to find roles that actually match your experience.
                        </p>

                        <div className="w-full max-w-2xl">
                            <PromptInputBox 
                                placeholder="Senior Product Designer in New York (Remote)..."
                                onSend={(msg: string) => {
                                    setQuery(msg);
                                    startScan(msg);
                                }}
                                isLoading={false}
                            />
                        </div>
                        
                        <div className="flex gap-8 mt-12 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-2"><Database size={14} /> 1M+ Active Jobs</div>
                            <div className="flex items-center gap-2"><ShieldCheck size={14} /> Verified Salary</div>
                            <div className="flex items-center gap-2"><Fingerprint size={14} /> AI Score</div>
                        </div>
                    </motion.div>
                )}

                {status === 'scanning' && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-32"
                    >
                        <div className="mb-20">
                            <LoadingLines />
                        </div>
                        
                        <div className="max-w-xl w-full">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 animate-pulse">
                                    Scouring the Web with WebNinja JSearch
                                </p>
                                <span className="text-slate-900 font-black">{Math.round(scanProgress)}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-8">
                                <motion.div
                                    className="h-full bg-orange-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${scanProgress}%` }}
                                />
                            </div>
                            <div className="space-y-3">
                                <AnimatePresence mode="popLayout">
                                    {logs.slice(-3).map((log, i) => (
                                        <motion.div
                                            key={log}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider"
                                        >
                                            {log}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'results' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Feed */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-black text-2xl">{jobs.length} Matches Found</h3>
                                <button onClick={() => startScan()} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                                    <UpdateIcon className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            {jobs.map((job, idx) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => setSelectedJob(job)}
                                    className="group bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-orange-500"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-xl font-bold group-hover:text-orange-600 transition-colors">{job.title}</h4>
                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-md border border-emerald-100">
                                                    {job.match}% AI MATCH
                                                </span>
                                            </div>
                                            <p className="text-slate-500 font-semibold flex items-center gap-2 mb-4">
                                                <Building2 size={16} /> {job.company} • <MapPin size={16} /> {job.location}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                <span className="flex items-center gap-1 text-sm font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                    <DollarSign size={14} className="text-emerald-500" /> {job.salary}
                                                </span>
                                                {job.tags.map((tag: string) => (
                                                    <span key={tag} className="text-sm font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                                            <ChevronRight />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Salary Insights */}
                            <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <DollarSign className="text-orange-400" />
                                    <h3 className="font-bold">Market Insights</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Avg Salary</p>
                                        <p className="text-2xl font-black">$165,000</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Comp Growth</p>
                                        <p className="text-2xl font-black text-emerald-400">+12% YoY</p>
                                    </div>
                                    <button className="w-full py-4 bg-orange-600 hover:bg-orange-500 rounded-2xl font-bold transition-all mt-4">
                                        View Full Report
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Job Details Modal */}
            <Modal open={!!selectedJob} onOpenChange={(open) => { if (!open) { setSelectedJob(null); setMatchDetails(null); } }}>
                <ModalContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] p-0 border-none">
                    {selectedJob && (
                        <>
                            <div className="relative h-48 bg-slate-900 flex items-end p-10">
                                <div className="absolute top-6 right-6 flex gap-2">
                                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-xs font-bold border border-white/20">
                                        {selectedJob.source}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-orange-400 font-black text-xs uppercase tracking-widest mb-2">{selectedJob.company}</p>
                                    <h2 className="text-3xl font-black text-white">{selectedJob.title}</h2>
                                </div>
                            </div>
                            
                            <ModalBody className="p-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    <div className="md:col-span-2 space-y-8">
                                        <div>
                                            <h3 className="flex items-center gap-2 font-black text-lg mb-4">
                                                <Briefcase size={20} className="text-orange-500" /> Job Description
                                            </h3>
                                            <div className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
                                                {selectedJob.description || "No description provided."}
                                            </div>
                                        </div>

                                        {selectedJob.skills && selectedJob.skills.length > 0 && (
                                            <div>
                                                <h3 className="flex items-center gap-2 font-black text-lg mb-4">
                                                    <Target size={20} className="text-orange-500" /> Key Qualifications
                                                </h3>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {selectedJob.skills.map((skill: string) => (
                                                        <li key={skill} className="flex items-center gap-2 text-sm text-slate-600">
                                                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                                                            {skill}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                            <h3 className="font-black text-sm mb-4">AI Match Analysis</h3>
                                            {matchDetails ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="text-3xl font-black text-emerald-500">{matchDetails.score}%</span>
                                                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded">EXCELLENT</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {matchDetails.reasons.map((r: string, i: number) => (
                                                            <div key={i} className="flex gap-2 text-[11px] text-slate-600 leading-snug">
                                                                <Lightbulb size={14} className="text-orange-400 shrink-0" /> {r}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="pt-4 border-top border-slate-200">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Skill Gaps</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {matchDetails.missing.map((m: string) => (
                                                                <span key={m} className="px-2 py-1 bg-red-50 text-red-600 text-[9px] font-bold rounded">
                                                                    {m}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => handleMatchJob(selectedJob)}
                                                    disabled={isMatching}
                                                    className="w-full py-4 bg-white border border-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all text-sm"
                                                >
                                                    {isMatching ? <UpdateIcon className="animate-spin" /> : <Sparkles size={16} />}
                                                    {isMatching ? "Analyzing..." : "Analyze Match"}
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">Quick Actions</p>
                                            <a 
                                                href={selectedJob.link} 
                                                target="_blank" 
                                                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                Apply Now <ArrowRightIcon />
                                            </a>
                                            <button className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition-all">
                                                Save for Later
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default function JobsPage() {
    return (
        <Suspense fallback={<div style={{ padding: '6rem', textAlign: 'center' }}>Initializing WebNinja Scanner...</div>}>
            <JobsContent />
        </Suspense>
    );
}
