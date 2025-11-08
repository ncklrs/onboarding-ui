import type { Variants, Transition } from 'framer-motion'

export type AnimationType =
  | 'fade'
  | 'slide'
  | 'slideUp'
  | 'slideDown'
  | 'scale'
  | 'rotate'
  | 'blur'
  | 'flip'
  | 'bounce'
  | 'zoom'
  | 'none'

export type AnimationDirection = 'left' | 'right' | 'up' | 'down'

export interface AnimationConfig {
  type: AnimationType
  direction?: AnimationDirection
  duration?: number
  delay?: number
  springPhysics?: boolean
}

// Spring physics configurations
export const springConfigs = {
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
    mass: 0.8,
  },
  smooth: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
  snappy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
    mass: 0.8,
  },
}

// Easing functions
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
  smooth: [0.25, 0.1, 0.25, 1],
}

// Animation variants
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideVariants = (direction: AnimationDirection = 'right'): Variants => {
  const offset = 50
  const directionMap = {
    left: { x: -offset },
    right: { x: offset },
    up: { y: -offset },
    down: { y: offset },
  }

  return {
    initial: {
      ...directionMap[direction],
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: {
      ...directionMap[direction === 'right' ? 'left' : direction === 'left' ? 'right' : direction],
      opacity: 0,
    },
  }
}

export const scaleVariants: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
  },
}

export const blurVariants: Variants = {
  initial: {
    filter: 'blur(10px)',
    opacity: 0,
  },
  animate: {
    filter: 'blur(0px)',
    opacity: 1,
  },
  exit: {
    filter: 'blur(10px)',
    opacity: 0,
  },
}

export const flipVariants: Variants = {
  initial: {
    rotateY: -90,
    opacity: 0,
  },
  animate: {
    rotateY: 0,
    opacity: 1,
  },
  exit: {
    rotateY: 90,
    opacity: 0,
  },
}

export const bounceVariants: Variants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 100,
    opacity: 0,
  },
}

export const zoomVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
}

export const rotateVariants: Variants = {
  initial: {
    rotate: -180,
    scale: 0,
    opacity: 0,
  },
  animate: {
    rotate: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {
    rotate: 180,
    scale: 0,
    opacity: 0,
  },
}

// Get animation variants based on config
export function getAnimationVariants(config: AnimationConfig): Variants {
  switch (config.type) {
    case 'fade':
      return fadeVariants
    case 'slide':
    case 'slideUp':
    case 'slideDown':
      return slideVariants(config.direction || 'right')
    case 'scale':
      return scaleVariants
    case 'blur':
      return blurVariants
    case 'flip':
      return flipVariants
    case 'bounce':
      return bounceVariants
    case 'zoom':
      return zoomVariants
    case 'rotate':
      return rotateVariants
    case 'none':
      return {
        initial: {},
        animate: {},
        exit: {},
      }
    default:
      return fadeVariants
  }
}

// Get transition config
export function getTransition(config: AnimationConfig): Transition {
  if (config.springPhysics) {
    return {
      ...springConfigs.smooth,
      delay: config.delay || 0,
    }
  }

  return {
    duration: config.duration || 0.3,
    ease: easings.easeInOut as any,
    delay: config.delay || 0,
  }
}

// Stagger children animation
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Micro-interaction variants
export const hoverScale = {
  scale: 1.05,
  transition: springConfigs.snappy,
}

export const tapScale = {
  scale: 0.95,
}

export const hoverGlow = {
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  transition: { duration: 0.2 },
}

// Progress animation
export const progressVariants: Variants = {
  initial: { width: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: springConfigs.smooth,
  }),
}

// Confetti particle animation
export function confettiAnimation(delay: number = 0) {
  return {
    initial: {
      y: -100,
      x: Math.random() * 100 - 50,
      rotate: 0,
      opacity: 1,
    },
    animate: {
      y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
      x: Math.random() * 200 - 100,
      rotate: Math.random() * 720 - 360,
      opacity: 0,
      transition: {
        duration: Math.random() * 2 + 2,
        delay,
        ease: 'easeIn',
      },
    },
  }
}

// Shake animation for errors
export const shakeVariants: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
    },
  },
}

// Pulse animation for attention
export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
}

// Legacy exports for compatibility
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const slideInFromRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 }
}

export const slideInFromLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 }
}

// CSS class-based animations
export const animationClasses = {
  fadeIn: 'animate-in fade-in duration-300',
  fadeOut: 'animate-out fade-out duration-200',
  slideInFromRight: 'animate-in slide-in-from-right duration-300',
  slideInFromLeft: 'animate-in slide-in-from-left duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
}
