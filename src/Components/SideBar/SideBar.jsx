import React, { useState } from "react";
import "./SideBar.scss";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillStarFill } from "react-icons/bs";
import { CgArrowsScrollV, CgDarkMode } from "react-icons/cg";
import AppIcon from "../AppIcon/AppIcon";
import FavoriteBox from "../FavoriteBox/FavoriteBox";
import { useEffect } from "react";

function SideBar() {
  const dispatch = useDispatch();
  const [isFBStateOpen, setFBState] = useState(false);
  const { isDark } = useSelector((state) => state.getTheme);
  const { isMenuOpened } = useSelector((state) => state.getMenu);
  const { isSmall } = useSelector((state) => state.getScreenWidth);

  const switchColorTheme = () => {
    if (isDark) {
      dispatch({ type: "setLight" });
    } else {
      dispatch({ type: "setDark" });
    }
  };

  const animateBottom = {
    height: isMenuOpened ? "50vh" : "100px",
    right: "2%",
  };
  const animateTop = {
    height: isMenuOpened ? "90vh" : "100vh",
    top: 0,
    right: 0,
    opacity: 1,
  };

  const onMenuToggle = () => {
    isMenuOpened
      ? dispatch({ type: "closeMenu" })
      : dispatch({ type: "openMenu" });
  };

  useEffect(() => {
    isFBStateOpen
      ? dispatch({ type: "openFB" })
      : dispatch({ type: "closeFB" });
  }, [isFBStateOpen]);
  return (
    <>
      <FavoriteBox />
      <motion.div
        className="sideBar_container"
        initial={{ bottom: 0 }}
        animate={isSmall ? animateBottom : animateTop}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="menu_container" style={{ marginTop: 12 }}>
          <AppIcon
            ClickedIcon={CgArrowsScrollV}
            Icon={isMenuOpened ? CgArrowsScrollV : GiHamburgerMenu}
            size={30}
            iconColor={["black", "white"]}
            boxSize={60}
            withFlip
            withInstruction={isSmall ? false : true}
            instruction="Menu"
            borderRadius={40}
            onClick={() => onMenuToggle()}
          />
        </div>
        <motion.div
          className="sideBar_icon_container"
          animate={{
            opacity: isMenuOpened ? 1 : 0,
            scale: isMenuOpened ? 1 : 0,
          }}
        >
          <AppIcon
            Icon={RiSearchLine}
            bgColor={["#4BB18F", "#3ea080"]}
            size={25}
            iconColor={["white", "white"]}
            boxSize={60}
            withInstruction
            instruction="Search"
            borderRadius={50}
          />
          <AppIcon
            Icon={BsFillStarFill}
            size={25}
            iconColor={["#4BB18F", "white"]}
            boxSize={60}
            withInstruction
            instruction="My favorites"
            borderRadius={50}
            onClick={() => setFBState(!isFBStateOpen)}
          />
          <AppIcon
            Icon={CgDarkMode}
            size={25}
            iconColor={["#4BB18F", "white"]}
            boxSize={60}
            makeActiveOnClick
            withInstruction
            instruction="Color Theme"
            borderRadius={50}
            onClick={switchColorTheme}
          />
        </motion.div>
        <div></div>
      </motion.div>
    </>
  );
}

export default SideBar;
