import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { getCountries } from "../../api";
import styles from "./CountryPicker.module.css";
export default function CountryPicker({ handleCountryChange }) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    (async () => {
      const countries = await getCountries();
      setCountries(countries);
    })();
  }, [setCountries]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        default=""
        onChange={(e) => {
          handleCountryChange(e.target.value);
        }}
      >
        <option value="">Global</option>
        {countries.map((item, i) => {
          return (
            <option key={i} value={item}>
              {item}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
}
