"use client";

import React, { useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";

export function CommentsSection() {
    const id = useId();
    const [reviews, setReviews] = useState([
        { author: "Alex Chen", text: "The AI interview coach is terrifyingly realistic. It picked up on my filler words and actually gave me actionable advice on how to structure my STAR method answers. Unbelievable.", role: "Frontend Engineer" },
        { author: "Sarah Jenkins", text: "Deep Scrape engine matched me with roles I didn't even know existed. I had been searching manually for months, and Cursus found my dream job in exactly 45 seconds.", role: "Product Manager" },
        { author: "Mike Rodriguez", text: "The Resume Builder reformatted my messy CV into a crisp, ATS-friendly document. I'm finally getting callbacks from top tech companies.", role: "Data Scientist" },
    ]);
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            setReviews([{ author: "Guest User", text: comment, role: "Community Member" }, ...reviews]);
            setComment("");
        }
    }

    return (
        <div className="max-w-[1200px] mx-auto py-20 px-8 relative z-10 w-full mt-16 bg-white rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] border border-slate-100">
            {/* Heading section explicitly removed based on user request */}
            <form onSubmit={handleSubmit} className="mb-20 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-200/60 max-w-3xl mx-auto transition-all hover:bg-slate-50 hover:shadow-sm">
                <Label htmlFor={id} className="text-slate-700 font-bold mb-4 block text-lg">Leave a comment</Label>
                <div className="relative">
                    <Textarea
                        id={id}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience building with Cursus..."
                        className="bg-white border-slate-200/80 resize-none pb-14 pt-4 px-5 rounded-xl shadow-sm focus-visible:ring-blue-500/20 focus-visible:border-blue-500 text-lg min-h-[140px]"
                    />
                    <button type="submit" disabled={!comment.trim()} className="absolute bottom-4 right-4 py-2 px-4 bg-[#0f172a] text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-[#0f172a] transition-colors shadow-sm font-semibold flex items-center gap-2">
                        Post Comment <Send size={16} />
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-4">
                {reviews.map((review, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        key={i}
                        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <p className="text-slate-600 mb-10 text-lg leading-relaxed group-hover:text-slate-800 transition-colors">"{review.text}"</p>
                        <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {review.author.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-base">{review.author}</div>
                                <div className="text-blue-600 text-sm font-medium">{review.role}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
