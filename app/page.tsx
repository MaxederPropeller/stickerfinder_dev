"use client";
import React, { useState, useRef, useContext } from "react";
import { NavbarContext } from "./context/NavbarContext"; // Pfad anpassen
import "./page.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DynamicMap from "../components/(Map)/Map";
import PopupDivMarker from "../components/(Map)/popUp";
import CameraOverlay from "@/components/(Add)/AddLayer";

export default function Home() {
  const [isOn, setIsOn] = useState(false);
  const [descriptionMode, setDescriptionMode] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setNavbarVisible } = useContext(NavbarContext);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const closeDiv = () => {
    setSelectedMarker(null);
  };

  const handleFabClick = async () => {
    setNavbarVisible(false);
    setIsOn(true);
    setDescriptionMode(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        console.error("Video ref is null");
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const takePicture = (description) => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Erstellen Sie einen Blob anstelle einer Data-URL
    canvas.toBlob((blob) => {
      const image = URL.createObjectURL(blob); // Erzeugt eine URL für den Blob
      setCapturedImage(image);

      if (descriptionMode) {
        console.log("use client", { image, description });
        setIsOn(false);
        setNavbarVisible(true); // Navbar wieder anzeigen
      } else {
        setDescriptionMode(true); // Wechsel zum Beschreibungseingabemodus
      }
    }, "image/jpeg"); // Hier können Sie das gewünschte Format angeben
  };

  return (
    <div className="DynamicMap">
      <div className="BottomControll">
        <Fab className="AddButton" onClick={handleFabClick}>
          <AddIcon style={{ fill: "black" }} />
        </Fab>
      </div>
      <DynamicMap onMarkerClick={handleMarkerClick} />
      {selectedMarker && (
        <PopupDivMarker
          marker={selectedMarker}
          closeDiv={closeDiv}
          isOn={isOn}
        />
      )}
      {isOn && (
        <div
          className="FullScreen"
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            zIndex: 110,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <CameraOverlay
            takePicture={takePicture}
            descriptionMode={descriptionMode}
            capturedImage={capturedImage}
          />
        </div>
      )}
    </div>
  );
}
