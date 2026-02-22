"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, Target, MousePointer2, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { duolingoSpring } from '@/lib/animations';

interface BentoCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
    delay?: number;
}

const BentoCard = ({ title, description, icon, className, delay = 0 }: BentoCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...duolingoSpring, delay: delay * 1.5 }}
        whileHover={{
            y: -8,
            transition: { duration: 0.3 }
        }}
        className={cn(
            "group p-8 rounded-[32px] border border-slate-100 bg-white shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col justify-between overflow-hidden relative",
            className
        )}
    >
        <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 mb-8 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300"
        >
            {icon}
        </motion.div>
        <div className="relative z-10">
            <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tighter">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
        </div>

        {/* Subtle background flair */}
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none" />
    </motion.div>
);

export function BentoFeatures() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                {/* Large Card */}
                <BentoCard
                    delay={0.1}
                    className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-white to-slate-50 border-blue-100"
                    title="Deep-Scrape Career Hub"
                    description="Our engine scours 50+ career platforms including Greenhouse, LinkedIn, and Indeed to find roles that match your unique candidate DNA. No more generic search results."
                    icon={<Zap size={24} className="text-blue-500" />}
                />

                {/* Standard Card */}
                <BentoCard
                    delay={0.2}
                    title="Real-time Analytics"
                    description="See exactly where you stand against other applicants with high-accuracy match scoring."
                    icon={<Target size={24} className="text-purple-500" />}
                />

                {/* Standard Card */}
                <BentoCard
                    delay={0.3}
                    title="Safe & Private"
                    description="Your data is context-bound and used only to improve your matching accuracy."
                    icon={<ShieldCheck size={24} className="text-green-500" />}
                />

                {/* Horizontal Card */}
                <BentoCard
                    delay={0.4}
                    className="md:col-span-2"
                    title="AI-Powered Portfolio Builder"
                    description="Deploy a professional, high-converting portfolio in seconds. Show, don't just tell."
                    icon={<Layout size={24} className="text-orange-500" />}
                />

                {/* Square Card */}
                <BentoCard
                    delay={0.5}
                    title="1-Click Apply"
                    description="Streamline the tedious stuff so you can focus on the interviews."
                    icon={<MousePointer2 size={24} className="text-red-500" />}
                />
            </div>
        </section>
    );
}
