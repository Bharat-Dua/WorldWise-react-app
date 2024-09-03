import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import useCitiesContext from "../hooks/useCitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities, getFlag } = useCitiesContext();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
const [mapLat,mapLng]=useUrlPosition();
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "use your location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{getFlag(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
// function DetectClick() {
//   const navigate = useNavigate();

//   useMapEvents({
//     click: (e) => navigate("form"),
//   });
// }
// function DetectClick() {
//   const navigate = useNavigate();
//   useMapEvents({
//     click: (e) =>
//       navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`, {
//         replace: true,
//       }),
//   });
//   return null;
// }
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const formURL = `form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`;
      navigate(formURL, { state: { from: "/app/cities" } });
    },
  });
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position, 6);
  return null;
}
export default Map;
