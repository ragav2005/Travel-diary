/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Error from "./Error";
import BackButton from "./BackButton";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA

  const { id } = useParams();
  const { currentCity, isCityLoading, cityError, fetchCity } = useCities();

  useEffect(() => {
    fetchCity(id);
  }, [id]);
  if (isCityLoading) return <Spinner />;
  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      {cityError ? (
        <Error />
      ) : (
        <>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{emoji}</span> {cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date || null)}</p>
          </div>

          {notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {cityName} on Wikipedia &rarr;
            </a>
          </div>
          <div>
            <BackButton />
          </div>
        </>
      )}
    </div>
  );
}

export default City;
