import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./map.module.css";

const Map = () => {
  const [isClient, setIsClient] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const popups = [
    {
      title: "Titel 1",
      image: "path/to/image1.png",
      description: "Beschreibung 1",
      author: "Autor 1",
    },
    // Weitere Popup-Daten hier
  ];

  useEffect(() => {
    // Durch die Aktualisierung des States in dieser Hook wird die Komponente erneut gerendert
    // und der Code innerhalb des folgenden `isClient`-Blocks nur auf dem Client ausgeführt
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const customIcon = L.icon({
    iconUrl: "path/to/your/icon.png",
    iconSize: [38, 95],
  });

  return (
    <div style={{ height: "100%", width: "100%", zIndex: 1 }}>
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
        }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>
            <div className="MarkerPopUp">
              A pretty CSS3 popup. <br /> Easily customizable.
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <div className="popupSlider">
        <div
          className="popup"
          style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
        >
          {popups.map((popup, index) => (
            <div className="popupItem" key={index}>
              <h2 className="popupTitle">{popup.title}</h2>
              <img src={popup.image} alt="Bild" className="popupImage" />
              <p className="popupDescription">{popup.description}</p>
              <p className="popupAuthor">Author: {popup.author}</p>
              <button className="goToButton">Go To</button>
              <button className="favButton">Fav</button>
            </div>
          ))}
        </div>
        <button
          className="prevButton"
          onClick={() => setSliderIndex((prev) => Math.max(prev - 1, 0))}
        >
          Prev
        </button>
        <button
          className="nextButton"
          onClick={() =>
            setSliderIndex((prev) => Math.min(prev + 1, popups.length - 1))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Map;
