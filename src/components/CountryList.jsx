/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading, error } = useCities();
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country))
      return [...acc, { country: city.country, emoji: city.emoji }];
    else return acc;
  }, []);
  if (isLoading) return <Spinner />;
  if (error)
    return <h1 className={styles.error}>❌Error in fetching the data.</h1>;

  if (cities.length === 0) {
    return <Message message="Add visited cities using map." />;
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((el) => (
        <CountryItem key={el.country} country={el} />
      ))}
    </ul>
  );
}

export default CountryList;
