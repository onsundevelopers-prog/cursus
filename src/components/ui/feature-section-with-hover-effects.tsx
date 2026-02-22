"use client";

import {
    IconEaseInOut,
    IconRobot,
    IconWorldWww,
    IconDeviceAnalytics
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
    const features = [
        {
            title: "Deep Scrape Engine",
            description: "We scan thousands of databases to find roles that match your DNA, not just your keywords.",
            icon: <IconEaseInOut size={28} />,
        },
        {
            title: "AI Simulation",
            description: "Train with an AI briefed on your target company and role. Get pinpoint voice feedback.",
            icon: <IconRobot size={28} />,
        },
        {
            title: "One-Click Deploy",
            description: "Instantly publish a web portfolio that recruiters love to share across their network.",
            icon: <IconWorldWww size={28} />,
        },
        {
            title: "Match Analytics",
            description: "Real-time insights into how your profile compares against the competitive applicant pool.",
            icon: <IconDeviceAnalytics size={28} />,
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 py-8 relative z-10 w-full">
            {features.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300 shadow-sm">
                        {feature.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">{feature.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-[15px]">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
