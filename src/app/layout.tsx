import type { Metadata } from "next";
import {
    ClerkProvider,
} from "@clerk/nextjs";
import Script from "next/script";
import "./globals.css";

import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { SyncUser } from "@/components/SyncUser";

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
        <html lang="en">
            <head>
                {/* Google tag (gtag.js) */}
                <Script 
                    async 
                    src="https://www.googletagmanager.com/gtag/js?id=G-TCHVB4WJG4" 
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-TCHVB4WJG4');
                    `}
                </Script>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
            </head>
            <body>
                <ConvexClientProvider>
                    <SyncUser />
                    {children}
                </ConvexClientProvider>
            </body>
        </html>
    );
}
