"use client";

export const dynamic = 'force-dynamic';

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Loader2, FileText, Download } from "lucide-react";
import React, { useRef, useEffect, useState, Suspense } from "react";
import GuestBanner from "../../components/GuestBanner";

function LetterContent() {
    const [input, setInput] = useState("");
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat/letter" }),
    });

    const isLoading = status === "streaming" || status === "submitted";

    // Find the latest AI message to display as the document draft
    const latestAiMessage = [...messages].reverse().find(m => m.role === 'assistant');
    const draftContent = latestAiMessage?.parts.map(p => p.type === 'text' ? p.text : '').join('') || "Your generated cover letter will appear here...\n\nStart by typing a prompt on the left.";

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

    const handleExportWord = async () => {
        if (!latestAiMessage) return;
        try {
            const res = await fetch("/api/export/word", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: draftContent, title: "Cover_Letter" })
            });
            if (!res.ok) throw new Error("Export failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Cover_Letter.docx";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (e) {
            console.error("Failed to export document", e);
            alert("Failed to export Word document. Please try again.");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', background: '#fafafa' }}>
            <GuestBanner />

            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Cover Letter Generator</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Chat with AI to craft the perfect cover letter.</p>
                </div>
                {latestAiMessage && (
                    <button
                        onClick={handleExportWord}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
                            background: '#2b579a', color: 'white', border: 'none', borderRadius: '8px',
                            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s',
                            boxShadow: '0 2px 10px rgba(43, 87, 154, 0.2)'
                        }}
                    >
                        <Download size={16} /> Export to Word
                    </button>
                )}
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Left Panel: Chat Interface */}
                <div style={{ width: '40%', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', background: 'white' }}>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {messages.length === 0 ? (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textAlign: 'center' }}>
                                <div>
                                    <FileText size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
                                    <p style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Ready to write!</p>
                                    <p style={{ fontSize: '0.9rem' }}>Paste your target role or company details here.</p>
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
                                            <span style={{ fontStyle: 'italic', color: '#64748b' }}>Updated document draft.</span>
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
                                <Loader2 className="animate-spin" size={16} /> Drafting...
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
                                placeholder="E.g. 'Write a cover letter for a Principal Designer role at Vercel...'"
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

                {/* Right Panel: Document Preview */}
                <div style={{ width: '60%', padding: '2rem', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        background: 'white',
                        width: '100%',
                        maxWidth: '800px',
                        minHeight: '1130px', /* Approximate A4 length */
                        height: 'max-content',
                        padding: '4rem 5rem',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                        border: '1px solid #e2e8f0',
                        color: '#0f172a',
                        fontFamily: 'serif',
                        marginBottom: '4rem' /* Let the user scroll past the bottom page */
                    }}>
                        {/* Fake document skeleton before generation */}
                        {!latestAiMessage ? (
                            <div style={{ opacity: 0.3, pointerEvents: 'none' }}>
                                <div style={{ height: '24px', width: '30%', background: '#e2e8f0', marginBottom: '8px' }} />
                                <div style={{ height: '16px', width: '40%', background: '#e2e8f0', marginBottom: '40px' }} />
                                <div style={{ height: '16px', width: '100%', background: '#e2e8f0', marginBottom: '8px' }} />
                                <div style={{ height: '16px', width: '90%', background: '#e2e8f0', marginBottom: '8px' }} />
                                <div style={{ height: '16px', width: '95%', background: '#e2e8f0', marginBottom: '24px' }} />
                                <div style={{ textAlign: 'center', marginTop: '4rem', color: '#64748b', fontFamily: 'sans-serif' }}>
                                    {draftContent}
                                </div>
                            </div>
                        ) : (
                            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1.05rem' }}>
                                {draftContent}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CoverLetterAgent() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading Coach...</div>}>
            <LetterContent />
        </Suspense>
    );
}
