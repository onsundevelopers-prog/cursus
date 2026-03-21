"use client";

import {
  FileText,
  MessageSquare,
  Globe,
  Briefcase,
  Mic,
  BarChart3,
  DollarSign,
  Download,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: FileText,
    name: "Resume Builder",
    description: "Land Interviews 2x faster with AI-powered resume optimization",
    href: "/dashboard/resume",
    cta: "Create Resume",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: MessageSquare,
    name: "Cover Letters",
    description: "Stand out with highly-personalized letters that command attention",
    href: "/dashboard/letter",
    cta: "Generate Letter",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Globe,
    name: "Career Link",
    description: "Showcase your work and let the best opportunities come to you",
    href: "/dashboard/portfolio",
    cta: "Build Portfolio",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Briefcase,
    name: "Job Finder",
    description: "Stop searching manually. We find matched roles for you",
    href: "/dashboard/jobs",
    cta: "Find Jobs",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20" />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Mic,
    name: "Interview Coach",
    description: "Ace any behavioral round with real-time AI speech coaching",
    href: "/dashboard/interview",
    cta: "Practice Interview",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-rose-500/20" />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: DollarSign,
    name: "Salary Coach",
    description: "Negotiate confidently with market data and AI guidance",
    href: "/dashboard/salary",
    cta: "Get Advice",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-500/20" />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: BarChart3,
    name: "Company Intel",
    description: "Deep insights into company culture, salary, and growth",
    href: "/dashboard/companies",
    cta: "Research",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20" />
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-4 lg:row-end-5",
  },
  {
    Icon: Download,
    name: "Export & Share",
    description: "Export your resume, cover letter, and portfolio with one click",
    href: "/dashboard/export",
    cta: "Export",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 to-gray-500/20" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
  },
];

export function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-4">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export { features };
