"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    ArrowRightIcon,
    LinkBreak2Icon,
    LapTimerIcon,
    GlobeIcon,
    BackpackIcon,
    CheckCircledIcon,
    UpdateIcon,
    RocketIcon,
    MagicWandIcon,
    StarFilledIcon,
    LayersIcon
} from "@radix-ui/react-icons";
import { Sparkles, Zap, Target, ShieldCheck, Search, Database, Fingerprint } from "lucide-react";
import GuestBanner from "../../components/GuestBanner";
import { cn } from "@/lib/utils";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";

function JobsContent() {
    const searchParams = useSearchParams();
    const isGuest = searchParams.get('guest') === 'true';
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
    const [jobs, setJobs] = useState<any[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const [scanProgress, setScanProgress] = useState(0);
    const [query, setQuery] = useState("");

    const scanLogs = [
        "Hunting for your dream role...",
        "Scouring global job boards...",
        "Scanning for high-match opportunities...",
        "Double-checking salary ranges for you...",
        "Matching your skills to descriptions...",
        "Identifying hidden career gems...",
        "Almost there! Wrapping up..."
    ];

    const startScan = async (searchQuery?: string) => {
        const activeQuery = searchQuery || query;
        if (!activeQuery.trim()) return;

        setStatus('scanning');
        setScanProgress(0);
        setLogs([]);

        // Simulate scanning logs
        for (let i = 0; i < scanLogs.length; i++) {
            setLogs(prev => [...prev, scanLogs[i]]);
            setScanProgress(((i + 1) / scanLogs.length) * 100);
            await new Promise(r => setTimeout(r, 600));
        }

        try {
            const res = await fetch('/api/jobs', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: activeQuery })
            });
            const data = await res.json();
            setJobs(data);
            setStatus('results');
        } catch (err) {
            console.error(err);
            setStatus('idle');
        }
    };

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh' }}>
            <GuestBanner />

            <div className="mb-8 overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}
                >
                    Job Scanner Pro
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}
                >
                    Deep-scraped opportunities matched to your specific profile and session history.
                </motion.p>
            </div>

            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm text-center"
                        style={{ background: 'white', borderRadius: '24px', border: '1px solid var(--border)', padding: '4rem' }}
                    >
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                style={{ position: 'absolute', inset: '-10px', border: '2px dashed #e2e8f0', borderRadius: '50%' }}
                            />
                            <div className="bg-slate-50 p-6 rounded-full" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '50%', position: 'relative', zIndex: 1 }}>
                                <Search className="w-12 h-12 text-slate-400" style={{ width: '3rem', height: '3rem', color: 'var(--primary)' }} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-extrabold mb-4 tracking-tight" style={{ fontSize: '2.4rem', marginBottom: '1rem', lineHeight: '1.1' }}>Find work that <span style={{ color: 'var(--primary)' }}>fits your life.</span></h2>
                        <p className="text-slate-500 mb-8 max-w-lg leading-relaxed" style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.15rem', lineHeight: '1.6', textAlign: 'center' }}>
                            We hunt through 50+ platforms to find the roles that actually match your unique skills and salary goals. No more manual searching.
                        </p>

                        <div className="flex gap-6 mb-10 text-xs font-bold text-slate-400">
                            <div className="flex items-center gap-1.5"><Database size={14} /> 54 Sources</div>
                            <div className="flex items-center gap-1.5"><ShieldCheck size={14} /> Safe Scan</div>
                            <div className="flex items-center gap-1.5"><Fingerprint size={14} /> Persona Matching</div>
                        </div>
                        <div className="w-full flex justify-center mb-10 max-w-2xl">
                            <PromptInputBox 
                                placeholder="What role are you looking for? (e.g. CEO, Developer)"
                                onSend={(msg: string) => {
                                    setQuery(msg);
                                    startScan(msg);
                                }}
                                isLoading={false}
                            />
                        </div>
                        <p className="text-slate-400 text-[10px] font-medium tracking-widest uppercase">
                            Secure Deep Scan Active
                        </p>
                    </motion.div>
                )}

                {status === 'scanning' && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col space-y-8"
                    >
                        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-bold text-lg flex items-center gap-2" style={{ fontWeight: 800 }}>
                                    <Sparkles size={20} className="text-blue-500 animate-pulse" />
                                    Scouring the Talent Universe...
                                </span>
                                <span className="text-slate-400 font-mono">{Math.round(scanProgress)}%</span>
                            </div>

                            <div style={{ width: '100%', height: '8px', background: 'var(--surface)', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
                                <motion.div
                                    className="h-full bg-blue-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${scanProgress}%` }}
                                    style={{ height: '100%', background: 'var(--primary)' }}
                                />
                            </div>

                            <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <AnimatePresence mode="popLayout">
                                    {logs.slice(-4).map((log, i) => (
                                        <motion.div
                                            key={log}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex items-center text-sm text-slate-600 gap-3"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}
                                        >
                                            <UpdateIcon className="animate-spin" />
                                            {log}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'results' && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-xl font-bold tracking-tight" style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: '1.2' }}>{jobs.length} Opportunities Located</h3>
                            <button
                                onClick={() => startScan()}
                                className="text-sm text-blue-500 flex items-center gap-1 font-semibold"
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}
                            >
                                <UpdateIcon /> Rescan
                            </button>
                        </div>

                        {jobs.map((job, idx) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    background: 'white',
                                    padding: '1.75rem',
                                    borderRadius: '20px',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                                whileHover={{ scale: 1.01, borderColor: 'var(--primary)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div className="flex items-center gap-3 mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <h4 className="text-lg font-bold" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{job.title}</h4>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            background: '#ECFDF5',
                                            color: '#059669',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '99px',
                                            fontWeight: 700
                                        }}>
                                            {job.match}% MATCH
                                        </span>
                                    </div>
                                    <div className="flex gap-4 text-sm text-slate-500" style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{job.company} • {job.location}</p>
                                        <span className="flex items-center gap-1" style={{ color: '#0f172a', fontWeight: 600 }}>{job.salary}</span>
                                    </div>
                                    <div className="flex gap-2 mt-4" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                        {job.tags.map((tag: string) => (
                                            <span key={tag} style={{ background: 'var(--surface)', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginLeft: '2rem', textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>via {job.source}</div>
                                    <a href={job.link || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        Apply <ArrowRightIcon />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function JobsPage() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Initializing Scanner...</div>}>
            <JobsContent />
        </Suspense>
    );
}
