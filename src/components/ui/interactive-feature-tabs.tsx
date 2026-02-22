"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PenTool, Globe, Rocket, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        id: 'scan',
        title: 'Deep Scanning',
        icon: <Search size={20} />,
        headline: 'scrapes 50+ job boards in seconds.',
        description: 'No more switching between tabs. Cursus centralizes the entire job market into one high-signal feed.',
        image: '/brain/1ca26e6e-07d1-4041-854c-f94394fb3f37/job_scanner_mockup_v1_1771783704884.png',
        color: '#3b82f6'
    },
    {
        id: 'write',
        title: 'Resume Engineering',
        icon: <PenTool size={20} />,
        headline: 'Architect the perfect narrative.',
        description: 'Our AI doesn\'t just write bullet points; it engineers success stories that pass every ATS and impress every recruiter.',
        image: '/api/placeholder/800/500',
        color: '#8b5cf6'
    },
    {
        id: 'build',
        title: 'Portfolio Builder',
        icon: <Globe size={20} />,
        headline: 'A living storefront for your work.',
        description: 'Convert your resume into a stunning, interactive portfolio site with a single click. Deploy to your own domain.',
        image: '/brain/1ca26e6e-07d1-4041-854c-f94394fb3f37/portfolio_builder_mockup_v1_1771783728391.png',
        color: '#10b981'
    },
    {
        id: 'land',
        title: 'Interview Prep',
        icon: <Rocket size={20} />,
        headline: 'Never go in cold again.',
        description: 'Practice with an AI that knows the company, knows the role, and knows your history. Real-time voice coaching.',
        image: '/api/placeholder/800/500',
        color: '#f59e0b'
    }
];

export function InteractiveFeatureTabs() {
    const [activeTab, setActiveTab] = useState(features[0]);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="text-center mb-20">
                <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#3b82f6', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                    The Workflow
                </p>
                <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.07em', color: '#0f172a', lineHeight: 0.95 }}>
                    Everything you need, <br /><span style={{ color: activeTab.color }}>all in one place.</span>
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Clickable Sidebar Sections */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    {features.map((feature) => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveTab(feature)}
                            className={cn(
                                "flex items-start gap-4 p-6 rounded-2xl text-left transition-all duration-300 border-2",
                                activeTab.id === feature.id
                                    ? "bg-white border-slate-200 shadow-xl scale-[1.02]"
                                    : "bg-transparent border-transparent opacity-50 hover:opacity-80"
                            )}
                        >
                            <div className={cn(
                                "p-3 rounded-xl",
                                activeTab.id === feature.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                            )}>
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-lg">{feature.title}</h3>
                                {activeTab.id === feature.id && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-slate-500 mt-2 text-sm leading-relaxed"
                                    >
                                        {feature.description}
                                    </motion.p>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Display Panel (Big Text, Big Image) */}
                <div className="w-full lg:w-2/3 relative h-[500px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab.id}
                            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-12 w-full h-full flex flex-col justify-between overflow-hidden relative"
                        >
                            {/* Floating Elements for Delight */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.1 }}
                            >
                                <CheckCircle2 size={120} />
                            </motion.div>

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                                    Our {activeTab.title} <br />
                                    <span style={{ color: activeTab.color }}>{activeTab.headline}</span>
                                </h2>
                                <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                                    <div className="h-[1px] w-12 bg-slate-200" />
                                    EXPLORE FEATURE
                                </div>
                            </div>

                            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 grow flex items-center justify-center relative">
                                {activeTab.image && !activeTab.image.startsWith('/api/placeholder') ? (
                                    <motion.img
                                        key={activeTab.image}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6 }}
                                        src={activeTab.image}
                                        alt={activeTab.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <>
                                        {/* Fallback Mockup */}
                                        <div className="text-slate-300 font-mono text-[10px] p-6 grid grid-cols-2 gap-4 w-full">
                                            <div className="h-40 bg-white rounded-lg border border-slate-100 shadow-sm p-4">
                                                <div className="w-full h-2 bg-slate-100 rounded mb-2" />
                                                <div className="w-1/2 h-2 bg-slate-100 rounded mb-4" />
                                                <div className="w-full h-12 bg-slate-50 rounded" />
                                            </div>
                                            <div className="h-40 bg-white rounded-lg border border-slate-100 shadow-sm p-4">
                                                <div className="w-full h-2 bg-slate-100 rounded mb-2" />
                                                <div className="w-1/2 h-2 bg-slate-100 rounded mb-4" />
                                                <div className="w-full h-12 bg-slate-50 rounded" />
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-slate-200 uppercase tracking-widest pointer-events-none">
                                            Feature Mockup
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
