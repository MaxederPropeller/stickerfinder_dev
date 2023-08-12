"use client";

import React from "react";
import Link from "next/link";
import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./profil.module.css";
import "leaflet/dist/leaflet.css";

import InstagramIcon from "@mui/icons-material/Instagram";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import LanguageIcon from "@mui/icons-material/Language";

export default function Profile({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Beispiel-Werte für das Profil - Du kannst sie durch echte Daten ersetzen
  const profilPic =
    "https://img.freepik.com/freie-ikonen/benutzer_318-159711.jpg";
  const counter1 = 123;
  const counter2 = 1;
  const instagramLink = "https://www.instagram.com/kapkan.ch/";
  const WebLink = "https://www.kapkan.ch/";
  const userName = "John Doe";
  const beschrieb = "Meine Bio steht hier";

  return (
    <div className={styles.profil}>
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          <img src={profilPic} className={styles.profilPic} alt="Profilbild" />
          <div className={styles.verifiedIcon}></div>
        </div>
        <div className={styles.counter}>{counter1}</div>
        <div className={styles.counter}>{counter2}</div>
        <div className={styles.favStar}>
          <StarBorderIcon />
        </div>

        <Link
          href={instagramLink}
          target="_blank"
          rel="noreferrer"
          className={styles.instagramLink}
        >
          <InstagramIcon />
        </Link>
        <Link
          href={WebLink}
          target="_blank"
          rel="noreferrer"
          className={styles.WebLink}
        >
          <LanguageIcon />
        </Link>
        <div className={styles.userName}>{userName}</div>
        <span className={styles.counterSpan}>gefunden</span>
        <span className={styles.counterSpan}>Tropphäen</span>
        <div className={styles.beschrieb}>{beschrieb}</div>
      </div>
      <div className={styles.mapContainer}>
        {/*         <span
          className={styles.mapTitle}
          style={{
            height: "10%",
            width: "100%",
            zIndex: 2,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {userName} Karte
        </span> */}
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          zoomControl={false}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
