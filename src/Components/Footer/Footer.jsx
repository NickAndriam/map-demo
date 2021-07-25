import React, { useState } from "react";
import "./Footer.scss";
import { AiFillHeart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";
import { ImLocation } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import AddToFavorites from "../AddToFavorites/AddToFavorites";
import AppIcon from "../AppIcon/AppIcon";
import { trimmedResult } from "../../specialFunctions/specialFunctions";

function Footer() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { value, data } = useSelector((state) => state.getLatLong);
  const { openFooter } = useSelector((state) => state.getAddtoFavorites);
  const { isSmall } = useSelector((state) => state.getScreenWidth);

  const footerVariants = {
    initial: {
      //   transform: "translateY(100%)",
      transform: "translate(-50%,100%)",
      width: isSmall ? "95%" : "50%",
      justifyContent: "center",
    },
    animate: {
      transform: "translate(-50%,-5%)",
      height: openFooter ? 375 : 100,
      justifyContent: openFooter ? "flex-start" : "center",
      width: isSmall ? "95%" : "30%",
      transition: { delayChildren: 0.01 },
    },
  };

  const onToggle = () => {
    openFooter
      ? dispatch({ type: "closeAddtoFavorites" })
      : dispatch({ type: "openAddtoFavorites" });
  };

  return (
    <>
      <motion.div
        className="footer_container"
        initial="initial"
        animate="animate"
        variants={footerVariants}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="footer_nameplace">
            {!openFooter && <ImLocation size={35} color="red" />}
            <h5 className="black">
              {data
                ? trimmedResult(data.place_name)
                : openFooter
                ? "Add to favorites"
                : "Find a place! Add to favorites"}
            </h5>
          </div>
          <div className="footer_addFav hoverable">
            <AppIcon
              Icon={openFooter ? BsChevronDown : AiFillHeart}
              iconColor={openFooter ? ["grey", "white"] : ["#FF676C", "white"]}
              bgColor={openFooter ? ["white", "grey"] : ["white", "#FF676C"]}
              boxSize={30}
              padding={10}
              margin={2}
              shadow={0.02}
              borderRadius={50}
              onClick={() => onToggle()}
            />
          </div>
        </div>
        {openFooter && <AddToFavorites />}
      </motion.div>
    </>
  );
}

export default Footer;
