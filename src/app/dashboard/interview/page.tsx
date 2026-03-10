"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Loader2, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import React, { useRef, useEffect, useState, Suspense, useCallback } from "react";
import GuestBanner from "../../components/GuestBanner";

// Speech Recognition Type Definition
declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

function InterviewContent() {
    const [input, setInput] = useState("");
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat/interview" }),
    });

    const [isInsecure, setIsInsecure] = useState(false);
    const [micError, setMicError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.isSecureContext) {
            setIsInsecure(true);
        }
    }, []);

    const recognitionRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && !window.isSecureContext) {
            console.warn("Microphone access is only available in secure contexts (HTTPS or localhost).");
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                // Auto-submit if voice is enabled
                if (transcript.trim()) {
                    sendMessage({ text: transcript });
                    setInput("");
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                if (event.error === 'not-allowed') {
                    setMicError("Microphone access denied. Please ensure you have granted microphone permissions.");
                } else if (event.error === 'no-speech') {
                    // Ignore no-speech errors quietly
                } else {
                    setMicError(`Microphone error: ${event.error}`);
                }
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // Function to handle TTS
    const speakText = async (text: string) => {
        if (!isVoiceEnabled || !text) return;

        try {
            setIsSpeaking(true);
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) throw new Error('TTS failed');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
                audioRef.current.onended = () => setIsSpeaking(false);
            } else {
                const audio = new Audio(url);
                audioRef.current = audio;
                audio.play();
                audio.onended = () => setIsSpeaking(false);
            }
        } catch (error) {
            console.error('TTS error:', error);
            setIsSpeaking(false);
            // Fallback to browser synthesis if API fails
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    // Speak AI messages as they arrive
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant' && status === 'ready') {
            const text = lastMessage.parts
                .filter(p => p.type === 'text')
                .map(p => (p as any).text)
                .join(' ');
            speakText(text);
        }
    }, [messages, status, isVoiceEnabled]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const isLoading = status === "streaming" || status === "submitted";

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <GuestBanner />
            {isInsecure && (
                <div style={{
                    background: '#fff3e0',
                    color: '#e65100',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontSize: '0.85rem',
                    border: '1px solid #ffb74d',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <strong>⚠️ Microphone Unavailable:</strong> Browsers require a secure connection (localhost or HTTPS) to use the microphone. Please use <code>localhost:4380</code> instead of an IP address.
                </div>
            )}

            {micError && (
                <div style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontSize: '0.85rem',
                    border: '1px solid #fca5a5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span><strong>⚠️ Permission Error:</strong> {micError}</span>
                    <button onClick={() => setMicError(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontWeight: 'bold' }}>✕</button>
                </div>
            )}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>Interview Prep AI</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Sharpen your skills with a realistic AI interview coach.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            background: isVoiceEnabled ? 'var(--primary)' : 'var(--surface)',
                            color: isVoiceEnabled ? 'white' : 'var(--text-muted)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            transition: 'var(--transition)'
                        }}
                    >
                        {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        {isVoiceEnabled ? 'Voice On' : 'Voice Off'}
                    </button>
                    {isVoiceEnabled && (
                        <button
                            onClick={toggleListening}
                            style={{
                                padding: '0.5rem',
                                borderRadius: '8px',
                                background: isListening ? '#ff4d4d' : 'var(--surface)',
                                color: isListening ? 'white' : 'var(--text-muted)',
                                border: '1px solid var(--border)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                transition: 'var(--transition)'
                            }}
                        >
                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                            {isListening ? 'Stop' : 'Speak'}
                        </button>
                    )}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '2rem', padding: '1rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                {messages.length === 0 ? (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center' }}>
                        <div>
                            <p style={{ marginBottom: '0.5rem' }}>Ready for a mock interview.</p>
                            <p style={{ fontSize: '0.9rem' }}>Type 'Start Interview' or tell me what role you're interviewing for.</p>
                        </div>
                    </div>
                ) : (
                    messages.map((m) => (
                        <div key={m.id} style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', padding: '0 0.5rem' }}>
                                {m.role === 'user' ? 'You' : 'AI Agent'}
                            </div>
                            <div style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                background: m.role === 'user' ? 'var(--primary)' : 'white',
                                color: m.role === 'user' ? 'var(--primary-foreground)' : 'var(--text-main)',
                                border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                                maxWidth: '85%',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {m.parts.map((part, i) => (
                                    part.type === 'text' ? <span key={i}>{part.text}</span> : null
                                ))}
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', padding: '0.5rem' }}>
                        <Loader2 className="animate-spin" size={16} /> Thinking...
                    </div>
                )}
                {isSpeaking && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', padding: '0.5rem', fontSize: '0.9rem' }}>
                        <Volume2 className="animate-pulse" size={16} /> AI Coach is speaking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message (e.g. 'Help me prepare for a Google Frontend interview...')"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        paddingRight: '60px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        minHeight: '100px',
                        resize: 'none',
                        fontSize: '1rem',
                        outline: 'none',
                        fontFamily: 'inherit'
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
                        position: 'absolute',
                        right: '1rem',
                        bottom: '1rem',
                        background: input.trim() ? 'var(--primary)' : 'var(--border)',
                        color: 'white',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: input.trim() ? 'pointer' : 'not-allowed',
                        transition: 'var(--transition)',
                    }}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}

export default function InterviewCoachAgent() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading Coach...</div>}>
            <InterviewContent />
        </Suspense>
    );
}
