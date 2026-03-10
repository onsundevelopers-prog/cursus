"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, CircleDollarSign, X, CheckCircle2 } from 'lucide-react';

interface MascotProps {
    className?: string;
}

const features = [
    {
        title: "AI Job Application Autofill",
        badge: "Chrome Extension",
        icon: <Zap size={20} className="text-amber-500" />,
        points: [
            "Auto-fills job applications in one click",
            "Saves 15-20 minutes per application",
            "Supports Greenhouse, Lever, Workday, etc.",
            "Detects 20+ field types automatically"
        ],
        pricing: "Free: 10/month | Pro: Unlimited"
    },
    {
        title: "Company Research AI",
        badge: "Interview Prep",
        icon: <Target size={20} className="text-blue-500" />,
        points: [
            "Generates personalized interview prep briefs",
            "Scrapes company website, news, Glassdoor, etc.",
            "Creates custom talking points from YOUR resume",
            "Includes questions to ask & culture insights"
        ],
        pricing: "Free: 2 briefs/month | Pro: Unlimited"
    },
    {
        title: "Salary Negotiation Coach",
        badge: "Live Coaching",
        icon: <CircleDollarSign size={20} className="text-emerald-500" />,
        points: [
            "Shows market data vs your offer",
            "Generates negotiation scripts (email + phone)",
            "LIVE coach (listens & suggests responses in real-time)",
            "Helps you negotiate $10K-$50K more"
        ],
        pricing: "Free: 1 analysis | Pro: Unlimited + live coach"
    }
];

export function Mascot({ className }: MascotProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isJumping, setIsJumping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setShowMenu(true), 1500);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        setIsJumping(true);
        setShowMenu(true);
        setTimeout(() => setIsJumping(false), 800);
    };

    return (
        <div className={`fixed bottom-12 right-12 z-[999] flex flex-col items-end pointer-events-none ${className || ''}`}>

            <AnimatePresence>
                {isVisible && showMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative z-10 pointer-events-auto mb-4 mr-4"
                        style={{ width: '400px' }}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative">
                            {/* Header */}
                            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <SparklesIcon className="text-blue-400" /> Cursus Pro Tools
                                </h3>
                                <button onClick={() => setShowMenu(false)} className="text-slate-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            {/* Features List */}
                            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="p-4 mb-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
                                                    {feature.icon}
                                                </div>
                                                <h4 className="font-bold text-slate-900 text-[15px]">{feature.title}</h4>
                                            </div>
                                            <span className="text-[10px] uppercase font-black tracking-wider px-2 py-1 rounded-full bg-slate-200 text-slate-600">
                                                {feature.badge}
                                            </span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-600 mb-3 pl-2">
                                            {feature.points.map((pt, i) => (
                                                <li key={i} className="flex gap-2 leading-snug">
                                                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-lg text-center shadow-sm">
                                            {feature.pricing}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2D Mascot Character (SVG) */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{
                            y: isJumping ? [0, -40, 0] : 0,
                            scale: isJumping ? [1, 1.1, 1] : 1,
                            opacity: 1
                        }}
                        transition={{
                            y: { duration: 0.6, ease: "easeOut" },
                            scale: { duration: 0.6 }
                        }}
                        className="pointer-events-auto cursor-pointer"
                        onClick={handleClick}
                    >
                        {/* The "C" Mascot SVG - Classic 2D version */}
                        <svg width="84" height="84" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M48 16C44 12 38 10 32 10C19.85 10 10 19.85 10 32C10 44.15 19.85 54 32 54C38 54 44 52 48 48"
                                stroke="#0f172a"
                                strokeWidth="12"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            <g>
                                <circle cx="24" cy="28" r="3.5" fill="#0f172a" />
                                <circle cx="36" cy="24" r="3.5" fill="#0f172a" />
                                <circle cx="25" cy="27" r="1.2" fill="white" />
                                <circle cx="37" cy="23" r="1.2" fill="white" />
                            </g>
                            <circle cx="20" cy="40" r="3.5" fill="#3b82f6" opacity="0.4" />
                            <circle cx="44" cy="36" r="3.5" fill="#3b82f6" opacity="0.4" />
                        </svg>

                        {/* Subtle Floating Animation */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-blue-500/5 rounded-full blur-xl -z-10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const SparklesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${className || ''}`}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
);
