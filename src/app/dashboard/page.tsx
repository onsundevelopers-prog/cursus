"use client";

import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BentoDashboard from "@/components/ui/bento-grid-01";
import { PageTransition, ShimmerSkeleton, CardSkeleton } from "@/components/ui/animated-components";
import { pageTransition } from "@/lib/animations";

function DashboardLoadingSkeleton() {
    return (
        <div className="bg-[#fafafa] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="space-y-6">
                    <ShimmerSkeleton width="120px" height="14px" />
                    <ShimmerSkeleton width="400px" height="48px" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <CardSkeleton key={i} className={i === 0 || i === 2 ? "row-span-2 sm:col-span-2" : "sm:col-span-2"} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

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

    if (!isLoaded) return <DashboardLoadingSkeleton />;

    const displayName = user?.firstName || (isGuest ? "Guest" : "Candidate");
    const navUrl = (path: string) => isGuest ? `${path}?guest=true` : path;

    const handleLeaveGuest = () => {
        localStorage.removeItem('cursus_guest_mode');
        window.location.href = '/';
    };

    return (
        <PageTransition>
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
                                <Link href="/" style={{ color: '#ea580c', fontWeight: 600 }}>Sign up free</Link>
                            </span>
                            <motion.button
                                onClick={handleLeaveGuest}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ background: 'none', border: '1px solid #fdba74', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', color: '#9a3412' }}
                            >
                                Exit
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="w-full">
                        <BentoDashboard navUrl={navUrl} displayName={displayName} />
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<DashboardLoadingSkeleton />}>
            <DashboardContent />
        </Suspense>
    );
}
