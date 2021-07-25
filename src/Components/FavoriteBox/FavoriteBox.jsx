import React, { useState, useEffect } from "react";
import "./FavoriteBox.scss";
import { motion, AnimatePresence } from "framer-motion";
import { gettingDistance } from "../../specialFunctions/specialFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { IoClose } from "react-icons/io5";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import AppIcon from "../AppIcon/AppIcon";
import { GET_FAVORITES, REMOVE_FAVORITE } from "../../graphqlRequests";

function FavoriteBox() {
  const dispatch = useDispatch();
  const { isFBOpen } = useSelector((state) => state.getFavoriteBox);
  const { value } = useSelector((state) => state.getLatLong);
  const MelbournePoints = [144.9560978250015, -37.820286740392866];
  const [favorites, setFavorites] = useState([]);

  const favoriteBoxVariants = {
    initial: {
      transform: "translateX(-100%)",
      width: "100px",
      height: "80vh",
      borderRadius: "0px 50px 50px 0px",
      opacity: 0.7,
    },
    animate: {
      transform: isFBOpen ? "translateX(0%)" : "translateX(-100%)",
      //   overflowY: "scroll",
      transition: { duration: 0.4, staggerChildren: 0.1, delayChildren: 0.35 },
      opacity: 1,
      width: "340px",
      height: "100vh",
      borderRadius: "0px 50px 50px 0",
    },
    exit: {
      transform: "translateX(-100%)",
      width: "340px",
      height: "90vh",
      borderRadius: "0px 50px 50px 0px",
      opacity: 0.9,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const { data } = useQuery(GET_FAVORITES);
  const [deleteFavorite, { error }] = useMutation(REMOVE_FAVORITE, {
    refetchQueries: [{ query: GET_FAVORITES }],
  });

  const onDeletingCard = (givenId) => {
    const id = givenId;
    const foundObj = favorites.find((res) => res.id === givenId);
    const filteredArray = favorites.filter((res) => res != foundObj);
    setFavorites(filteredArray);
    deleteFavorite({ variables: { id } });
  };

  useEffect(() => {
    if (data) {
      setFavorites(data.myFavorites);
    }
  }, [data]);

  if (error) console.log(JSON.stringify(error, null, 2));
  return (
    <>
      <AnimatePresence>
        {isFBOpen && (
          <motion.div
            className="favoriteBox_container"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={favoriteBoxVariants}
          >
            <h2>My Favorites</h2>
            {favorites !== [] &&
              favorites.map((i) => (
                <FavoriteCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  address={i.address}
                  hoverColor={i.color}
                  distance={value && gettingDistance(MelbournePoints, i.lnglat)}
                  onDelete={() => onDeletingCard(i.id)}
                  onClick={() =>
                    dispatch({
                      type: "onChange",
                      value: i.lnglat,
                      color: i.color,
                    })
                  }
                />
                // <FavoriteCard />
              ))}
            {favorites !== [] && (
              <p style={{ fontSize: 12 }}>
                Add more favorite using the heart button
              </p>
            )}
            <div className="favoriteBox_close">
              <AppIcon
                Icon={IoClose}
                bgColor={["#F7F7F7", "red"]}
                size={15}
                iconColor={["grey", "white"]}
                boxSize={15}
                borderRadius={50}
                onClick={() => dispatch({ type: "closeFB" })}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FavoriteBox;
