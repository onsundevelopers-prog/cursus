"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Loader2, FolderGit2, Github, CloudUpload, FileCode2, CheckCircle2, Circle, Info, Lightbulb } from "lucide-react";
import React, { useRef, useEffect, useState, Suspense } from "react";
import GuestBanner from "../../components/GuestBanner";
import { cn } from "@/lib/utils";

function PortfolioContent() {
    const [input, setInput] = useState("");
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat/portfolio" }),
    });

    const isLoading = status === "streaming" || status === "submitted";

    // Simplified guidance state
    const [checklist, setChecklist] = useState([
        { id: 1, label: "Define Projects", sub: "Add at least 3 key projects", done: false },
        { id: 2, label: "Tech Stack", sub: "List languages & frameworks", done: false },
        { id: 3, label: "Work Results", sub: "Metrics or impacts (e.g. +20% ROI)", done: false },
        { id: 4, label: "Personal Branding", sub: "Bio and headshot setup", done: false },
    ]);

    useEffect(() => {
        if (messages.length > 2) {
            setChecklist(prev => prev.map((item, i) => i < 2 ? { ...item, done: true } : item));
        }
        if (messages.length > 5) {
            setChecklist(prev => prev.map((item, i) => i < 4 ? { ...item, done: true } : item));
        }
    }, [messages]);

    const progressValue = (checklist.filter(c => c.done).length / checklist.length) * 100;

    // Simulating generated portfolio files
    const simulatedFiles = messages.length > 2 ? [
        { name: 'index.html', type: 'code' },
        { name: 'style.css', type: 'code' },
        { name: 'projects.js', type: 'code' },
        { name: 'profile.jpg', type: 'asset' },
        { name: 'resume.pdf', type: 'asset' }
    ] : [];

    const latestAiMessage = [...messages].reverse().find(m => m.role === 'assistant');

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;
        sendMessage({ text: input });
        setInput("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleDeployToGithub = () => {
        if (simulatedFiles.length === 0) {
            alert("No files to deploy yet. Tell the AI to generate your portfolio first!");
            return;
        }
        alert("Simulating GitHub Deployment...\n\nIn the real app, this will commit these generated files to your connected GitHub repository and activate GitHub Pages for instant hosting!");
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', background: '#fafafa' }}>
            <GuestBanner />

            <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid #e2e8f0', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 850, color: '#0f172a', letterSpacing: '-0.03em' }}>Portfolio Builder</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                        <div style={{ width: '120px', height: '6px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ width: `${progressValue}%`, height: '100%', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', transition: 'width 0.5s ease' }} />
                        </div>
                        <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>{Math.round(progressValue)}% Complete</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={handleDeployToGithub}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem',
                            background: '#0f172a', color: 'white', border: 'none', borderRadius: '10px',
                            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                    >
                        <Github size={16} /> Deploy Live
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Left Panel: Checklist & Guide */}
                <div style={{ width: '280px', borderRight: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700, marginBottom: '1.5rem' }}>Your Roadmap</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {checklist.map((item) => (
                            <div key={item.id} style={{ display: 'flex', gap: '0.75rem', opacity: item.done ? 0.6 : 1 }}>
                                {item.done ? <CheckCircle2 size={18} className="text-green-500 shrink-0" /> : <Circle size={18} className="text-slate-300 shrink-0" />}
                                <div>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', lineHeight: 1 }}>{item.label}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 'auto', background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#8b5cf6' }}>
                            <Lightbulb size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>AI Tip</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
                            "Mention specific tools like TailwindCSS or Next.js to rank higher in recruiter searches."
                        </p>
                    </div>
                </div>

                {/* Center Panel: Chat Interface */}
                <div style={{ flex: 1, borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', background: 'white' }}>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {messages.length === 0 ? (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textAlign: 'center' }}>
                                <div>
                                    <FolderGit2 size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
                                    <p style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Let's build your site!</p>
                                    <p style={{ fontSize: '0.9rem' }}>Tell me your profession and I'll generate the code for your portfolio.</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((m) => (
                                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{
                                        padding: '0.85rem 1rem',
                                        borderRadius: '12px',
                                        background: m.role === 'user' ? '#0f172a' : '#f1f5f9',
                                        color: m.role === 'user' ? 'white' : '#1e293b',
                                        maxWidth: '90%',
                                        fontSize: '0.95rem',
                                        lineHeight: 1.5,
                                    }}>
                                        {m.role === 'assistant' ? (
                                            <span style={{ fontStyle: 'italic', color: '#64748b' }}>Generated portfolio layout. Click 'Deploy to GitHub' when ready.</span>
                                        ) : (
                                            m.parts.map((part, i) => part.type === 'text' ? <span key={i}>{part.text}</span> : null)
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem', padding: '0 4px' }}>
                                        {m.role === 'user' ? 'You' : 'AI'}
                                    </span>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                <Loader2 className="animate-spin" size={16} /> Coding...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                            <textarea
                                value={input}
                                onChange={handleInputChange}
                                placeholder="E.g. 'I am a frontend developer, create a dark theme portfolio with 3 projects...'"
                                disabled={isLoading}
                                style={{
                                    width: '100%', padding: '0.85rem', paddingRight: '50px',
                                    background: 'white', border: '1px solid #cbd5e1', borderRadius: '12px',
                                    minHeight: '80px', resize: 'none', fontSize: '0.95rem',
                                    outline: 'none', fontFamily: 'inherit', color: '#0f172a',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        if (input.trim()) handleSubmit(e as any);
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                style={{
                                    position: 'absolute', right: '0.75rem', bottom: '0.75rem',
                                    background: input.trim() ? '#0f172a' : '#cbd5e1',
                                    color: 'white', border: 'none', width: '36px', height: '36px',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: input.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                                }}
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Panel: Repository Preview */}
                <div style={{ width: '350px', padding: '1.5rem', overflowY: 'auto', background: '#fafafa' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', color: '#64748b' }}>
                        <Info size={14} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Project Preview</span>
                    </div>
                    <div style={{
                        background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px',
                        overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ background: '#f8fafc', padding: '1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Github size={18} color="#475569" />
                            <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>username / my-portfolio</span>
                            <span style={{ marginLeft: 'auto', background: '#e0e7ff', color: '#4f46e5', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Public</span>
                        </div>

                        <div style={{ padding: '0' }}>
                            {simulatedFiles.length === 0 ? (
                                <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
                                    <CloudUpload size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                    <p>Repository is empty.</p>
                                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Use the AI on the left to generate your web portfolio templates.</p>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ padding: '0.75rem 1.5rem', background: '#f1f5f9', fontSize: '0.85rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0' }}>
                                        <span>Latest commit by <strong>cursus-ai</strong></span>
                                        <span>Just now</span>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {simulatedFiles.map((file, i) => (
                                            <li key={i} style={{
                                                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem',
                                                borderBottom: i !== simulatedFiles.length - 1 ? '1px solid #f1f5f9' : 'none',
                                                transition: 'background 0.2s', cursor: 'pointer'
                                            }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                                <FileCode2 size={18} color={file.type === 'code' ? '#3b82f6' : '#8b5cf6'} />
                                                <span style={{ color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>{file.name}</span>
                                                <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '0.85rem' }}>Generated layout structured data</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CareerLinkAgent() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
            <PortfolioContent />
        </Suspense>
    );
}
