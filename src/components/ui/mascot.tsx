"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeechBubble2D } from "./speech-bubble-2d";

interface MascotProps {
    className?: string;
}

const jobTips = [
    "Execution is the only apology.",
    "Your portfolio is your best resume.",
    "Draft the vision, then build the engine.",
    "Design for humans, build for the future.",
    "Momentum is your most valuable currency."
];

export function Mascot({ className }: MascotProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [tipIndex, setTipIndex] = useState(0);
    const [isJumping, setIsJumping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            // Auto show bubble after a delay to be helpful
            setTimeout(() => setShowBubble(true), 1500);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        setIsJumping(true);
        setShowBubble(true);
        setTipIndex((prev) => (prev + 1) % jobTips.length);
        setTimeout(() => setIsJumping(false), 800);
    };

    return (
        <div className={`fixed bottom-12 right-12 z-[999] flex flex-col items-end pointer-events-none ${className || ''}`}>

            {/* The Exactly-Like-The-Photo Bubble */}
            <AnimatePresence>
                {isVisible && showBubble && (
                    <motion.div
                        key={tipIndex}
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 30 }}
                        className="relative z-10"
                    >
                        <SpeechBubble2D
                            text={jobTips[tipIndex]}
                            onClose={() => setShowBubble(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2D Mascot Character (SVG) */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{
                            y: isJumping ? [0, -40, 0] : 0,
                            scale: isJumping ? [1, 1.1, 1] : 1,
                            opacity: 1
                        }}
                        transition={{
                            y: { duration: 0.6, ease: "easeOut" },
                            scale: { duration: 0.6 }
                        }}
                        className="pointer-events-auto cursor-pointer"
                        onClick={handleClick}
                    >
                        {/* The "C" Mascot SVG - Classic 2D version */}
                        <svg width="84" height="84" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M48 16C44 12 38 10 32 10C19.85 10 10 19.85 10 32C10 44.15 19.85 54 32 54C38 54 44 52 48 48"
                                stroke="#0f172a"
                                strokeWidth="12"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            <g>
                                <circle cx="24" cy="28" r="3.5" fill="#0f172a" />
                                <circle cx="36" cy="24" r="3.5" fill="#0f172a" />
                                <circle cx="25" cy="27" r="1.2" fill="white" />
                                <circle cx="37" cy="23" r="1.2" fill="white" />
                            </g>
                            <circle cx="20" cy="40" r="3.5" fill="#3b82f6" opacity="0.4" />
                            <circle cx="44" cy="36" r="3.5" fill="#3b82f6" opacity="0.4" />
                        </svg>

                        {/* Subtle Floating Animation */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-blue-500/5 rounded-full blur-xl -z-10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
