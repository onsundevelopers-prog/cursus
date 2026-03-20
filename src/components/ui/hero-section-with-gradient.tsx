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
import { Sparkles, ArrowRight } from "lucide-react";
import { duolingoSpring, duolingoEase } from "@/lib/animations";

// AnimatedGroup component
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

    useEffect(() => {
        if (!gradientRef.current) return;
        gsap.fromTo(
            gradientRef.current,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
        );
    }, []);

    return (
        <div style={{ padding: '0', overflow: 'hidden', background: '#09090b' }}>
            <div style={{ position: 'relative', width: '100%' }}>
                {/* Premium gradient background */}
                <div
                    ref={gradientRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        background: `
                            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
                            radial-gradient(circle at 80% 60%, rgba(99, 102, 241, 0.05) 0%, transparent 30%)
                        `,
                    }}
                />
                
                {/* Grid pattern overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
                }} />

                {/* Hero content */}
                <div style={{ paddingTop: '10rem', paddingBottom: '8rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'relative', maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem' }}>
                        
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ marginBottom: '2rem' }}
                        >
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'rgba(99, 102, 241, 0.1)',
                                border: '1px solid rgba(99, 102, 241, 0.2)',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: '#a5b4fc'
                            }}>
                                <Sparkles size={14} />
                                AI-Powered Career Platform
                            </span>
                        </motion.div>

                        {/* Main headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            style={{ 
                                fontSize: 'clamp(2.75rem, 7vw, 5rem)', 
                                fontWeight: 800, 
                                letterSpacing: '-0.04em', 
                                lineHeight: 1.05,
                                marginBottom: '1.5rem'
                            }}
                        >
                            <span style={{ color: '#fafafa' }}>Build a career</span>
                            <br />
                            <span style={{ 
                                background: 'linear-gradient(135deg, #6366f1, #a855f7, #6366f1)', 
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent'
                            }}>you actually love.</span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ 
                                fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
                                color: '#a1a1aa', 
                                maxWidth: '36rem', 
                                margin: '0 auto', 
                                lineHeight: 1.7 
                            }}
                        >
                            No more boring resume builders. Cursus handles the hard stuff — so you can focus on landing that dream role.
                        </motion.p>

                        {/* CTA Buttons */}
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } },
                                },
                                ...transitionVariants,
                            }}
                            className={cn("mt-12 flex flex-col sm:flex-row items-center justify-center gap-4")}
                        >
                            {/* Primary CTA */}
                            <motion.button
                                onClick={handleResumeClick}
                                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    display: 'inline-flex', 
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1.25rem 2.5rem',
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                                    color: 'white',
                                    borderRadius: '14px', 
                                    fontWeight: 700,
                                    fontSize: '1.1rem', 
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 24px rgba(99, 102, 241, 0.3)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Get Started Free
                                <ArrowRight size={18} />
                            </motion.button>

                            {/* Secondary CTA */}
                            <Link
                                href="/dashboard?guest=true"
                                style={{
                                    display: 'inline-flex', 
                                    alignItems: 'center',
                                    padding: '1.25rem 2rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: '#fafafa',
                                    borderRadius: '14px',
                                    fontWeight: 600,
                                    fontSize: '1.1rem', 
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                }}
                            >
                                Explore Demo
                            </Link>
                        </AnimatedGroup>
                    </div>
                </div>

                {/* App preview with premium styling */}
                <AnimatedGroup
                    variants={{
                        container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                        ...transitionVariants,
                    }}
                >
                    <div style={{ position: 'relative', overflow: 'hidden', padding: '0 1rem' }}>
                        <div style={{
                            position: 'relative', 
                            maxWidth: '72rem', 
                            margin: '0 auto',
                            background: '#18181b', 
                            borderRadius: '20px 20px 0 0',
                            border: '1px solid #27272a', 
                            borderBottom: 'none',
                            padding: '0.75rem',
                            boxShadow: '0 -20px 80px rgba(99, 102, 241, 0.1)',
                        }}>
                            {/* Browser chrome */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '1px solid #27272a',
                                marginBottom: '0.75rem'
                            }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
                                </div>
                                <div style={{ 
                                    flex: 1, 
                                    display: 'flex', 
                                    justifyContent: 'center' 
                                }}>
                                    <div style={{
                                        background: '#27272a',
                                        borderRadius: '6px',
                                        padding: '0.35rem 1rem',
                                        fontSize: '0.75rem',
                                        color: '#71717a'
                                    }}>
                                        cursus.ai/dashboard
                                    </div>
                                </div>
                            </div>
                            
                            {/* Screenshot container with fade */}
                            <div style={{ 
                                position: 'relative', 
                                maxHeight: '45vh', 
                                overflow: 'hidden',
                                borderRadius: '12px'
                            }}>
                                {/* Fade overlay */}
                                <div style={{ 
                                    position: 'absolute', 
                                    inset: 0, 
                                    zIndex: 10, 
                                    background: 'linear-gradient(to bottom, transparent 40%, #09090b 100%)', 
                                    pointerEvents: 'none'
                                }} />
                                <Image
                                    src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                                    alt="Cursus app preview"
                                    width={2700}
                                    height={1440}
                                    unoptimized
                                    style={{ 
                                        borderRadius: '8px', 
                                        width: '100%', 
                                        height: 'auto',
                                        opacity: 0.9
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedGroup>
            </div>
        </div>
    );
}

export { AnimatedGroup };
