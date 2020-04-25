import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

function GoogleMap(props) {
  const containerStyle = {
    width: "100vw",
    position: "relative",
    height: "100vh",
  };

  return props.coords ? (
    <Map
      google={props.google}
      zoom={4}
      containerStyle={containerStyle}
      initialCenter={{ lat: 38.56382, lng: -121.41854 }}
    >
      {props.coords.map((item) => (
        <Marker key={props.coords.lat} position={item} />
      ))}
    </Map>
  ) : (
    <h1>Loading</h1>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBI3kMT-fstU6LZARwYeW6fwB9zdoX7TYs",
})(GoogleMap);
