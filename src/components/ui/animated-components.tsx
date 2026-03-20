"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import {
    pageTransition,
    cardHover,
    cardTap,
    buttonHover,
    buttonTap,
    badgeHover,
    fadeInUp,
    staggerContainer,
    staggerItem,
    shimmerAnimation,
    pulseAnimation,
    spinAnimation,
    progressBarAnimation,
    nodeFloat,
    nodePulse,
    lineDrawIn,
    smoothEaseOut,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE TRANSITION WRAPPER
// ══════════════════════════════════════════════════════════════════════════════

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// ANIMATED CARD (hover effects)
// ══════════════════════════════════════════════════════════════════════════════

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    enableHover?: boolean;
    enableTap?: boolean;
}

export function AnimatedCard({ 
    children, 
    className, 
    enableHover = true, 
    enableTap = true,
    ...props 
}: AnimatedCardProps) {
    return (
        <motion.div
            whileHover={enableHover ? cardHover : undefined}
            whileTap={enableTap ? cardTap : undefined}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// ANIMATED BUTTON (glow/brighten on hover)
// ══════════════════════════════════════════════════════════════════════════════

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    className?: string;
}

export function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
    return (
        <motion.button
            whileHover={buttonHover}
            whileTap={buttonTap}
            className={className}
            {...props}
        >
            {children}
        </motion.button>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// ANIMATED BADGE (lift with shadow)
// ══════════════════════════════════════════════════════════════════════════════

interface AnimatedBadgeProps extends HTMLMotionProps<"span"> {
    children: ReactNode;
    className?: string;
}

export function AnimatedBadge({ children, className, ...props }: AnimatedBadgeProps) {
    return (
        <motion.span
            whileHover={badgeHover}
            className={className}
            {...props}
        >
            {children}
        </motion.span>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCROLL ANIMATED SECTION (fade in + slide up)
// ══════════════════════════════════════════════════════════════════════════════

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                        duration: 0.6,
                        ease: smoothEaseOut,
                        delay,
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// STAGGERED CHILDREN (for lists/grids)
// ══════════════════════════════════════════════════════════════════════════════

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({ children, className, staggerDelay = 0.1 }: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1,
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            variants={staggerItem}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// SHIMMER SKELETON LOADER
// ══════════════════════════════════════════════════════════════════════════════

interface ShimmerSkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
}

export function ShimmerSkeleton({ 
    className, 
    width = "100%", 
    height = "20px",
    borderRadius = "8px" 
}: ShimmerSkeletonProps) {
    return (
        <div 
            className={cn("relative overflow-hidden bg-slate-200/60", className)}
            style={{ width, height, borderRadius }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear"
                }}
            />
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// AI GENERATION LOADING INDICATOR (spinning + pulsing)
// ══════════════════════════════════════════════════════════════════════════════

interface AILoadingIndicatorProps {
    size?: number;
    className?: string;
    text?: string;
}

export function AILoadingIndicator({ size = 24, className, text }: AILoadingIndicatorProps) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="relative" style={{ width: size, height: size }}>
                {/* Outer spinning ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-300"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner pulsing core */}
                <motion.div
                    className="absolute inset-[25%] rounded-full bg-blue-500"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            {text && (
                <motion.span
                    className="text-slate-500 text-sm font-medium"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {text}
                </motion.span>
            )}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// ANIMATED PROGRESS BAR
// ══════════════════════════════════════════════════════════════════════════════

interface AnimatedProgressBarProps {
    value: number; // 0-100
    className?: string;
    barClassName?: string;
    height?: string | number;
}

export function AnimatedProgressBar({ 
    value, 
    className, 
    barClassName,
    height = "6px" 
}: AnimatedProgressBarProps) {
    return (
        <div 
            className={cn("w-full bg-slate-100 rounded-full overflow-hidden", className)}
            style={{ height }}
        >
            <motion.div
                className={cn("h-full bg-blue-500 rounded-full", barClassName)}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                transition={{
                    duration: 1,
                    ease: smoothEaseOut,
                    delay: 0.2,
                }}
            />
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// ORBITAL NODE (floating + pulsing)
// ══════════════════════════════════════════════════════════════════════════════

interface OrbitalNodeProps {
    children: ReactNode;
    className?: string;
    floatDuration?: number;
    floatDelay?: number;
}

export function OrbitalNode({ 
    children, 
    className, 
    floatDuration = 4,
    floatDelay = 0 
}: OrbitalNodeProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-3, 3, -3],
            }}
            transition={{
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
            }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.03, 1],
                    opacity: [0.9, 1, 0.9],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// ANIMATED LINE (draw-in effect for connecting lines)
// ══════════════════════════════════════════════════════════════════════════════

interface AnimatedLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    className?: string;
    strokeWidth?: number;
    delay?: number;
}

export function AnimatedLine({ 
    x1, y1, x2, y2, 
    className, 
    strokeWidth = 2,
    delay = 0 
}: AnimatedLineProps) {
    return (
        <motion.line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={className}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                pathLength: { duration: 1.5, ease: "easeOut", delay },
                opacity: { duration: 0.3, delay }
            }}
        />
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// DATA LOADING SKELETON (for content areas)
// ══════════════════════════════════════════════════════════════════════════════

interface ContentSkeletonProps {
    lines?: number;
    className?: string;
}

export function ContentSkeleton({ lines = 3, className }: ContentSkeletonProps) {
    return (
        <div className={cn("space-y-3", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <ShimmerSkeleton 
                    key={i} 
                    width={i === lines - 1 ? "60%" : "100%"} 
                    height="16px" 
                />
            ))}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// CARD SKELETON (for card loading states)
// ══════════════════════════════════════════════════════════════════════════════

interface CardSkeletonProps {
    className?: string;
    hasImage?: boolean;
}

export function CardSkeleton({ className, hasImage = true }: CardSkeletonProps) {
    return (
        <div className={cn("rounded-2xl bg-white border border-slate-100 p-4 space-y-4", className)}>
            {hasImage && (
                <ShimmerSkeleton height="120px" borderRadius="12px" />
            )}
            <div className="space-y-2">
                <ShimmerSkeleton height="20px" width="70%" />
                <ShimmerSkeleton height="14px" width="90%" />
                <ShimmerSkeleton height="14px" width="50%" />
            </div>
        </div>
    );
}
