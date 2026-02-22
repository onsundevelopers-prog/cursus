// src/app/layout.tsx
import type { Metadata } from "next";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

import { ModernHeader } from "@/components/ui/modern-header";

export const metadata: Metadata = {
    title: "Cursus — AI Career Platform",
    description: "The all-in-one AI platform to build resumes, ace interviews, and land your dream job.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
                </head>
                <body style={{ paddingTop: '80px' }}>
                    <ModernHeader />
                    {children}
                </body>
            </html>
        </ClerkProvider >
    );
}
