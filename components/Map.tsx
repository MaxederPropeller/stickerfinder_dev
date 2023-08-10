"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Durch die Aktualisierung des States in dieser Hook wird die Komponente erneut gerendert
    // und der Code innerhalb des folgenden `isClient`-Blocks nur auf dem Client ausgeführt
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // Du kannst hier eine Ladeanzeige oder ähnliches anzeigen
  }

  return (
    <div
      style={{ height: "100%", width: "100%", position: "relative", zIndex: 1 }}
    >
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
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
