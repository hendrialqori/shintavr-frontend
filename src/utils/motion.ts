import type { Variants } from "framer-motion";

export const modalWrapperVariants: Variants = {
  hidden: {
    opacity: 0,
    top: 20,
    transition: {
      duration: 0.1,
    },
  },
  show: {
    opacity: 1,
    top: 0,
    transition: {
      duration: 0.1,
      type: "tween",
    },
  },
};
