import React from "react";
import Layer from "../Layer/Layer";
import "./FooterInput.scss";
import { motion, AnimatePresence } from "framer-motion";

function FooterInput({ isOpened, title, children }) {
  const footerInputVariants = {
    initial: {
      opacity: 0.8,
      x: "-50%",
      y: "100%",
    },
    animate: {
      opacity: 1,
      x: "-50%",
      y: "-50%",
      transition: {
        type: "spring",
        straggerChildren: 0.02,
        delayChildren: 0.2,
        stiffness: 120,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: "-50%",
      y: "100%",
    },
  };
  return (
    <>
      <Layer isLayerOn={isOpened} opacity={0.8} zIndex={50} />
      <AnimatePresence>
        {isOpened && (
          <motion.div
            className="footerInput_container"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={footerInputVariants}
          >
            <div className="footerInput_title">
              <h3 style={{ color: "white" }}>{title}</h3>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FooterInput;
