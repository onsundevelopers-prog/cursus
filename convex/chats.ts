import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create or update a user
export const storeUser = mutation({
  args: { clerkId: v.string(), name: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (user) {
      return await ctx.db.patch(user._id, { name: args.name, email: args.email });
    }

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      plan: "free",
    });
  },
});

// List all conversations for a user
export const listConversations = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .order("desc")
      .collect();
  },
});

// Create a new conversation
export const createConversation = mutation({
  args: { clerkId: v.string(), title: v.string(), type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("conversations", {
      clerkId: args.clerkId,
      title: args.title,
      type: args.type,
      lastMessage: "",
      updatedAt: Date.now(),
    });
  },
});

// Send/Save a message
export const saveMessage = mutation({
  args: { 
    conversationId: v.id("conversations"), 
    role: v.string(), 
    content: v.string() 
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      role: args.role,
      content: args.content,
    });

    // Update conversation metadata
    await ctx.db.patch(args.conversationId, {
      lastMessage: args.content.slice(0, 100),
      updatedAt: Date.now(),
    });
  },
});

// Get messages for a conversation
export const getMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", args.conversationId))
      .collect();
  },
});
