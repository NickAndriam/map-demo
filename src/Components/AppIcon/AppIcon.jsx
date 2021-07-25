import React, { useState } from "react";
import "./AppIcon.scss";
import { motion, AnimatePresence } from "framer-motion";
import { RiSearchLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

function AppIcon({
  Icon = RiSearchLine,
  ClickedIcon = IoClose,
  boxSize = 60,
  bgColor = ["white", "#4BB18F"],
  iconColor = ["black", "white"],
  padding,
  margin = 5,
  borderRadius,
  onClick,
  withInstruction = false,
  withFlip = false,
  makeActiveOnClick = false,
  instruction = "click",
  shadow = 0.153,
  ...otherProps
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const appIconVariants = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
      backgroundColor: isHovered || isActive ? bgColor[1] : bgColor[0],
      color: isHovered || isActive ? iconColor[1] : iconColor[0],
      padding: `${padding}px`,
      height: `${boxSize}px`,
      width: `${boxSize}px`,
      borderRadius: `${borderRadius}px`,
      margin: `${margin}px`,
      boxShadow: `rgba(0, 0, 0, ${shadow}) 0px 0px 30px`,
    },
  };

  const appIcon_instructionVariants = {
    initial: { opacity: 0, x: 20, top: "50%", y: "-50%" },
    animate: { opacity: 1, x: -20 },
    exit: { opacity: 0, x: 50 },
  };

  const iconOnSwitch = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
    },
    exit: {
      scale: 0,
    },
  };

  const onClickOptions = () => {
    onClick && onClick();
    setIsClicked(!isClicked);
    makeActiveOnClick && setIsActive(!isActive);
  };
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="appIcon_container hover"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={appIconVariants}
          style={{ border: "white solid 2px" }}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClickOptions}
        >
          {isClicked && withFlip ? (
            <motion.span
              variants={iconOnSwitch}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ClickedIcon {...otherProps} className="appIcon_icon" />
            </motion.span>
          ) : (
            <Icon {...otherProps} className="appIcon_icon" />
          )}
          {isHovered && withInstruction && (
            <motion.div
              className="appIcon_instruction"
              variants={appIcon_instructionVariants}
            >
              <p style={{ color: "rgb(100, 100, 100)", fontSize: 12 }}>
                {instruction}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default AppIcon;
