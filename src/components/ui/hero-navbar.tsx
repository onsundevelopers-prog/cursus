"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroNavbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 font-body">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
        Cursus
      </Link>

      {/* Nav Links (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Home
        </a>
        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </a>
        <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          About
        </a>
        <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Contact
        </a>
      </div>

      {/* CTA Button */}
      <Button
        className="rounded-full px-5 text-sm font-medium bg-primary text-primary-foreground hover:bg-foreground"
      >
        Get Started
      </Button>
    </nav>
  );
}
