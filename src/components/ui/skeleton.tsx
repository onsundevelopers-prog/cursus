import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={cn("rounded-md bg-muted/50", className)}
      initial={{ opacity: 0.5, backgroundColor: "hsl(var(--muted))" }}
      animate={{ 
        opacity: [0.5, 0.8, 0.5],
        backgroundColor: ["hsl(var(--muted))", "rgba(15, 23, 42, 0.05)", "hsl(var(--muted))"]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      {...props}
    />
  )
}

export { Skeleton }
