import React, { useState } from "react";
import "./FavoriteCard.scss";
import { motion } from "framer-motion";
import AppIcon from "../AppIcon/AppIcon";
import { RiEditLine, RiDeleteBin7Fill } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

function FavoriteCard({
  onClick,
  id,
  distance = 0,
  name,
  address,
  onDelete,
  hoverColor = "white",
}) {
  const [expand, setExpand] = useState(false);
  const favoriteCardVariants = {
    initial: {
      opacity: 0,
      x: -20,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -20,
    },
  };
  console.log(expand);
  return (
    <>
      <motion.div
        className="favoriteCard_container hoverable"
        whileHover={{
          scale: 1.02,
          backgroundColor: hoverColor,
          color: "white",
        }}
        animate={{ height: expand ? 120 : 80 }}
        onClick={() => setExpand(!expand)}
        variants={favoriteCardVariants}
      >
        <div style={{ paddingLeft: 10 }}>
          <h4 className="favoriteCard_title">{name}</h4>
          <p
            className="favoriteCard_subtitle"
            style={{ fontSize: 12, lineHeight: 1, width: 120 }}
          >
            <b style={{ color: "green" }}>{distance}Km</b> from Melbourne
          </p>
          {expand && <p style={{ fontSize: 12, marginTop: 20 }}>{address}</p>}
        </div>
        <div className="favoriteCard_icons">
          {/* <AppIcon Icon={RiEditLine} boxSize={25} borderRadius={50} /> */}
          <AppIcon
            id={id}
            Icon={RiDeleteBin7Fill}
            bgColor={["white", "#FF676C"]}
            boxSize={25}
            borderRadius={50}
            onClick={onDelete}
          />
          <AppIcon
            Icon={RiArrowRightSLine}
            boxSize={25}
            borderRadius={50}
            onClick={onClick}
          />
        </div>
      </motion.div>
    </>
  );
}

export default FavoriteCard;
