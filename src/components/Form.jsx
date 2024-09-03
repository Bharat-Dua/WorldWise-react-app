// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import ButtonBack from "./ButtonBack";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import useCitiesContext from "../hooks/useCitiesContext";
import Spinner from "./Spinner";
import Message from "./Message";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
function Form() {
  const [notes, setNotes] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const { getFlag } = useCitiesContext();
  const [lat, lng] = useUrlPosition();
  const [geoLocationError, setGeoLocationError] = useState("");
  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoLocationError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log(data);
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city.click somewhere else to try again"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error(error);
        setGeoLocationError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng, getFlag]);
  if (isLoadingGeoCoding) return <Spinner />;
  if (geoLocationError) return <Message message={geoLocationError} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji ? getFlag(emoji) : ""}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
