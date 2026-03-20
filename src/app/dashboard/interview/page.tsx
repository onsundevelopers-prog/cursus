"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { Send, Loader2, Mic, MicOff, Volume2, VolumeX, History } from "lucide-react";
import React, { useRef, useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GuestBanner from "../../components/GuestBanner";
import { 
    PageTransition, 
    ShimmerSkeleton, 
    AILoadingIndicator 
} from "@/components/ui/animated-components";
import { smoothEaseOut } from "@/lib/animations";

// Speech Recognition Type Definition
declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

function InterviewLoadingSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <div className="space-y-4 mb-6">
                <ShimmerSkeleton width="300px" height="32px" />
                <ShimmerSkeleton width="400px" height="20px" />
            </div>
            <ShimmerSkeleton height="400px" borderRadius="12px" className="mb-4" />
            <ShimmerSkeleton height="100px" borderRadius="12px" />
        </div>
    );
}

function InterviewContent() {
    const searchParams = useSearchParams();
    const chatIdParam = searchParams.get('chatId');
    const isGuest = searchParams.get('guest') === 'true';
    const { userId } = useAuth();
    
    const [input, setInput] = useState("");
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentChatId, setCurrentChatId] = useState<string | null>(chatIdParam);

    const { messages, sendMessage, status, setMessages } = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat/interview" }),
    });

    const createChat = useMutation(api.chats.createConversation);
    const saveMsg = useMutation(api.chats.saveMessage);
    
    // Load existing messages if we have a chatId
    const existingMessages = useQuery(api.chats.getMessages, 
        currentChatId ? { conversationId: currentChatId as any } : "skip"
    );

    useEffect(() => {
        if (existingMessages && messages.length === 0) {
            setMessages(existingMessages.map((m: any) => ({
                id: m._id,
                role: m.role as any,
                parts: [{ type: 'text', text: m.content }]
            })));
        }
    }, [existingMessages]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;
        
        // 1. Send to AI
        sendMessage({ text });

        // 2. Persist if authenticated
        if (userId && !isGuest) {
            let activeId = currentChatId;
            if (!activeId) {
                // Auto-create conversation on first message
                const newId = await createChat({
                    clerkId: userId,
                    title: `Interview: ${text.slice(0, 30)}...`,
                    type: "interview"
                });
                activeId = newId;
                setCurrentChatId(newId);
            }
            
            // Save user message
            await saveMsg({
                conversationId: activeId as any,
                role: "user",
                content: text
            });
        }
    };

    // Save AI response when it finishes
    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.role === 'assistant' && status === 'ready' && userId && !isGuest && currentChatId) {
            const content = lastMsg.parts.map(p => p.type === 'text' ? p.text : '').join('');
            saveMsg({
                conversationId: currentChatId as any,
                role: "assistant",
                content: content
            });
        }
    }, [status, messages, userId, isGuest, currentChatId]);

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
                    handleSendMessage(transcript);
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
        handleSendMessage(input);
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
        <PageTransition>
            <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <GuestBanner />
                <AnimatePresence>
                    {isInsecure && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{
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
                            }}
                        >
                            <strong>Warning:</strong> Browsers require a secure connection (localhost or HTTPS) to use the microphone. Please use <code>localhost:4380</code> instead of an IP address.
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {micError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{
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
                            }}
                        >
                            <span><strong>Permission Error:</strong> {micError}</span>
                            <button onClick={() => setMicError(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontWeight: 'bold' }}>X</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
                >
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>Interview Prep AI</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Sharpen your skills with a realistic AI interview coach.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <motion.button
                            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
                        </motion.button>
                        {isVoiceEnabled && (
                            <motion.button
                                onClick={toggleListening}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
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
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ flex: 1, overflowY: 'auto', marginBottom: '2rem', padding: '1rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}
                >
                    {messages.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center' }}
                        >
                            <div>
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Mic size={48} style={{ margin: '0 auto 1rem', color: '#cbd5e1' }} />
                                </motion.div>
                                <p style={{ marginBottom: '0.5rem' }}>Ready for a mock interview.</p>
                                <p style={{ fontSize: '0.9rem' }}>Type 'Start Interview' or tell me what role you're interviewing for.</p>
                            </div>
                        </motion.div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {messages.map((m, index) => (
                                <motion.div 
                                    key={m.id} 
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}
                                >
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', padding: '0 0.5rem' }}>
                                        {m.role === 'user' ? 'You' : 'AI Agent'}
                                    </div>
                                    <motion.div 
                                        whileHover={{ scale: 1.01 }}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            background: m.role === 'user' ? 'var(--primary)' : 'white',
                                            color: m.role === 'user' ? 'var(--primary-foreground)' : 'var(--text-main)',
                                            border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                                            maxWidth: '85%',
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >
                                        {m.parts.map((part, i) => (
                                            part.type === 'text' ? <span key={i}>{part.text}</span> : null
                                        ))}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ padding: '0.5rem' }}
                        >
                            <AILoadingIndicator text="Thinking..." />
                        </motion.div>
                    )}
                    {isSpeaking && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', padding: '0.5rem', fontSize: '0.9rem' }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Volume2 size={16} />
                            </motion.div>
                            AI Coach is speaking...
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </motion.div>

                <motion.form 
                    onSubmit={handleSubmit} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ position: 'relative' }}
                >
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
                    <motion.button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        whileHover={input.trim() ? { scale: 1.1, filter: "brightness(1.1)" } : {}}
                        whileTap={input.trim() ? { scale: 0.9 } : {}}
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
                    </motion.button>
                </motion.form>
            </div>
        </PageTransition>
    );
}

export default function InterviewCoachAgent() {
    return (
        <Suspense fallback={<InterviewLoadingSkeleton />}>
            <InterviewContent />
        </Suspense>
    );
}
