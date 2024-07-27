/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";

const citiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payLoad,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payLoad,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
        currentCity: action.payLoad,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
        currentCity: {},
      };
    default:
      throw new Error("Invalid action type");
  }
};
function CitiesContext({ children }) {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const res = await fetch(
          `https://66a4c8f95dc27a3c1909ce75.mockapi.io/cities/City`
        );
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({
          type: "rejected",
          payLoad: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  async function fetchCity(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(
        `https://66a4c8f95dc27a3c1909ce75.mockapi.io/cities/City/${id}`
      );
      if (!response.ok) throw new Error("Something went wrong...");
      const data = await response.json();

      dispatch({ type: "city/loaded", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There was an error fetching city...",
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(
        `https://66a4c8f95dc27a3c1909ce75.mockapi.io/cities/City`,
        {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Something went wrong in adding city.");
      const data = await response.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There was an error adding city...",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(
        `https://66a4c8f95dc27a3c1909ce75.mockapi.io/cities/City/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok)
        throw new Error("Something went wrong in deleting city.");
      dispatch({ type: "city/deleted", payLoad: id });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There was an error deleting city...",
      });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        fetchCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(citiesContext);
  if (!context) throw new Error("Context outside of scope.");
  return context;
}
export { CitiesContext, useCities };
