import { Variants } from 'framer-motion'

/**
 * Reusable animation variants for consistent motion throughout the app
 */

// Page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Stagger container for lists/grids
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Individual items in staggered lists
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

// Card hover animation
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
  },
}

// Success bounce animation
export const successBounce: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.2, 0.95, 1.05, 1],
    transition: {
      duration: 0.6,
      times: [0, 0.2, 0.4, 0.6, 0.8],
      ease: 'easeInOut',
    },
  },
}

// Error shake animation
export const errorShake: Variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: [-10, 10, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

// Fade in/out
export const fadeInOut: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

// Scale pop animation
export const scalePop: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

// Slide from bottom
export const slideFromBottom: Variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

// Icon pulse animation
export const iconPulse: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Icon hover grow
export const iconHover: Variants = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.15,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
}

// Progress bar fill animation
export const progressFill: Variants = {
  initial: {
    width: '0%',
  },
  animate: (percentage: number) => ({
    width: `${percentage}%`,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
}

// Heart beat animation
export const heartBeat: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1],
    },
  },
}

// Button press animation
export const buttonPress: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
}

// Celebration stars animation
export const celebrationStar: Variants = {
  initial: {
    scale: 0,
    rotate: 0,
    opacity: 0,
  },
  animate: (delay: number) => ({
    scale: [0, 1.2, 1],
    rotate: [0, 180, 360],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    },
  }),
}
