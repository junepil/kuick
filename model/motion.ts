import { Variants } from "motion/react";

const formVariants: Variants = {
  initial: {
    y: 400,
    opacity: 0,
    scale: 0.6,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
  exit: {
    y: 600,
    opacity: 0,
    scale: 0.6,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const containerVariants: Variants = {
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      ease: "easeOut",
    },
  },
};

export { formVariants, containerVariants };
