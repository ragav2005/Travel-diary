/* eslint-disable react/prop-types */
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCities } from "../Contexts/CitiesContext";
import { useURLPosition } from "../hooks/useURLPosition";
import styles from "./Map.module.css";
import Button from "./Button";

function Map() {
  const { cities } = useCities();
  const [position, setPosition] = useState([0, 0]);
  const [geoLocation, isLoading, , getPosition] = useGeolocation();
  const [lat, long] = useURLPosition();

  useEffect(
    function () {
      if (lat && long) setPosition([lat, long]);
    },
    [lat, long]
  );

  useEffect(
    function () {
      if (geoLocation.lat != undefined && geoLocation.lng != undefined)
        setPosition([geoLocation.lat, geoLocation.lng]);
    },
    [geoLocation]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoLocation.lat && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "Loading...." : "Use your Location"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={3}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} zoom={6} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form/?lat=${e.latlng.lat}&long=${e.latlng.lng}`),
  });
}
function ChangeCenter({ position, zoom }) {
  const [lat, lng] = position;
  const map = useMap();
  map.setView(position);
  if (lat != 0 && lng != 0) map.setZoom(zoom);
  return null;
}
export default Map;
