"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroNavbar } from "./hero-navbar";
import DashboardPreview from "./dashboard-preview";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: (direction: number = 1) => ({
    opacity: 0,
    y: direction,
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "tween",
    },
  },
};

export function HeroSectionNew() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden relative">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navbar */}
      <div className="relative z-10">
        <HeroNavbar />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center w-full flex-1 justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          custom={10}
          variants={itemVariants}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground font-body mb-6"
        >
          Now with GPT-5 support ✨
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={16}
          variants={itemVariants}
          className="text-center font-display text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-foreground max-w-2xl"
        >
          Build a career you actually{' '}
          <span className="italic">love</span>.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={16}
          variants={itemVariants}
          className="mt-4 text-center text-base md:text-lg text-muted-foreground max-w-[650px] leading-relaxed font-body"
        >
          No more boring resume builders. Cursus handles the hard stuff — so you can focus on landing that dream role.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={16}
          variants={itemVariants}
          className="mt-5 flex items-center gap-3"
        >
          <Button
            className="rounded-full px-6 py-5 text-sm font-medium font-body bg-primary text-primary-foreground hover:bg-foreground"
          >
            Book a demo
          </Button>
          <button
            className="h-11 w-11 rounded-full border-0 bg-background shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-background/80 flex items-center justify-center transition-colors"
          >
            <Play className="h-4 w-4 fill-foreground text-foreground" />
          </button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          custom={30}
          variants={itemVariants}
          className="mt-8 w-full max-w-5xl px-4"
        >
          <DashboardPreview />
        </motion.div>
      </motion.div>
    </div>
  );
}
