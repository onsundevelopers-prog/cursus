"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Framer,
    Chrome,
    Figma,
    Github,
    Slack,
    Twitter,
    Zap,
    Cpu,
    Target
} from 'lucide-react';

const logos = [
    { icon: <Framer size={24} />, name: "Framer" },
    { icon: <Chrome size={24} />, name: "Chrome" },
    { icon: <Figma size={24} />, name: "Figma" },
    { icon: <Github size={24} />, name: "Github" },
    { icon: <Slack size={24} />, name: "Slack" },
    { icon: <Twitter size={24} />, name: "Twitter" },
    { icon: <Zap size={24} />, name: "Linear" },
    { icon: <Cpu size={24} />, name: "Vercel" },
    { icon: <Target size={24} />, name: "Notion" },
];

export function LogoMarquee() {
    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            padding: '4rem 0',
            background: 'transparent',
        }}>
            <p style={{
                textAlign: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#94a3b8',
                marginBottom: '2.5rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
            }}>
                Trusted by the world&apos;s best teams
            </p>

            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
            }}>
                {/* Progressive Blur / Gradient Edges */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '150px',
                    background: 'linear-gradient(to right, white, transparent)',
                    zIndex: 10,
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '150px',
                    background: 'linear-gradient(to left, white, transparent)',
                    zIndex: 10,
                    pointerEvents: 'none'
                }} />

                <motion.div
                    animate={{
                        x: [0, -1035], // Adjusted for content width
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        display: 'flex',
                        gap: '4rem',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: '#0f172a',
                            opacity: 0.4,
                            filter: 'grayscale(100%)',
                            transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.filter = 'grayscale(0%)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '0.4';
                                e.currentTarget.style.filter = 'grayscale(100%)';
                            }}
                        >
                            {logo.icon}
                            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>{logo.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
