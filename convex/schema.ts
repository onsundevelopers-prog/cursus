import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    plan: v.string(), // "free", "pro"
    customDomain: v.optional(v.string()),
    githubConnected: v.optional(v.boolean()),
    githubRepo: v.optional(v.string()),
  }).index("by_clerkId", ["clerkId"]),

  conversations: defineTable({
    clerkId: v.string(),
    title: v.string(),
    type: v.string(), // "interview", "resume", "letter", "general"
    lastMessage: v.string(),
    updatedAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.string(), // "user", "assistant"
    content: v.string(),
    metadata: v.optional(v.any()),
  }).index("by_conversationId", ["conversationId"]),
});
