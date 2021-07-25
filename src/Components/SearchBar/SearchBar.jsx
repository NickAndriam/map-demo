import React from "react";
import "./SearchBar.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
import Layer from "../Layer/Layer";

const SearchBar = ({ children }) => {
  const dispatch = useDispatch();
  const { isSmall } = useSelector((state) => state.getScreenWidth);
  const { searchState, input, result } = useSelector(
    (state) => state.getSearch
  );
  const searchBarVariants = {
    initial: {
      height: "2vh",
      opacity: 0.9,
    },
    animate: {
      opacity: 1,
      top: isSmall ? "2%" : "3.6%",
      height: result ? "350px" : isSmall ? "70px" : "75px",
      width: isSmall ? 360 : "490px",
      paddindTop: "10vh",
      backgroundColor: searchState ? "#4bb18f" : "transparent",
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: {
      height: "10vh",
      opacity: 0,
    },
  };
  return (
    <>
      <Layer isLayerOn={searchState} />
      <AnimatePresence>
        {searchState && (
          <motion.div
            className="search_bar_container"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={searchBarVariants}
          >
            <div style={{ paddingTop: 70, opacity: searchState ? 1 : 0 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const SearchBarInput = ({ id }) => {
  const dispatch = useDispatch();
  const { isSmall } = useSelector((state) => state.getScreenWidth);
  const { searchState, input, result } = useSelector(
    (state) => state.getSearch
  );
  const searchBar_input = {
    initial: {
      opacity: 0,
      width: 100,
    },
    animate: {
      opacity: 1,
      width: isSmall ? (searchState ? 320 : 250) : 540,
      height: isSmall && 40,
      left: isSmall ? (searchState ? "50%" : "40%") : "50%",
      top: "3%",
      // transition: { delay: 0. },
    },
  };
  return (
    <motion.div
      className="search_bar_input_container"
      initial="initial"
      animate="animate"
      variants={searchBar_input}
    >
      <motion.input
        id={id}
        animate={{ height: isSmall && 40 }}
        autoComplete="off"
        className="search_bar_input"
        placeholder="Looking for a place?"
        style={{ fontSize: isSmall ? 15 : 20 }}
        onChange={(t) =>
          dispatch({ type: "onResult", input: t.target.value.toString() })
        }
        onFocus={() => dispatch({ type: "onFocus", input: input })}
        // onBlur={() =>
        //   dispatch({ type: "onBlur", input: input, result: result })
        // }
      />
      <RiSearchLine
        size={20}
        className="search_icon"
        style={isSmall && { top: "30%", right: "8%" }}
      />
    </motion.div>
  );
};
export default SearchBar;
