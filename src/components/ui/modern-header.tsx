"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronDown,
    Search,
    CircleUser,
    Rocket,
    Layout,
    ShieldCheck,
    Zap,
    MousePointer2,
    Database,
    Target
} from 'lucide-react';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton
} from "@clerk/nextjs";
import { cn } from '@/lib/utils';

const links = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Jobs', href: '/dashboard/jobs' },
    { 
        title: 'Tools', 
        href: '#',
        dropdown: [
            { icon: <Zap size={20} />, title: "Autofill Extension", desc: "One-click apps", href: "/dashboard" },
            { icon: <Target size={20} />, title: "AI Interviewer", desc: "Live mock sessions", href: "/dashboard/interview" },
            { icon: <Database size={20} />, title: "Resume Builder", desc: "ATS-optimized", href: "/dashboard/resume" }
        ]
    }
];

export function ModernHeader() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid #f1f5f9',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center'
        }}>
            <div style={{
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                padding: '0 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <Link href="/" style={{
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        textDecoration: 'none',
                        letterSpacing: '-0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <div style={{ width: '32px', height: '32px', background: '#0f172a', borderRadius: '8px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>C</div>
                        Cursus
                    </Link>

                    <nav style={{ display: 'flex', gap: '1.5rem' }}>
                        {links.map((link) => (
                            <div
                                key={link.title}
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setActiveDropdown(link.title)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    style={{
                                        color: '#475569',
                                        textDecoration: 'none',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        padding: '0.5rem 0'
                                    }}
                                >
                                    {link.title}
                                    {link.dropdown && <ChevronDown size={14} className={cn("transition-transform", activeDropdown === link.title && "rotate-180")} />}
                                </Link>

                                <AnimatePresence>
                                    {link.dropdown && activeDropdown === link.title && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: '-50%',
                                                width: '320px',
                                                background: 'white',
                                                borderRadius: '24px',
                                                padding: '1.25rem',
                                                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                                border: '1px solid #f1f5f9',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            {link.dropdown.map((item: any) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <div className="shrink-0 w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem', marginBottom: '2px' }}>{item.title}</h4>
                                                        <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>{item.desc}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>Sign In</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button style={{
                                padding: '0.75rem 1.5rem',
                                background: '#0f172a',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}>
                                Dashboard
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: '#475569',
                            textDecoration: 'none',
                            marginRight: '1rem'
                        }}>Dashboard</Link>
                        <UserButton appearance={{ elements: { userButtonAvatarBox: { width: '40px', height: '40px' } } }} />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
