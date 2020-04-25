import React, { useState, useEffect } from "react";
import styles from "./Map.module.css";
import GoogleMap from "./GoogleMap";
import { getCountries } from "../../api";
import Geocode from "react-geocode";

export default function Map() {
  Geocode.setApiKey("AIzaSyBI3kMT-fstU6LZARwYeW6fwB9zdoX7TYs");
  const [countries, setCountries] = useState([]);
  const [coords, setCoords] = useState(null);
  const [arrLength, setArrLength] = useState(0);
  let arrayLength = 0;
  let nonFunctionalStack = [];
  let functionalCountries = [];
  useEffect(() => {
    (async () => {
      const countries = await getCountries();
      setCountries(countries);
      let arr = [];
    })();
  }, [setCountries]);

  useEffect(() => {
    function findCountries(countries, index) {
      for (var i = index; i < countries.length; i++) {
        Geocode.fromAddress(countries[i]).then(
          async (res) => {
            const { lat, lng } = res.results[0].geometry.location;
            functionalCountries.push({ lat, lng });
            arrayLength++;
          },
          async (error) => {
            nonFunctionalStack.push([countries[i], i]);
            await findCountries(countries, i + 1);
          }
        );
      }
      console.log(nonFunctionalStack);
      setArrLength(arrayLength);
      return setCoords(functionalCountries);
    }
    findCountries(countries, 0);
  }, [countries]);
  console.log(arrLength);

  return (
    <div className={styles.mapDiv}>
      <h1>
        Live Feed Of <b>Infected</b> Countries
      </h1>
      {arrLength > 100 ? <GoogleMap coords={coords} /> : null}
    </div>
  );
}
