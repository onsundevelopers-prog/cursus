"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Globe, FileText, Wand2, Search, Mic, ExternalLink, CloudUpload, FileDown, Zap, Target, CircleDollarSign } from "lucide-react";
import Link from "next/link";

// ── Animated sub-components ──────────────────────────────────────────────────

function ResumeAnimation() {
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => setScale((p) => (p === 1 ? 1.4 : 1)), 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex items-center justify-center h-full">
            <motion.div
                animate={{ scale }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '80px' }}
            >
                {[100, 75, 90, 60].map((w, i) => (
                    <div key={i} style={{ height: '6px', width: `${w}%`, backgroundColor: 'rgba(15, 23, 42, 0.15)', borderRadius: '3px' }} />
                ))}
            </motion.div>
        </div>
    );
}

function LetterAnimation() {
    const [layout, setLayout] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setLayout((p) => (p + 1) % 3), 2500);
        return () => clearInterval(interval);
    }, []);
    const widths = [[100, 80, 90], [90, 100, 70], [85, 95, 80]];
    return (
        <div className="h-full flex items-center justify-center">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '120px' }}>
                {widths[layout].map((w, i) => (
                    <motion.div
                        key={i}
                        layout
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ height: '6px', width: `${w}%`, backgroundColor: 'rgba(15, 23, 42, 0.1)', borderRadius: '3px' }}
                    />
                ))}
            </div>
        </div>
    );
}

function ScanAnimation() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(t);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="h-10 flex items-center justify-center overflow-hidden relative w-full">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            style={{ height: '32px', width: '96px', backgroundColor: 'rgba(15, 23, 42, 0.05)', borderRadius: '6px' }}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            exit={{ opacity: 0, y: -20, position: 'absolute' }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    ) : (
                        <motion.span
                            key="text"
                            initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            style={{ fontSize: '2rem', fontWeight: 600, color: '#0f172a' }}
                        >
                            94%
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Match Score</span>
            <div style={{ width: '120px', height: '6px', backgroundColor: 'rgba(15, 23, 42, 0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                <motion.div
                    style={{ height: '100%', backgroundColor: '#3b82f6', borderRadius: '99px' }}
                    initial={{ width: 0 }}
                    animate={{ width: loading ? '0%' : '94%' }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
            </div>
        </div>
    );
}

function VoiceAnimation() {
    const [bars, setBars] = useState([40, 60, 80, 50, 70]);
    useEffect(() => {
        const interval = setInterval(() => {
            setBars([...Array(5)].map(() => Math.floor(Math.random() * 60) + 30));
        }, 400);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex items-center justify-center h-full gap-2">
            {bars.map((h, i) => (
                <motion.div
                    key={i}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ width: '8px', backgroundColor: '#3b82f6', borderRadius: '4px', minHeight: '8px', maxHeight: '64px', opacity: 0.7 }}
                />
            ))}
        </div>
    );
}

function GlobalNetwork() {
    return (
        <div className="flex items-center justify-center h-full relative">
            <Globe className="w-16 h-16 text-slate-800 z-10" />
            {[0, 1, 2, 3, 4].map((pulse) => (
                <motion.div
                    key={pulse}
                    className="absolute w-16 h-16 border-2 border-slate-300 rounded-full"
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 3, repeat: Infinity, delay: pulse * 0.8, ease: "easeOut" }}
                />
            ))}
        </div>
    );
}

function AutofillAnimation() {
    const [filled, setFilled] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => setFilled(p => !p), 1500);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-2">
            {[40, 80, 60].map((w, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: 'rgba(15,23,42,0.1)' }} />
                    <div style={{ width: '80px', height: '12px', borderRadius: '4px', backgroundColor: 'rgba(15,23,42,0.05)', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: filled ? `${w}%` : '0%' }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            style={{ height: '100%', backgroundColor: '#f59e0b' }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

function ResearchAnimation() {
    return (
        <div className="flex items-center justify-center h-full relative">
            <Target className="w-12 h-12 text-blue-500 z-10" />
            <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-20 h-20 border border-dashed border-blue-200 rounded-full"
            />
            <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 border border-blue-100 rounded-full"
            />
        </div>
    );
}

function NegotiationAnimation() {
    const [chart, setChart] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setChart(true), 500);
        return () => clearTimeout(t);
    }, []);
    return (
        <div className="flex items-end justify-center h-full gap-2 pb-6">
            <motion.div animate={{ height: chart ? '30px' : '10px' }} transition={{ duration: 1 }} style={{ width: '16px', backgroundColor: 'rgba(15,23,42,0.1)', borderRadius: '4px 4px 0 0' }} />
            <motion.div animate={{ height: chart ? '50px' : '10px' }} transition={{ duration: 1, delay: 0.2 }} style={{ width: '16px', backgroundColor: 'rgba(15,23,42,0.2)', borderRadius: '4px 4px 0 0' }} />
            <motion.div animate={{ height: chart ? '80px' : '10px' }} transition={{ duration: 1, delay: 0.4 }} style={{ width: '16px', backgroundColor: '#10b981', borderRadius: '4px 4px 0 0' }} />
        </div>
    );
}

// ── Main Dashboard Bento ─────────────────────────────────────────────────────

interface BentoDashboardProps {
    navUrl: (path: string) => string;
    displayName: string;
}

export default function BentoDashboard({ navUrl, displayName }: BentoDashboardProps) {
    const handleExportWord = async () => {
        try {
            const demoText = "Welcome to Cursus!\n\nThis is a demonstration of the Word Document Export feature. When you generate a real Cover Letter or Resume inside their respective tools, clicking the Export to Word button will download that exact document formatted for Microsoft Word.\n\nEnjoy building your future!";
            const res = await fetch("/api/export/word", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: demoText, title: "Cursus_Demo_Export" })
            });
            if (!res.ok) throw new Error("Export failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Cursus_Demo_Export.docx";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (e) {
            console.error("Failed to export demo document", e);
            alert("Failed to export Word document. Please try again.");
        }
    };

    const handleExportDocs = () => {
        alert("To open in Google Docs: Click 'MS Word' to export the .docx file, then simply drag & drop the downloaded file into Google Docs! It automatically converts and formats perfectly.");
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(226, 232, 240, 0.6)',
        borderRadius: '32px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column' as const,
        cursor: 'pointer',
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 10px 40px -10px rgba(15, 23, 42, 0.05)',
        height: '100%',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    };

    return (
        <section style={{ width: '100%' }}>
            <div style={{ maxWidth: '1200px', width: '100%', margin: '0' }}>

                <motion.p
                    style={{ color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.5rem', fontWeight: 600 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Your Dashboard
                </motion.p>
                <motion.h1
                    style={{ 
                        color: '#0f172a', 
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
                        fontWeight: 900, 
                        letterSpacing: '-0.04em', 
                        marginBottom: '1rem', 
                        lineHeight: '1', 
                        overflowWrap: 'break-word', 
                        wordBreak: 'break-word',
                        background: 'linear-gradient(to bottom, #0f172a 60%, #475569)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Welcome, {displayName}
                </motion.h1>

                {/* Stats row removed per user request */}

                {/* Improved Bento Grid — 4 Columns on Large Screens */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '1.5rem', 
                    gridAutoRows: 'minmax(240px, auto)' 
                }} className="dashboard-grid">
                    <style jsx>{`
                        @media (max-width: 1024px) {
                            .dashboard-grid {
                                grid-template-columns: repeat(2, 1fr) !important;
                            }
                        }
                        @media (max-width: 640px) {
                            .dashboard-grid {
                                grid-template-columns: 1fr !important;
                            }
                        }
                    `}</style>

                    {/* 1. Resume Architect — tall 2x2 */}
                    <Link href={navUrl("/dashboard/resume")} style={{ textDecoration: 'none' }}>
                        <motion.div
                            style={{ ...cardStyle, gridColumn: 'span 2', gridRow: 'span 2' }}
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div style={{ flex: 1 }}><ResumeAnimation /></div>
                            <div style={{ marginTop: '1rem' }}>
                                <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                                    <FileText size={18} color="#3b82f6" /> Resume Architect
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.4 }}>Land interviews 2x faster with an AI-crafted, ATS-optimized resume.</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* 2. Cover Letter — 2x1 */}
                    <Link href={navUrl("/dashboard/letter")} style={{ textDecoration: 'none' }}>
                        <motion.div
                            style={{ ...cardStyle, gridColumn: 'span 2' }}
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 0.98, borderColor: '#e2e8f0' }}
                        >
                            <div style={{ flex: 1 }}><LetterAnimation /></div>
                            <div style={{ marginTop: '1rem' }}>
                                <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '6px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                                    <Wand2 size={16} color="#8b5cf6" /> Cover Letters
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Stand out with highly-personalized letters that command attention.</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* 3. Career Link — tall 2x2 */}
                    <Link href={navUrl("/dashboard/portfolio")} style={{ textDecoration: 'none' }}>
                        <motion.div
                            style={{ ...cardStyle, gridColumn: 'span 2', gridRow: 'span 2' }}
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                        >
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                                <GlobalNetwork />
                            </div>
                            <div style={{ marginTop: 'auto', backgroundColor: '#f8fafc', borderRadius: '10px', padding: '0.75rem', border: '1px solid #f1f5f9' }}>
                                <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                                    <Globe size={16} color="#10b981" /> Career Link
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Showcase your work and let the best opportunities come to you.</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* 4. Job Finder — 2x1 */}
                    <Link href={navUrl("/dashboard/jobs")} style={{ textDecoration: 'none' }}>
                        <motion.div
                            style={{ ...cardStyle, gridColumn: 'span 2' }}
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 0.98, borderColor: '#e2e8f0' }}
                        >
                            <div style={{ flex: 1 }}><ScanAnimation /></div>
                            <div style={{ marginTop: '1rem' }}>
                                <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <Search size={16} color="#f59e0b" /> Job Finder
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Stop searching manually. We find perfectly matched roles for you.</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* 5. Interview Coach — 2x1 */}
                    <Link href={navUrl("/dashboard/interview")} style={{ textDecoration: 'none' }}>
                        <motion.div
                            style={{ ...cardStyle, gridColumn: 'span 2' }}
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 0.98, borderColor: '#e2e8f0' }}
                        >
                            <div style={{ flex: 1 }}><VoiceAnimation /></div>
                            <div style={{ marginTop: '1rem' }}>
                                <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <Mic size={16} color="#ef4444" /> Interview Coach
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Ace any behavioral round with real-time AI speech coaching.</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* 6. AI Job Application Autofill */}
                    <motion.div
                        style={{ ...cardStyle, gridColumn: 'span 2', position: 'relative' }}
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 0.98, borderColor: '#f59e0b' }}
                    >
                        <div style={{ flex: 1 }}><AutofillAnimation /></div>
                        <div style={{ marginTop: '1rem' }}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Zap size={16} color="#f59e0b" /> Job Autofill
                                </h3>
                                <span className="text-[9px] uppercase tracking-wider font-bold bg-amber-50 text-amber-600 px-2 py-1 border border-amber-200/50 rounded-md">
                                    Extension
                                </span>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>One-click auto-fill for Workday, Lever, and Greenhouse.</p>
                            
                            <a 
                                href="/api/extension/download" 
                                className="w-full flex items-center justify-center gap-2 py-4 text-white rounded-xl text-sm font-bold transition-all shadow-xl hover:shadow-orange-200/50 active:scale-[0.98] group"
                                style={{ 
                                    textDecoration: 'none',
                                    background: 'linear-gradient(135deg, #FF6A00 0%, #EE5D00 100%)',
                                    backgroundColor: '#FF6A00',
                                    boxShadow: '0 8px 20px -6px rgba(255, 106, 0, 0.4)'
                                }}
                            >
                                <motion.div
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <FileDown size={20} /> Get Extension
                                </motion.div>
                            </a>
                        </div>
                    </motion.div>

                    {/* 7. Company Research AI */}
                    <motion.div
                        style={{ ...cardStyle, gridColumn: 'span 2', cursor: 'pointer' }}
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 0.98, borderColor: '#3b82f6' }}
                        onClick={() => alert("Company Intel is coming soon!")}
                    >
                        <div style={{ flex: 1 }}><ResearchAnimation /></div>
                        <div style={{ marginTop: '1rem' }}>
                            <div className="flex justify-between items-center mb-1">
                                <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <Target size={16} color="#3b82f6" /> Company Intel
                                </h3>
                                <span className="text-[9px] uppercase tracking-wider font-bold bg-blue-50 text-blue-600 px-2 py-1 border border-blue-200/50 rounded-md">
                                    Soon
                                </span>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Deep-scraped prep briefs & custom talking points.</p>
                        </div>
                    </motion.div>

                    {/* 8. Salary Negotiation */}
                    <motion.div
                        style={{ ...cardStyle, gridColumn: 'span 2', cursor: 'pointer' }}
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 0.98, borderColor: '#10b981' }}
                        onClick={() => alert("Salary Coach is coming soon!")}
                    >
                        <div style={{ flex: 1 }}><NegotiationAnimation /></div>
                        <div style={{ marginTop: '1rem' }}>
                            <div className="flex justify-between items-center mb-1">
                                <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <CircleDollarSign size={16} color="#10b981" /> Salary Coach
                                </h3>
                                <span className="text-[9px] uppercase tracking-wider font-bold bg-emerald-50 text-emerald-600 px-2 py-1 border border-emerald-200/50 rounded-md">
                                    Soon
                                </span>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Live call assistant & market data to negotiate $10K+ more.</p>
                        </div>
                    </motion.div>

                    {/* 9. Export Integrations — full width */}
                    <motion.div
                        style={{ ...cardStyle, gridColumn: 'span 4', cursor: 'default' }}
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="export-card"
                    >
                        <style jsx>{`
                            @media (max-width: 1024px) {
                                .export-card {
                                    grid-column: span 2 !important;
                                }
                            }
                            @media (max-width: 640px) {
                                .export-card {
                                    grid-column: 1 / -1 !important;
                                }
                            }
                        `}</style>
                        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', height: '100%', width: '100%' }}>
                            <div style={{ flex: '1 1 300px' }}>
                                <h3 style={{ color: '#0f172a', fontSize: '1.4rem', fontWeight: 850, marginBottom: '10px', letterSpacing: '-0.03em', lineHeight: '1.1' }}>Export & Continue</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                    Send your generated Resumes and Cover Letters directly to your preferred word processor for final touches.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {/* Google Docs Button */}
                                <button
                                    onClick={handleExportDocs}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                                        padding: '1.25rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px',
                                        cursor: 'pointer', transition: 'all 0.2s ease', width: '130px'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
                                        <path fill="#4285F4" d="M14 2h20l10 10v30c0 2.2-1.8 4-4 4H14c-2.2 0-4-1.8-4-4V6c0-2.2 1.8-4 4-4z" />
                                        <path fill="#188038" d="M34 2v10h10z" />
                                        <path fill="#E8EAED" d="M18 16h16v3H18zm0 8h16v3H18zm0 8h12v3H18z" />
                                    </svg>
                                    <span style={{ color: '#0f172a', fontSize: '0.85rem', fontWeight: 600 }}>Google Docs</span>
                                </button>

                                {/* Microsoft Word Button */}
                                <button
                                    onClick={handleExportWord}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                                        padding: '1.25rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px',
                                        cursor: 'pointer', transition: 'all 0.2s ease', width: '130px'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2b579a'; e.currentTarget.style.backgroundColor = '#f0f4f9'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
                                        <path fill="#2B579A" d="M28 6H8c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4z" />
                                        <path fill="#ffffff" d="M11.6 30L9 16h2.7l1.5 9.7h.1l2-9.7h2.6l2 9.7h.1l1.5-9.7h2.6l-2.6 14h-2.8L16 20.3h-.1L14.4 30h-2.8z" />
                                        <path fill="#124078" d="M28 6v10h10v22c0 2.2-1.8 4-4 4H28v-4h4v-28h-4z" />
                                    </svg>
                                    <span style={{ color: '#0f172a', fontSize: '0.85rem', fontWeight: 600 }}>MS Word</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
