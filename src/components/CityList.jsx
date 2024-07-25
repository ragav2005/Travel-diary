/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import Error from "./Error";
import { useCities } from "../Contexts/CitiesContext";

function CityList() {
  const { cities, isLoading, error } = useCities();
  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  if (cities.length === 0) {
    return <Message message="Add visited cities using map." />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
