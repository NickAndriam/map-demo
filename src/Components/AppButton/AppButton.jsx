import React, { useState } from "react";
import "./AppButton.scss";
import { motion } from "framer-motion";

function AppButton({
  label = "click here",
  borderRadius = "20px",
  padding = "5px 10px",
  fontSize = 12,
  bgColor = ["green", "blue"],
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const appBtnVariants = {
    animate: {
      borderRadius,
      padding,
      backgroundColor: isHovered ? bgColor[1] : bgColor[0],
    },
  };
  return (
    <>
      <motion.div
        className="appButton_container hoverable"
        animate="animate"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        variants={appBtnVariants}
        onClick={onClick}
      >
        <p style={{ color: "white", fontSize }} className="appBtn_label">
          {label}
        </p>
      </motion.div>
    </>
  );
}

export default AppButton;
