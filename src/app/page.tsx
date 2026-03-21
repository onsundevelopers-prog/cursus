"use client";

import { HeroSectionNew } from "@/components/ui/hero-section-new";

export default function Home() {
  return (
    <div className="bg-background">
      <main>
        {/* Hero Section */}
        <section>
          <HeroSectionNew />
        </section>
      </main>

      <footer className="bg-background border-t border-border py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex justify-between items-start">
          <div>
            <a 
              href="/" 
              className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 bg-foreground rounded text-background flex items-center justify-center font-bold text-lg">
                C
              </div>
              Cursus
            </a>
            <p className="mt-6 text-muted-foreground font-body max-w-xs">
              The AI Career Co-pilot for high-performance teams.
            </p>
            <p className="mt-8 text-xs text-muted-foreground">
              © 2026 Cursus AI Technologies.
            </p>
          </div>
          <div className="flex gap-24">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Legal</span>
              <a href="#" className="text-sm text-foreground font-medium hover:text-muted-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-foreground font-medium hover:text-muted-foreground">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
