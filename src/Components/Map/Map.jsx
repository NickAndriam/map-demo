import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import SearchBar, { SearchBarInput } from "../SearchBar/SearchBar";
import {
  gettingDistance,
  trimmedResult,
} from "../../specialFunctions/specialFunctions";
import "./Map.scss";
import Card from "../Card/Card";

const Map = () => {
  const dispatch = useDispatch();
  const { value, latLongStateChange, color } = useSelector(
    (state) => state.getLatLong
  );
  const [undo, setUndo] = useState(false);
  const { isDark } = useSelector((state) => state.getTheme);
  const { input, result } = useSelector((state) => state.getSearch);
  const { openFooter } = useSelector((state) => state.getAddtoFavorites);
  const { isMenuOpened } = useSelector((state) => state.getMenu);
  const { myFavorites } = useSelector((state) => state.getMyFavorites);
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const ref = useRef();
  const lightTheme = "mapbox://styles/mapbox/streets-v11?optimize=true";
  const darkTheme = "mapbox://styles/mapbox/dark-v10?optimize=true";
  let MelbournePoints = [144.9560978250015, -37.820286740392866];

  const mapFlyTo = (latLong) => {
    map &&
      map.flyTo({
        center: latLong,
        zoom: 14,
        essential: true,
      });
    dispatch({ type: "onStop" });
  };

  const changingThemeColor = () => {
    if (map) {
      if (isDark) {
        map.setStyle(darkTheme);
      } else {
        map.setStyle(lightTheme);
      }
    }
  };

  //initializing the map
  const initializeMap = ({ setMap, mapContainer }) => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11?optimize=true",
      center: MelbournePoints,
      zoom: 12,
    });
    map.on("load", () => {
      setMap(map);
      // map.resize();
    });

    map.on("click", (e) => {
      let popup = new mapboxgl.Popup({ offset: 30 }).setText("Add to favorite");
      let marker = new mapboxgl.Marker({ color: "green", scale: 2 })
        .setLngLat(e.lngLat)
        .setPopup(popup)
        .addTo(map);
      dispatch({ type: "onChange", value: e.lngLat, color: "red" });
    });

    // mapping marker's array
    myFavorites &&
      myFavorites.map((fav) => {
        let marker = new mapboxgl.Marker({ color: fav.color })
          .setLngLat(fav.lnglat)
          .addTo(map);
      });
    // let marker = new mapboxgl.Marker({ color: color || "red" })
    //   .setLngLat(value)
    //   .addTo(map);
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (map) {
      const marker = new mapboxgl.Marker({ color: color || "red", scale: 2 })
        .setLngLat(value)
        .addTo(map);
      if (undo) {
        marker.remove();
        setUndo(false);
      }
    }
  }, [value]);
  useEffect(() => {
    map &&
      myFavorites.map((fav) => {
        let marker = new mapboxgl.Marker({ color: fav.color })
          .setLngLat(fav.lnglat)
          .addTo(map);
      });
  }, [myFavorites]);

  useEffect(() => {
    mapFlyTo(value);
  }, [latLongStateChange]);

  useEffect(() => {
    changingThemeColor();
  });

  useEffect(() => {
    if (input !== "" || undefined) {
      try {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${
              input === undefined ? "Melbourne" : input
            }.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`
          )
          .then((data) => {
            const result = data.data.features;
            dispatch({
              type: "onResult",
              input: input,
              result: result.length > 0 && result,
            });
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [input]);

  return (
    <>
      <div
        className="map_container"
        ref={(el) => (mapContainer.current = el)}
      ></div>
      <SearchBar>
        {result &&
          result.map((res) => (
            <Card
              key={res.id}
              placeName={trimmedResult(res.place_name)}
              distance={gettingDistance(MelbournePoints, res.center)}
              onClick={() =>
                dispatch({ type: "onChange", value: res.center, data: res })
              }
            />
          ))}
      </SearchBar>
      {/* <button
        style={{ position: "absolute", top: 1, zIndex: 40 }}
        onClick={() => setUndo(true)}
      >
        Undo
      </button> */}
      <SearchBarInput />
    </>
  );
};

export default Map;
