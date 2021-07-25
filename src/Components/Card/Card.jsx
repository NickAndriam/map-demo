import React from "react";
import "./Card.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { GrAdd, GrFormView } from "react-icons/gr";
import { BsFillStarFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

const Card = ({ placeName = "Melbourne City", distance = 0, onClick }) => {
  const dispatch = useDispatch();
  const { input } = useSelector((state) => state.getSearch);
  const { isSmall } = useSelector((state) => state.getScreenWidth);
  const cardVariants = {
    initial: {
      opacity: 0,
      width: isSmall && 340,
      x: -10,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -10,
    },
  };
  const onCardClick = () => {
    onClick && onClick();
    dispatch({ type: "onBlur", input });
  };
  return (
    <motion.div
      className="card_container hoverable"
      variants={cardVariants}
      onClick={onCardClick}
      onTap={onCardClick}
      transition={{ duration: 0.3 }}
      whileHover={{ backgroundColor: "#F4F7F7", scale: 1.01 }}
    >
      <div className="card_texts_container">
        <h4 style={{ width: "100%", lineHeight: 1, pointerEvents: "inherit" }}>
          {placeName}
        </h4>
        <p style={{ lineHeight: 1, fontSize: 14 }}>
          <b style={{ color: "#4BB18F" }}>{distance}km</b> from Melbourne
        </p>
      </div>
      {/* dispatch({type: 'openAddtoFavorites'}) */}
      {/* <div className="card_icons">
        <div className="card_icon_container">
          <BsFillStarFill className="green" size={20} />
          <p style={{ fontSize: 10, lineHeight: 1 }}>Add to favorites</p>
        </div>
      </div> */}
    </motion.div>
  );
};

export default Card;
