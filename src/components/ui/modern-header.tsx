"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronDown,
    Zap,
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
            { icon: <Zap size={18} />, title: "Autofill Extension", desc: "One-click apps", href: "/dashboard" },
            { icon: <Target size={18} />, title: "AI Interviewer", desc: "Live mock sessions", href: "/dashboard/interview" },
            { icon: <Database size={18} />, title: "Resume Builder", desc: "ATS-optimized", href: "/dashboard/resume" }
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
            background: 'rgba(9, 9, 11, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid #27272a',
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
                        fontWeight: 800,
                        color: '#fafafa',
                        textDecoration: 'none',
                        letterSpacing: '-0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <div style={{ 
                            width: '32px', 
                            height: '32px', 
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                            borderRadius: '8px', 
                            color: 'white', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontSize: '1rem',
                            fontWeight: 700
                        }}>C</div>
                        Cursus
                    </Link>

                    <nav style={{ display: 'flex', gap: '0.5rem' }}>
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
                                        color: '#a1a1aa',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#fafafa';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#a1a1aa';
                                        e.currentTarget.style.background = 'transparent';
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
                                                width: '280px',
                                                background: '#18181b',
                                                borderRadius: '16px',
                                                padding: '0.75rem',
                                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                                border: '1px solid #27272a',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.25rem'
                                            }}
                                        >
                                            {link.dropdown.map((item: any) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="group flex items-center gap-3 p-3 rounded-xl transition-colors"
                                                    style={{ 
                                                        textDecoration: 'none',
                                                        background: 'transparent'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = '#27272a';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'transparent';
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        background: '#27272a',
                                                        borderRadius: '10px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#6366f1',
                                                        transition: 'all 0.2s'
                                                    }}>
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontWeight: 600, color: '#fafafa', fontSize: '0.875rem', marginBottom: '2px' }}>{item.title}</h4>
                                                        <p style={{ color: '#71717a', fontSize: '0.75rem', margin: 0 }}>{item.desc}</p>
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

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <span style={{ 
                                background: 'none', 
                                border: 'none', 
                                cursor: 'pointer', 
                                fontSize: '0.9rem', 
                                fontWeight: 500, 
                                color: '#a1a1aa',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                transition: 'all 0.2s'
                            }}>Sign In</span>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <span style={{
                                padding: '0.65rem 1.25rem',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: 'white',
                                borderRadius: '10px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
                                display: 'inline-block',
                                transition: 'all 0.2s'
                            }}>
                                Get Started
                            </span>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" style={{
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: '#a1a1aa',
                            textDecoration: 'none',
                            marginRight: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                        }}>Dashboard</Link>
                        <UserButton appearance={{ 
                            elements: { 
                                userButtonAvatarBox: { width: '36px', height: '36px' }
                            } 
                        }} />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
