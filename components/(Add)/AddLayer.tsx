import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Importiere das Location Icon
import SendIcon from "@mui/icons-material/Send"; // Importiere das Send Icon
import "./AddLayer.css"; // Importiere das CSS für das Overlay

function CameraOverlay({ takePicture, descriptionMode }) {
  const [location, setLocation] = React.useState(null);
  const [description, setDescription] = useState("");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
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
              <span>
                {location.latitude}, {location.longitude}
              </span>
            </div>
          )}
        </>
      ) : (
        <div>
          {location && (
            <div className="locationContainer">
              <LocationOnIcon />
              <span>
                {location.latitude}, {location.longitude}
              </span>
            </div>
          )}

          <div className="descriptionContainer">
            <span className="AddTitle">Text</span>
            <textarea
              className="descriptionTextarea"
              placeholder="Beschreibung..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button className="captureButton" onClick={handleTakePicture}>
              <SendIcon style={{ fill: "white" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraOverlay;
