'use client';

import React, { useEffect, useRef } from 'react';
import {
  FileText,
  MessageSquare,
  Globe,
  Briefcase,
  Mic,
  BarChart3,
  DollarSign,
  Download,
} from 'lucide-react';

// Reusable BentoItem component
interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
}

const BentoItem = ({ className = '', children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty('--mouse-x', `${x}px`);
      item.style.setProperty('--mouse-y', `${y}px`);
    };

    item.addEventListener('mousemove', handleMouseMove);

    return () => {
      item.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`bento-item ${className}`}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as React.CSSProperties & { '--mouse-x': string; '--mouse-y': string }}
    >
      {children}
    </div>
  );
};

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  href: string;
}

const features: Feature[] = [
  {
    title: 'Resume Builder',
    description: 'Land interviews 2x faster with AI-powered resume optimization',
    icon: FileText,
    className: 'col-span-2 row-span-2 flex flex-col justify-between',
    href: '/dashboard/resume',
  },
  {
    title: 'Cover Letters',
    description: 'Personalized letters that command attention',
    icon: MessageSquare,
    className: '',
    href: '/dashboard/letter',
  },
  {
    title: 'Career Link',
    description: 'Showcase your work and attract opportunities',
    icon: Globe,
    className: '',
    href: '/dashboard/portfolio',
  },
  {
    title: 'Job Finder',
    description: 'Automated role matching for your profile',
    icon: Briefcase,
    className: '',
    href: '/dashboard/jobs',
  },
  {
    title: 'Interview Coach',
    description: 'Real-time AI speech coaching for interviews',
    icon: Mic,
    className: 'row-span-2',
    href: '/dashboard/interview',
  },
  {
    title: 'Company Intel',
    description: 'Deep insights into company culture and salary',
    icon: BarChart3,
    className: 'col-span-2',
    href: '/dashboard/companies',
  },
  {
    title: 'Salary Coach',
    description: 'Negotiate with confidence using market data',
    icon: DollarSign,
    className: '',
    href: '/dashboard/salary',
  },
  {
    title: 'Export & Share',
    description: 'Export your resume and portfolio with one click',
    icon: Download,
    className: '',
    href: '/dashboard/export',
  },
];

// Main Component
export const CyberneticBentoGrid = () => {
  return (
    <div className="main-container">
      <div className="w-full">
        <div className="bento-grid">
          {features.map((feature) => (
            <BentoItem key={feature.title} className={`${feature.className} cursor-pointer`}>
              <a href={feature.href} className="block h-full group">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <feature.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h2>
                    <p className="mt-2 text-gray-400 text-sm">{feature.description}</p>
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors mt-4">
                    Explore →
                  </div>
                </div>
              </a>
            </BentoItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export { BentoItem };
