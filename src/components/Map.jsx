import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h2>
        `position: {lat},{lng}`
      </h2>
      <button onClick={() => setSearchParam({ lat: 12, lng: 18 })}>
        change position
      </button>
    </div>
  );
}

export default Map;
