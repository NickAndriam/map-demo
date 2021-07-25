import React, { useState } from "react";
import "./Layer.scss";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

function Layer({ isLayerOn, opacity = "0.228", zIndex = 20 }) {
  const dispatch = useDispatch();
  const layerVariants = {
    animate: {
      display: isLayerOn ? "block" : "none",
      transition: { type: "spring", stiffness: 100 },
    },
  };
  return (
    <>
      <motion.div
        className="layer"
        animate="animate"
        style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})`, zIndex }}
        variants={layerVariants}
        onClick={() => dispatch({ type: "onBlur" })}
      />
    </>
  );
}

export default Layer;
