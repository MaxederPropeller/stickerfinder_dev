"use client";

import React, { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";
import StarIcon from "@mui/icons-material/Star";
import styles from "./map.module.css";

interface PopupDivMarkerProps {
  marker: {
    position: [number, number];
    title: string;
    image: string;
    description: string;
    author: string;
    icon: string;
    likes: number;
    ort: string;
    land: string;
    stadt: string;
  };
  closeDiv: () => void;
  isOn: boolean;
}

const PopupDivMarker: React.FC<PopupDivMarkerProps> = ({
  marker,
  closeDiv,
  isOn,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      closeDiv();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOn) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOn]);

  return (
    <div ref={ref} className={styles.markerDiv}>
      <div className={styles.Image}>
        <img src={marker.image} alt={marker.title} />
      </div>
      <div className={styles.HeaderDiv}>
        <div className={styles.HeaderInfoBox}>
          <StarBorderIcon />
          <div className={styles.coordinatesBox}>
            <div className={styles.coordinadtesBoxInfo}>
              <p>
                <LocationOnIcon />
                {marker.position[0]}
              </p>
              <p>{marker.position[1]}</p>
            </div>
            <div className={styles.coordinatesBoxAdressBox}>
              <p>{marker.stadt}, </p>
              <p>{marker.land}</p>
            </div>
          </div>
        </div>
        <h2 className={styles.PopupTitel}>{marker.ort}</h2>
      </div>
      <div className={styles.BodyDiv}>
        <p className={styles.DescriptionBox}>{marker.description}</p>
      </div>
      <div className={styles.FooterDiv}>
        <div className={styles.ChipBox}>
          <AccountCircleIcon />
          <p>{marker.author}</p>
        </div>
        <div className={styles.ChipBox}>
          <BlurCircularIcon />
          <p>{marker.icon}</p>
        </div>
        <div className={styles.ChipBox}>
          <StarIcon />
          <p>{marker.likes}</p>
        </div>
      </div>
    </div>
  );
};

export default PopupDivMarker;
