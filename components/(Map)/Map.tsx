import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = ({ onMarkerClick }) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markers = [
    {
      position: [51.505, -0.09],
      title: "Titel 1",
      image:
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
      description: "Beschreibung 1",
      author: "Autor 1",
      icon: "Icon 1",
      likes: 10,
      ort: "Ort 1",
      land: "Land 1",
      stadt: "Stadt 1",
    },
    {
      position: [51.515, -0.08],
      title: "Titel 2",
      image:
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
      description: "Beschreibung 2",
      author: "Autor 2",
      icon: "Icon 2",
      likes: 20,
      ort: "Ort 2",
      land: "Land 2",
      stadt: "Stadt 2",
    },
    {
      position: [51.525, -0.07],
      title: "Titel 3",
      image:
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
      description: "Beschreibung 3",
      author: "Autor 3",
      icon: "Icon 3",
      likes: 30,
      ort: "Ort 3",
      land: "Land 3",
      stadt: "Stadt 3",
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const customIcon = L.icon({
    iconUrl:
      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
    iconSize: [38, 38],
  });

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    onMarkerClick(marker);
  };

  return (
    <div style={{ height: "100%", width: "100%", zIndex: 1 }}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={markers[0].position}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(marker) }}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
