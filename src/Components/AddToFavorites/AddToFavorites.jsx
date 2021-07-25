import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import { ADD_FAVORITE, GET_FAVORITES } from "../../graphqlRequests";

import "./AddToFavorites.scss";
import AppInput from "../AppInput/AppInput";
import AppButton from "../AppButton/AppButton";
import { v4 as uuidv4 } from "uuid";

function AddToFavorites({ isOpen, onCancel }) {
  const dispatch = useDispatch();
  const [selectedColor, setSeletedColor] = useState("");
  const [colorName, setColorName] = useState("");
  const { value } = useSelector((state) => state.getLatLong);
  const [favoriteData, setFavoriteData] = useState({
    id: "",
    name: "",
    address: "",
    color: "",
    lnglat: null,
  });

  const [addNewFavorite, { data, error }] = useMutation(ADD_FAVORITE, {
    refetchQueries: [{ query: GET_FAVORITES }],
  });

  const colors = [
    { color: "#FFA661", name: "Orange" },
    { color: "#4BB18F", name: "Green" },
    { color: "#3885B1", name: "Blue" },
    { color: "#EFD324", name: "Yellow" },
  ];

  const ColorBox = ({ color, onClick, isSelected, ...otherProps }) => {
    return (
      <>
        <motion.div
          id={color}
          animate={{ scale: isSelected ? 1.2 : 1 }}
          className="hoverable"
          whileHover={{ scale: 1.2 }}
          style={{
            height: 20,
            width: 20,
            backgroundColor: color,
            borderRadius: 50,
          }}
          onClick={onClick}
          {...otherProps}
        ></motion.div>
      </>
    );
  };

  const onSave = () => {
    addNewFavorite({
      variables: {
        id: favoriteData.id,
        name: favoriteData.name,
        address: favoriteData.address,
        color: favoriteData.color,
        lnglat: favoriteData.lnglat,
      },
    });
    dispatch({ type: "onSave" });
    dispatch({ type: "openNotification", msg: "Saved" });
  };

  const onChoosingColor = (color, name) => {
    setFavoriteData({ ...favoriteData, color: color });
    setSeletedColor(color);
    setColorName(name);
  };

  useEffect(() => {
    setFavoriteData({ ...favoriteData, lnglat: Object.values(value) });
  }, [value]);

  if (error) console.log(JSON.stringify(error, null, 2));
  if (data) console.log(data.addNewFavorite);

  return (
    <>
      <div>
        <AppInput
          required
          label="Name"
          placeholder="Enter name"
          onChange={(t) =>
            setFavoriteData({
              ...favoriteData,
              name: t.target.value,
              id: uuidv4(),
            })
          }
        />
        <AppInput
          required
          id="address"
          label="Address"
          placeholder={"Enter address"}
          onChange={(t) =>
            setFavoriteData({ ...favoriteData, address: t.target.value })
          }
        />
        <h4 style={{ color: "grey", marginTop: 20, marginBottom: 30 }}>
          Choose a Color:
          <b style={{ color: selectedColor, marginLeft: 10 }}>{colorName}</b>
        </h4>
        <div
          style={{
            display: "flex",
            width: 300,
            justifyContent: "space-around",
          }}
        >
          {colors.map((res) => (
            <ColorBox
              key={res.color}
              color={res.color}
              isSelected={res.isSelected}
              onClick={() => onChoosingColor(res.color, res.name)}
            />
          ))}
        </div>
        <div className="addToFav_btns">
          <AppButton
            disabled
            label="Save"
            bgColor={["#4BB18F", "#3da985"]}
            padding={"5px 20px"}
            onClick={onSave}
          />
        </div>
      </div>
    </>
  );
}

export default AddToFavorites;
