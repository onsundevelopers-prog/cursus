"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Target } from 'lucide-react';

const comparison = [
    { feature: "Job Search Depth", cursus: "Deep Scrape (50+ Sources)", competition: "Basic Keywords (LinkedIn Only)" },
    { feature: "AI Customization", cursus: "Hyper-Personalized Persona", competition: "Generic Templates" },
    { feature: "Application Speed", cursus: "One-Click Instant Apply", competition: "Manual Data Entry" },
    { feature: "Portfolio Integration", cursus: "Automatic Live Deployment", competition: "Static Text Profile" },
    { feature: "Support", cursus: "24/7 AI Career Coach", competition: "Community Forums" },
];

export function ComparisonSection() {
    return (
        <section className="py-32 px-6 max-w-6xl mx-auto">
            <div className="text-center mb-20">
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.07em', color: '#0f172a', lineHeight: 1, marginBottom: '2rem' }}>
                    Why wait for basic tools <br />to <span style={{ color: '#ef4444' }}>fail</span> you?
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '32rem', margin: '0 auto', fontWeight: 500 }}>
                    Cursus is built for the top 1% of candidates who demand more from their tools.
                </p>
            </div>

            <div style={{
                background: 'white',
                borderRadius: '48px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.08)',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    background: '#f8fafc',
                    padding: '2.5rem 3rem',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#94a3b8',
                    borderBottom: '1px solid #f1f5f9'
                }}>
                    <div>Feature</div>
                    <div style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Target size={18} /> Cursus
                    </div>
                    <div>Others</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {comparison.map((item, i) => (
                        <div key={i} style={{
                            display: 'grid',
                            gridTemplateColumns: '1.2fr 1fr 1fr',
                            padding: '2.5rem 3rem',
                            alignItems: 'center',
                            transition: 'all 0.3s ease',
                            borderBottom: i !== comparison.length - 1 ? '1px solid #f8fafc' : 'none'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <div style={{ fontWeight: 800, color: '#475569', fontSize: '1.1rem' }}>{item.feature}</div>
                            <div style={{ color: '#0f172a', fontWeight: 900, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '24px', height: '24px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Check size={14} className="text-green-600" />
                                </div>
                                {item.cursus}
                            </div>
                            <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <X size={18} className="text-slate-300" />
                                {item.competition}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    padding: '5rem 3rem',
                    background: '#0f172a',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 0.05, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <Zap size={600} className="text-white" />
                    </motion.div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'white', marginBottom: '2.5rem', position: 'relative', zIndex: 10, letterSpacing: '-0.04em' }}>
                        Ready to join the winner&apos;s circle?
                    </h3>
                    <button style={{
                        background: 'white',
                        color: '#0f172a',
                        padding: '1.25rem 3rem',
                        borderRadius: '20px',
                        fontWeight: 900,
                        fontSize: '1.25rem',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                        zIndex: 10
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Start Your Free Career Scan
                    </button>
                </div>
            </div>
        </section>
    );
}
