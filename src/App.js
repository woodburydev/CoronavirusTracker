import React from "react";
import { CountryPicker, Cards, Chart } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import CoronaImage from "./images/image.png";
class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }
  handleCountryChange = async (country) => {
    const fetchedCountryData = await fetchData(country);
    this.setState({ data: fetchedCountryData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} alt="Covid 19" src={CoronaImage}></img>

        <Cards data={data} />
        <CountryPicker
          data={data}
          handleCountryChange={this.handleCountryChange}
        />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
