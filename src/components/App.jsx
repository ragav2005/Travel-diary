import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageNotFound from "../pages/PageNotFound";
import HomePage from "../pages/HomePage";
import Product from "../pages/Product";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login";
import AppLayout from "../pages/AppLayout";
import CityList from "./CityList";
import CountryList from "./CountryList";
import City from "./City";
import Form from "./Form";
import { CitiesContext } from "../Contexts/CitiesContext";

import "../index.css";

function App() {
  return (
    <div>
      <CitiesContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
              <Route path="cities/:id" element={<City />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesContext>
    </div>
  );
}

export default App;
