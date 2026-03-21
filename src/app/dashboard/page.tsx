"use client";

import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CyberneticBentoGrid } from "@/components/ui/cybernetic-bento-grid";

function DashboardContent() {
    const { user, isLoaded } = useUser();
    const searchParams = useSearchParams();
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        const guestParam = searchParams.get('guest') === 'true';
        const storedGuest = localStorage.getItem('cursus_guest_mode') === 'true';
        if (guestParam) {
            localStorage.setItem('cursus_guest_mode', 'true');
            setIsGuest(true);
        } else if (storedGuest) {
            setIsGuest(true);
        }
    }, [searchParams]);

    if (!isLoaded) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen"
            style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)' }}
        >
            <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: '40px', width: '40px', borderRadius: '50%', border: '4px solid #22d3ee', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}
            />
        </motion.div>
    );

    const displayName = user?.firstName || (isGuest ? "Guest" : "Candidate");
    const navUrl = (path: string) => isGuest ? `${path}?guest=true` : path;

    const handleLeaveGuest = () => {
        localStorage.removeItem('cursus_guest_mode');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)' }}>
            {/* Guest Banner */}
            <AnimatePresence>
                {isGuest && !user && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            background: 'rgba(34, 211, 238, 0.1)',
                            borderBottom: '1px solid rgba(34, 211, 238, 0.3)',
                            padding: '0.75rem 2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '0.875rem',
                            color: '#22d3ee',
                            position: 'relative',
                            zIndex: 50,
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <span>
                            You're in <strong style={{ color: '#06b6d4' }}>Guest Mode</strong>. Data won't be saved.{' '}
                            <Link href="/" style={{ color: '#22d3ee', fontWeight: 600 }}>Sign up free →</Link>
                        </span>
                        <button
                            onClick={handleLeaveGuest}
                            style={{ background: 'rgba(34, 211, 238, 0.2)', border: '1px solid rgba(34, 211, 238, 0.4)', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', color: '#22d3ee' }}
                        >
                            Exit
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <CyberneticBentoGrid />
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)' }}>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center"
                >
                    <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ height: '40px', width: '40px', borderRadius: '50%', border: '4px solid #22d3ee', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}
                    />
                </motion.div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
