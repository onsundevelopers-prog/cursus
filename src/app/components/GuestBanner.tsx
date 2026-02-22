"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function GuestBanner() {
    const { user } = useUser();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        const guestParam = searchParams.get('guest') === 'true';
        const storedGuest = localStorage.getItem('cursus_guest_mode') === 'true';

        if (guestParam || storedGuest) {
            setIsGuest(true);
            if (guestParam) {
                localStorage.setItem('cursus_guest_mode', 'true');
            }
        }
    }, [searchParams]);

    if (!isGuest || user) return null;

    const handleLeaveGuest = () => {
        localStorage.removeItem('cursus_guest_mode');
        router.push('/');
    };

    return (
        <div style={{
            background: '#fff9c4',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            border: '1px solid #fbc02d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }}>
            <span>
                <strong>Guest Mode:</strong> Progress won't be saved.
                <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600, marginLeft: '0.5rem' }}>Sign up</Link>
            </span>
            <button
                onClick={handleLeaveGuest}
                style={{
                    background: 'none',
                    border: '1px solid #fbc02d',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                }}
            >
                Exit
            </button>
        </div>
    );
}
