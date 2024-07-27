/* eslint-disable react-refresh/only-export-components */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useURLPosition } from "../hooks/useURLPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../Contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, long] = useURLPosition();
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [isGeoCodingLoading, setIsGeoCodingLoading] = useState(false);

  useEffect(
    function () {
      if (!lat && !long) {
        return;
      }
      async function getGeoCoding() {
        try {
          setIsGeoCodingLoading(true);
          setError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`
          );
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          if (!data.countryCode) throw new Error("Click on a valid city..");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          setCityName(data.cityName || data.locality || "");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsGeoCodingLoading(false);
        }
      }
      getGeoCoding();
    },
    [lat, long]
  );
  if (error) return <Message message={error} />;
  if (!lat && !long) return <Message message={"Click on a valid city."} />;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      id: crypto.randomUUID(),
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: lat,
        lng: long,
      },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""} `}
      onSubmit={handleSubmit}
    >
      {isGeoCodingLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>

            <DatePicker
              id="date"
              onChange={(date) => setDate(date)}
              selected={date}
              dateFormat={"dd/MM/yyyy"}
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
            <Button type="primary">Add</Button>
            <BackButton />
          </div>
        </>
      )}
    </form>
  );
}

export default Form;
