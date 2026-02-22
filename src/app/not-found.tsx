"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ghost, Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            color: '#0f172a',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'var(--font-sans)',
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                style={{
                    maxWidth: '520px',
                    width: '100%',
                    position: 'relative'
                }}
            >
                {/* Quirky Ghost Illustration (Motion for Delight) */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        marginBottom: '2rem',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                        padding: '3rem',
                        borderRadius: '50%',
                        position: 'relative',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
                    }}>
                        <Ghost size={80} className="text-slate-400" />
                        <motion.div
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: '#3b82f6',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%'
                            }}
                        />
                    </div>
                </motion.div>

                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.06em',
                    lineHeight: 1
                }}>
                    Whoops! <span style={{ color: '#3b82f6' }}>404</span>
                </h1>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: '#1e293b' }}>
                    Lost in the Career Cloud?
                </h2>

                <p style={{
                    color: '#64748b',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    marginBottom: '2.5rem',
                    maxWidth: '400px',
                    margin: '0 auto 2.5rem'
                }}>
                    This page must have taken a vacation. Even our AI couldn't find it! Let's get you back on track.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link
                        href="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.85rem 1.75rem',
                            background: '#0f172a',
                            color: 'white',
                            borderRadius: '14px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.3)'
                        }}
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/dashboard/jobs"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.85rem 1.75rem',
                            background: '#f1f5f9',
                            color: '#0f172a',
                            borderRadius: '14px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        <Search size={18} />
                        Find Jobs
                    </Link>
                </div>

                <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '2rem', opacity: 0.5 }}>
                    <ArrowLeft size={20} className="animate-pulse" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>DETOUR AHEAD</span>
                </div>
            </motion.div>
        </div>
    );
}
