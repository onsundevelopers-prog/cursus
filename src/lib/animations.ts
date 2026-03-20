import type { Variants, Transition } from "framer-motion";

/**
 * Duolingo-style spring configuration
 * Snappy, bouncy, and premium.
 */
export const duolingoSpring: Transition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 1,
};

/**
 * Smooth Back-Out easing for non-spring animations
 */
export const duolingoEase = [0.34, 1.56, 0.64, 1] as const;

/**
 * Smooth ease out for page transitions
 */
export const smoothEaseOut = [0.16, 1, 0.3, 1] as const;

// Keep the old one for backward compat if needed, but we'll phase it out
export function bounceEase(x: number) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE TRANSITIONS
// ══════════════════════════════════════════════════════════════════════════════

export const pageTransition: Variants = {
    initial: { 
        opacity: 0, 
        y: 20,
    },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: smoothEaseOut,
        }
    },
    exit: { 
        opacity: 0, 
        y: -10,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// HOVER EFFECTS
// ══════════════════════════════════════════════════════════════════════════════

export const cardHover = {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: smoothEaseOut }
};

export const cardTap = {
    scale: 0.98,
    transition: { duration: 0.15 }
};

export const buttonHover = {
    scale: 1.02,
    filter: "brightness(1.1)",
    transition: { duration: 0.2 }
};

export const buttonTap = {
    scale: 0.98,
    transition: { duration: 0.1 }
};

export const badgeHover = {
    y: -2,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: { duration: 0.2 }
};

// ══════════════════════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (whileInView)
// ══════════════════════════════════════════════════════════════════════════════

export const fadeInUp: Variants = {
    hidden: { 
        opacity: 0, 
        y: 40,
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: smoothEaseOut,
        }
    }
};

export const fadeInScale: Variants = {
    hidden: { 
        opacity: 0, 
        scale: 0.95,
    },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            duration: 0.5,
            ease: smoothEaseOut,
        }
    }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

export const staggerItem: Variants = {
    hidden: { 
        opacity: 0, 
        y: 20,
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: smoothEaseOut,
        }
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// PROGRESS BAR ANIMATIONS
// ══════════════════════════════════════════════════════════════════════════════

export const progressBarAnimation = (targetWidth: number): Variants => ({
    initial: { width: 0 },
    animate: { 
        width: `${targetWidth}%`,
        transition: {
            duration: 1,
            ease: smoothEaseOut,
            delay: 0.3,
        }
    }
});

// ══════════════════════════════════════════════════════════════════════════════
// ORBITAL NODE MAP ANIMATIONS
// ══════════════════════════════════════════════════════════════════════════════

export const nodeFloat: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-3, 3, -3],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const nodePulse: Variants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const lineDrawIn: Variants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { duration: 1.5, ease: "easeOut" },
            opacity: { duration: 0.3 }
        }
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// LOADING ANIMATIONS
// ══════════════════════════════════════════════════════════════════════════════

export const shimmerAnimation = {
    initial: { x: "-100%" },
    animate: { 
        x: "100%",
        transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
        }
    }
};

export const pulseAnimation: Variants = {
    initial: { opacity: 0.6 },
    animate: {
        opacity: [0.6, 1, 0.6],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const spinAnimation = {
    animate: {
        rotate: 360,
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
        }
    }
};
