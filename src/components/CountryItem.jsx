import useCitiesContext from "../hooks/useCitiesContext";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { getFlag } = useCitiesContext();

  return (
    <li className={styles.countryItem}>
      <span>{getFlag(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
