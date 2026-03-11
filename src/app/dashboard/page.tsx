"use client";

import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BentoDashboard from "@/components/ui/bento-grid-01";

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
        <div style={{ background: '#fafafa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
            Loading...
        </div>
    );

    const displayName = user?.firstName || (isGuest ? "Guest" : "Candidate");
    const navUrl = (path: string) => isGuest ? `${path}?guest=true` : path;

    const handleLeaveGuest = () => {
        localStorage.removeItem('cursus_guest_mode');
        window.location.href = '/';
    };

    return (
        <div className="bg-[#fafafa] min-h-screen">
            {/* Guest Banner */}
            <AnimatePresence>
                {isGuest && !user && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            background: '#ffedd5',
                            borderBottom: '1px solid #fed7aa',
                            padding: '0.75rem 2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '0.875rem',
                            color: '#9a3412',
                            position: 'relative',
                            zIndex: 50
                        }}
                    >
                        <span>
                            You're in <strong style={{ color: '#c2410c' }}>Guest Mode</strong>. Data won't be saved.{' '}
                            <Link href="/" style={{ color: '#ea580c', fontWeight: 600 }}>Sign up free →</Link>
                        </span>
                        <button
                            onClick={handleLeaveGuest}
                            style={{ background: 'none', border: '1px solid #fdba74', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', color: '#9a3412' }}
                        >
                            Exit
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="w-full">
                    <BentoDashboard navUrl={navUrl} displayName={displayName} />
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div style={{ background: '#fafafa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                Loading Dashboard...
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
