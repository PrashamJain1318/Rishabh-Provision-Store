import React from "react";
import { motion } from "framer-motion";
import { animation } from "../theme/animation";

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={animation.framerVariants.fadeIn.initial}
      animate={animation.framerVariants.fadeIn.animate}
      exit={animation.framerVariants.fadeIn.exit}
      transition={animation.framerVariants.fadeIn.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
