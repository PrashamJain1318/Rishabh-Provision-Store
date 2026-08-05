// Design Token: Animations & Transitions

export const animation = {
  transition: {
    fast: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 350ms cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  framerVariants: {
    fadeIn: {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.25 },
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.2 },
    },
    slideInRight: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      transition: { type: "spring", damping: 25, stiffness: 200 },
    },
  },
} as const;
