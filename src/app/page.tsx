"use client";

import React from 'react';
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import HeroSection_05 from "@/components/ui/hero-section-with-gradient";
import { motion, MotionProps } from "framer-motion";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { BentoFeatures } from "@/components/ui/bento-features";
import { InteractiveFeatureTabs } from "@/components/ui/interactive-feature-tabs";
import { ComparisonSection } from "@/components/ui/comparison-section";
import { Mascot } from "@/components/ui/mascot";
import { duolingoEase, duolingoSpring } from "@/lib/animations";

const fadeInUp: MotionProps = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true },
    transition: {
        ...duolingoSpring,
        delay: 0.2
    },
};

export default function Home() {
    return (
        <div className="app-container" style={{ background: '#09090b', scrollBehavior: 'smooth' }}>
            <main>
                {/* Hero Section */}
                <section style={{ position: 'relative' }}>
                    <HeroSection_05 />
                </section>
            </main>

            <footer style={{ background: '#09090b', borderTop: '1px solid #27272a', padding: '6rem 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '3rem' }}>
                    <div>
                        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, textDecoration: 'none', color: '#fafafa', letterSpacing: '-0.04em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700 }}>C</div>
                            Cursus
                        </Link>
                        <p style={{ marginTop: '1.25rem', color: '#71717a', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6 }}>
                            The AI Career Co-pilot for<br />
                            high-performance teams.
                        </p>
                        <p style={{ marginTop: '2rem', color: '#52525b', fontSize: '0.8rem' }}>
                            © 2026 Cursus AI Technologies.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '4rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.7rem', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Legal</span>
                            <a href="#" style={{ color: '#a1a1aa', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Privacy</a>
                            <a href="#" style={{ color: '#a1a1aa', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Terms</a>
                        </div>
                    </div>
                </div>
            </footer>

            <Mascot />
        </div>
    );
}
