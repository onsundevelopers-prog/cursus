"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Target, ShieldCheck, Target as TargetIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrbitalNode {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    delay: number;
}

const orbitalNodes: OrbitalNode[] = [
    { id: "1", label: "Seed Strategy", icon: <Zap size={14} />, color: "#3b82f6", delay: 0.1 },
    { id: "2", label: "Series A", icon: <Target size={14} />, color: "#8b5cf6", delay: 0.3 },
    { id: "3", label: "Growth Mode", icon: <ShieldCheck size={14} />, color: "#10b981", delay: 0.5 },
    { id: "4", label: "IPO Vision", icon: <TargetIcon size={14} />, color: "#f59e0b", delay: 0.7 },
];

export default function RadialOrbitalTimeline() {
    return (
        <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center bg-transparent">
            {/* Background Orbits */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                <div className="w-[80%] h-[80%] border-2 border-slate-900 rounded-full" />
                <div className="absolute w-[50%] h-[50%] border border-dashed border-slate-900 rounded-full" />
            </div>

            <svg viewBox="0 0 500 500" className="w-full h-full relative z-10 overflow-visible">
                {/* Center Core */}
                <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <motion.circle
                        cx="250"
                        cy="250"
                        r="35"
                        fill="#0f172a"
                        animate={{ 
                            boxShadow: ["0 0 0px #3b82f6", "0 0 20px #3b82f6", "0 0 0px #3b82f6"]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <text
                        x="250"
                        y="254"
                        textAnchor="middle"
                        fill="white"
                        className="text-[10px] font-black tracking-widest uppercase pointer-events-none"
                    >
                        CURSUS
                    </text>
                </motion.g>

                {/* Nodes & Connections */}
                {orbitalNodes.map((node, i) => {
                    const angle = (i * 360) / orbitalNodes.length;
                    const radius = 170;
                    const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 250 + radius * Math.sin((angle * Math.PI) / 180);

                    return (
                        <g key={node.id}>
                            {/* Connecting Line (Draw-in animation) */}
                            <motion.path
                                d={`M 250 250 L ${x} ${y}`}
                                stroke={node.color}
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.2 }}
                                transition={{ duration: 1.5, delay: node.delay, ease: "easeInOut" }}
                            />

                            {/* Node Group with Idle Float */}
                            <motion.g
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: node.delay + 0.5 }}
                            >
                                <motion.g
                                    animate={{ 
                                        y: [0, -8, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ 
                                        duration: 5 + i, 
                                        repeat: Infinity, 
                                        ease: "easeInOut",
                                        delay: i * 0.3
                                    }}
                                    style={{ originX: `${x}px`, originY: `${y}px` }}
                                >
                                    {/* Pulse Effect */}
                                    <motion.circle
                                        cx={x}
                                        cy={y}
                                        r="28"
                                        fill={node.color}
                                        initial={{ opacity: 0.1, scale: 0.8 }}
                                        animate={{ opacity: [0.05, 0.15, 0.05], scale: [0.9, 1.2, 0.9] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i }}
                                    />
                                    
                                    {/* Main Node Circle */}
                                    <motion.circle
                                        cx={x}
                                        cy={y}
                                        r="22"
                                        fill="white"
                                        stroke={node.color}
                                        strokeWidth="2.5"
                                        whileHover={{ scale: 1.15, strokeWidth: 4 }}
                                        className="cursor-pointer shadow-xl"
                                    />

                                    {/* Icon within Circle */}
                                    <foreignObject x={x - 11} y={y - 11} width="22" height="22">
                                        <div className="flex items-center justify-center w-full h-full pointer-events-none" style={{ color: node.color }}>
                                            {node.icon}
                                        </div>
                                    </foreignObject>

                                    {/* Floating Badge/Label */}
                                    <foreignObject x={x + 30} y={y - 15} width="160" height="40" className="overflow-visible">
                                        <motion.div
                                            whileHover={{ 
                                                y: -5, 
                                                boxShadow: "0 12px 24px -10px rgba(15, 23, 42, 0.15)",
                                                scale: 1.05
                                            }}
                                            className="inline-block bg-white border border-slate-100/80 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-sm transition-all cursor-default"
                                        >
                                            <span className="text-[11px] font-[900] text-slate-900 tracking-tight whitespace-nowrap uppercase">
                                                {node.label}
                                            </span>
                                        </motion.div>
                                    </foreignObject>
                                </motion.g>
                            </motion.g>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
