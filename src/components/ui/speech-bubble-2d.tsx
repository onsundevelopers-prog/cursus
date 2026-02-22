"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Matter from 'matter-js';

interface SpeechBubble2DProps {
    text: string;
    onClose: () => void;
}

export function SpeechBubble2D({ text, onClose }: SpeechBubble2DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const engine = useRef(Matter.Engine.create({ gravity: { x: 0, y: 0 } }));

    useEffect(() => {
        const currentEngine = engine.current;
        // Smaller physics box for the smaller bubble
        const bubble = Matter.Bodies.rectangle(0, 0, 320, 140, {
            restitution: 0.9,
            frictionAir: 0.05,
            chamfer: { radius: 24 }
        });

        Matter.Composite.add(currentEngine.world, bubble);

        const ground = Matter.Bodies.rectangle(0, 200, 1000, 50, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(0, -200, 1000, 50, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(-200, 0, 50, 1000, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(200, 0, 50, 1000, { isStatic: true });
        Matter.Composite.add(currentEngine.world, [ground, ceiling, leftWall, rightWall]);

        Matter.Body.setVelocity(bubble, { x: (Math.random() - 0.5) * 2, y: -4 });

        const update = () => {
            Matter.Engine.update(currentEngine, 16.666);
            if (containerRef.current) {
                const { x, y } = bubble.position;
                containerRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${bubble.angle * 0.04}rad)`;
            }
            requestAnimationFrame(update);
        };

        const animId = requestAnimationFrame(update);
        return () => {
            cancelAnimationFrame(animId);
            Matter.Engine.clear(currentEngine);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute bottom-full right-0 mb-6 z-[1000] pointer-events-auto"
            style={{ width: '340px' }}
        >
            <div className="relative group">
                {/* Main White Bubble - Scaled Down */}
                <div className="bg-white border-2 border-[#e5e5e5] rounded-[24px] p-5 shadow-[0_10px_0_rgba(229,229,229,1),0_15px_30px_rgba(0,0,0,0.08)]">

                    <div className="flex flex-col gap-3">
                        {/* Level Indicators (Simplified for smaller size) */}
                        <div className="flex flex-col gap-2 opacity-60">
                            <div className="flex gap-1.5">
                                <div className="h-2 w-10 bg-[#e5e5e5] rounded-full" />
                                <div className="h-2 w-20 bg-[#e5e5e5] rounded-full" />
                            </div>
                            <div className="flex gap-1.5">
                                <div className="h-2 w-16 bg-[#e5e5e5] rounded-full" />
                                <div className="h-2 w-8 bg-[#e5e5e5] rounded-full" />
                            </div>
                        </div>

                        {/* The Text Content - Slightly smaller font */}
                        <p className="text-[#4b4b4b] font-black text-xl tracking-tight leading-snug">
                            "{text}"
                        </p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-[#4b4b4b] text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg z-10"
                    >
                        <X size={14} strokeWidth={3} />
                    </button>
                </div>

                {/* Speech Bubble Tail - Scaled down */}
                <div
                    className="absolute -bottom-3 right-10 w-6 h-6 bg-white border-r-2 border-b-2 border-[#e5e5e5] rotate-45 rounded-sm shadow-[4px_4px_0_rgba(229,229,229,1)]"
                />
            </div>
        </div>
    );
}
