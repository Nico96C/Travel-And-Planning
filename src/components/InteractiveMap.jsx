/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import apiKeys from "../private/apiKeys";

function UpdateMapView({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.setView(coords, 17);
        }
    }, [coords, map]);
    return null;
}

export default function InteractiveMap({item}) {
  const [position, setPosition] = useState([-34.760211, -58.400675]);
  const placeName = `${item.nombreDestino}, Buenos Aires`;
  const ApiKeyCage = apiKeys.openCageApiKey;

  useEffect(() => {
      const fetchCoordinates = async () => {
          try {
              const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${placeName}&key=${ApiKeyCage}&limit=1`);
              const data = await response.json();
              if (data && data.results && data.results.length > 0) {
                  const { lat, lng } = data.results[0].geometry;
                  setPosition([lat, lng]);
              } else {
                  console.error("No se encontraron coordenadas para el lugar especificado.");
              }
          } catch (error) {
              console.error("Error al obtener coordenadas:", error);
          }
      };

      fetchCoordinates();
  }, [placeName, ApiKeyCage]);

  return (
      <MapContainer center={position} zoom={17} style={{ height: "50vh", width: "80%" }}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
              <Popup>
                  {placeName}
              </Popup>
          </Marker>
          <UpdateMapView coords={position} />
      </MapContainer>
  );
}
