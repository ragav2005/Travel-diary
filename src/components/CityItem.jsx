/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../Contexts/CitiesContext";
import Message from "./Message";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity, error } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const handleDelete = (e) => {
    e.preventDefault();
    deleteCity(id);
  };
  if (error) return <Message message={error} />;
  return (
    <div>
      <Link
        to={`${id}?lat=${position.lat}&long=${position.lng}`}
        className={`${styles.cityItem} ${
          id == currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </div>
  );
}

export default CityItem;
