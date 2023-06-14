import ReactDOM from "react-dom";
import { memo } from "react";
import { motion } from "framer-motion";
import { modalWrapperVariants } from "@/utils/motion";

type Props = {
  children: React.ReactNode;
};

export const ModalWrapper: React.FC<Props> = memo(({ children }) => {
  return ReactDOM.createPortal(
    <motion.div
      variants={modalWrapperVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="fixed inset-0 flex items-center justify-center bg-black/20"
      role="dialog"
      aria-modal="true"
    >
      {children}
      <div
        aria-label="overlay"
        className="absolute inset-0 bg-black/30 z-[-1]"
      />
    </motion.div>,
    document.body
  );
});
