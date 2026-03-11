"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { MessageSquare, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ChatHistory() {
  const { userId, isLoaded } = useAuth();
  
  // Use a fallback empty array if loading or undefined
  const conversations = useQuery(api.chats.listConversations, 
    userId ? { clerkId: userId } : "skip"
  ) || [];

  if (!isLoaded || !userId) return null;

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="font-black text-lg flex items-center gap-2">
          <Clock size={18} className="text-orange-500" /> Recent Activity
        </h3>
        <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-1 rounded-full uppercase tracking-tighter">
          {conversations.length} Sessions
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="py-10 text-center">
            <MessageSquare size={32} className="mx-auto text-slate-200 mb-3" />
            <p className="text-slate-400 text-xs font-medium">No recent chats yet.</p>
          </div>
        ) : (
          conversations.map((chat: any) => (
            <Link 
              key={chat._id} 
              href={`/dashboard/${chat.type}?chatId=${chat._id}`}
              className="block group"
            >
              <motion.div
                whileHover={{ x: 4 }}
                className="p-4 bg-slate-50 hover:bg-orange-50 rounded-2xl border border-transparent hover:border-orange-100 transition-all"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-orange-600 truncate max-w-[150px]">
                    {chat.title}
                  </h4>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">
                    {chat.type}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1 mb-2">
                  {chat.lastMessage || "No messages yet..."}
                </p>
                <div className="flex items-center justify-between">
                   <span className="text-[8px] font-bold text-slate-400">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </span>
                  <ArrowRight size={12} className="text-slate-300 group-hover:text-orange-400 transition-colors" />
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      <button className="w-full mt-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
        View Full History
      </button>
    </div>
  );
}
