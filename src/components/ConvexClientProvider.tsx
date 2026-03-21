"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";
import { useAuth } from "@clerk/nextjs";

let convexClient: ConvexReactClient | null = null;

function getConvexClient() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";
  if (!convexClient) {
    convexClient = new ConvexReactClient(convexUrl);
  }
  return convexClient;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = getConvexClient();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
