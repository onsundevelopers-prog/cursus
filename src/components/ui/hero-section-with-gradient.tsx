"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Sparkles, Stars, FileText, Zap, ShieldCheck, Target } from "lucide-react";
import { duolingoSpring, duolingoEase } from "@/lib/animations";

// ── AnimatedGroup ────────────────────────────────────────────────────────────

type PresetType =
    | 'fade' | 'slide' | 'scale' | 'blur'
    | 'blur-slide' | 'zoom' | 'flip'
    | 'bounce' | 'rotate' | 'swing';

type AnimatedGroupProps = {
    children: ReactNode;
    className?: string;
    variants?: { container?: Variants; item?: Variants };
    preset?: PresetType;
};

const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const defaultItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

function AnimatedGroup({ children, className, variants, preset }: AnimatedGroupProps) {
    const containerVariants = variants?.container || defaultContainerVariants;
    const itemVariants = variants?.item || defaultItemVariants;
    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className={cn(className)}>
            {React.Children.map(children, (child, index) => (
                <motion.div key={index} variants={itemVariants}>{child}</motion.div>
            ))}
        </motion.div>
    );
}

// ── HeroSection ──────────────────────────────────────────────────────────────

export default function HeroSection_05() {
    const gradientRef = useRef<HTMLDivElement>(null);

    const transitionVariants = {
        item: {
            hidden: { opacity: 0, filter: "blur(12px)", y: 20, scale: 0.9 },
            visible: {
                opacity: 1, filter: "blur(0px)", y: 0, scale: 1,
                transition: { ...duolingoSpring, delay: 0.5 },
            },
        },
    };

    const { isSignedIn } = useUser();
    const router = useRouter();
    const { openSignUp } = useClerk();

    const handleResumeClick = () => {
        if (isSignedIn) {
            router.push("/dashboard");
        } else {
            openSignUp({ afterSignUpUrl: "/dashboard" });
        }
    };

    const floatingVariants = {
        animate: {
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const floatingDelayedVariants = {
        animate: {
            y: [0, -15, 0],
            rotate: [0, -8, 8, 0],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
            }
        }
    };

    useEffect(() => {
        if (!gradientRef.current) return;
        gsap.fromTo(
            gradientRef.current,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
        );
    }, []);

    return (
        <div style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%' }}>
                {/* Gradient background */}
                <div
                    ref={gradientRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: -1,
                        background: `
                            radial-gradient(circle at 10% 20%, rgba(255, 106, 0, 0.05) 0%, transparent 40%),
                            radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
                            white
                        `,
                        backgroundAttachment: 'fixed'
                    }}
                />

                {/* Hero text */}
                <div style={{ paddingTop: '8rem', paddingBottom: '6rem', textAlign: 'center', position: 'relative' }}>

                    <div style={{ position: 'relative', maxWidth: '48rem', margin: '0 auto', zIndex: 2 }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 850, color: '#0f172a', letterSpacing: '-0.05em', lineHeight: 1.02 }}
                        >
                            Build a career <span style={{ background: 'linear-gradient(to right, #3b82f6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>you actually love.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ marginTop: '1.5rem', fontSize: '1.25rem', color: '#64748b', maxWidth: '38rem', margin: '1.5rem auto 0', lineHeight: 1.6 }}
                        >
                            No more boring resume builders. Cursus handles the hard stuff — so you can focus on landing that dream role.
                        </motion.p>



                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } },
                                },
                                ...transitionVariants,
                            }}
                            className={cn("mt-12 flex flex-col items-center justify-center gap-6")}
                        >
                            {/* Dominant Primary CTA with Glowing Border */}
                            <motion.div 
                                style={{ 
                                    borderRadius: '16px', 
                                    padding: '3px', 
                                    background: 'linear-gradient(90deg, #3b82f6, #a855f7, #3b82f6)',
                                    backgroundSize: '200% auto',
                                    boxShadow: '0 0 40px -10px rgba(59, 130, 246, 0.4)'
                                }}
                                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 50px -5px rgba(59, 130, 246, 0.5)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <button
                                    onClick={handleResumeClick}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center',
                                        padding: '1.5rem 4rem',
                                        background: '#0a0a0c', color: 'white',
                                        borderRadius: '14px', fontWeight: 900,
                                        fontSize: '1.4rem', textDecoration: 'none',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap',
                                        border: 'none',
                                        cursor: 'pointer',
                                        letterSpacing: '-0.02em'
                                    }}
                                >
                                    Create Your Resume Now
                                </button>
                            </motion.div>

                            {/* Ghost Secondary CTA */}
                            <div>
                                <Link
                                    href="/dashboard?guest=true"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center',
                                        padding: '0.75rem 1.75rem',
                                        color: '#94a3b8',
                                        fontWeight: 800,
                                        fontSize: '1.1rem', textDecoration: 'none',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap',
                                        letterSpacing: '-0.01em'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                >
                                    Or explore sandbox
                                </Link>
                            </div>
                        </AnimatedGroup>
                    </div>
                </div>

                {/* App preview image */}
                <AnimatedGroup
                    variants={{
                        container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                        ...transitionVariants,
                    }}
                >
                    <div style={{ position: 'relative', overflow: 'hidden', padding: '0 0.5rem' }}>
                        <div style={{
                            position: 'relative', maxWidth: '64rem', margin: '0 auto',
                            background: 'white', borderRadius: '16px 16px 0 0',
                            border: '1px solid rgba(0,0,0,0.06)', borderBottom: 'none',
                            padding: '1rem',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                            maxHeight: '40vh', overflow: 'hidden',
                        }}>
                            {/* Fade-out overlay */}
                            <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'linear-gradient(to bottom, transparent 35%, white 100%)', borderRadius: '16px 16px 0 0' }} />
                            <Image
                                src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                                alt="Cursus app preview"
                                width={2700}
                                height={1440}
                                unoptimized
                                style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
                                />
                        </div>
                    </div>
                </AnimatedGroup>

                {/* Floating Action Circles (Bottom Right Column) */}
                <div style={{
                    position: 'fixed',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    zIndex: 200
                }}>
                    {['S', 'W', 'X'].map((letter, idx) => (
                        <motion.div
                            key={letter}
                            whileHover={{ scale: 1.1, x: -5 }}
                            style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: 'white',
                                border: `1.5px solid ${letter === 'X' ? '#a855f7' : '#3b82f6'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                fontWeight: 800,
                                color: letter === 'X' ? '#a855f7' : '#3b82f6',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {letter}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { AnimatedGroup };
