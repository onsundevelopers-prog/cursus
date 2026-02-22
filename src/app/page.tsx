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
        <div className="app-container" style={{ background: '#fff', scrollBehavior: 'smooth' }}>
            <main>
                {/* ── Hero Section (Full width bleed) ── */}
                <section style={{ position: 'relative' }}>
                    <HeroSection_05 />
                </section>




            </main>

            <footer style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '8rem 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <Link href="/" style={{ fontSize: '1.75rem', fontWeight: 900, textDecoration: 'none', color: '#0f172a', letterSpacing: '-0.05em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', background: '#0f172a', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>C</div>
                            Cursus
                        </Link>
                        <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 }}>
                            The AI Career Co-pilot for <br />
                            high-performance teams.
                        </p>
                        <p style={{ marginTop: '2.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                            © 2026 Cursus AI Technologies.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '6rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <span style={{ fontWeight: 900, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Legal</span>
                            <a href="#" style={{ color: '#475569', fontSize: '0.95rem', textDecoration: 'none', fontWeight: 600 }}>Privacy</a>
                            <a href="#" style={{ color: '#475569', fontSize: '0.95rem', textDecoration: 'none', fontWeight: 600 }}>Terms</a>
                        </div>
                    </div>
                </div>
            </footer>

            <Mascot />
        </div >
    );
}
