import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Importiere das Location Icon
import SendIcon from "@mui/icons-material/Send"; // Importiere das Send Icon
import "./AddLayer.css"; // Importiere das CSS für das Overlay

function CameraOverlay({ takePicture, descriptionMode }) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState({
    tourism: "",
    city: "",
    country: "",
  });
  const [description, setDescription] = useState("");
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    setIsReadyToSubmit(description.length > 0);
  }, [description]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ latitude, longitude });

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data.address) {
            setAddress({
              tourism: response.data.display_name.split(",")[0],
              city: response.data.display_name.split(",")[1],
              country: response.data.address.country,
            });
          }
        })
        .catch((error) => console.error(error));
    });
  }, []);

  const handleTakePicture = () => {
    takePicture(description);
  };

  return (
    <div className="Overlay">
      <button
        className="closeButton"
        onClick={descriptionMode ? handleTakePicture : null}
      >
        X
      </button>
      {!descriptionMode ? (
        <>
          <button
            className="captureButton"
            onClick={handleTakePicture}
          ></button>
          {location && (
            <div className="locationContainer">
              <LocationOnIcon />
              <div className="locationContainerInner">
                <span>
                  {location.latitude}, {location.longitude}
                </span>
                <div className="addressContainer">
                  <div>
                    <span>{address.city}, </span> {/* Road */}
                    <span>{address.country}</span> {/* City */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          {location && (
            <div className="locationContainer">
              <LocationOnIcon />
              <div className="locationContainerInner">
                <span>
                  {location.latitude}, {location.longitude}
                </span>
                <div className="addressContainer">
                  <div>
                    <span>{address.city}, </span> {/* Road */}
                    <span>{address.country}</span> {/* City */}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="descriptionContainer">
            <span className="AddTitle">{address.tourism}</span>{" "}
            <textarea
              className={`descriptionTextarea ${
                isReadyToSubmit && "readyToSubmit"
              }`}
              placeholder="Beschreibung..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className="captureButton"
              onClick={handleTakePicture}
              disabled={!isReadyToSubmit}
            >
              <SendIcon style={{ fill: "white" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraOverlay;
