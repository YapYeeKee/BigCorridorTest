import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "./actions/weatherStation";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import WeatherForecast from "./components/WeatherForecast";

@connect(store => {
  return {
    forecast: store.weatherStation.data
  };
})
export default class App extends Component {
  componentDidMount() {
    const detectLocation = new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve(position.coords);
          },
          error => {
            if (error.code === error.PERMISSION_DENIED) {
              console.error("Error detecting location.");
            }
          }
        );
      }
    });

    detectLocation
      .then(location => {
        this.props.dispatch(fetchData(location));
      })
      .catch(() => {
        this.props.dispatch(fetchData("kuala lumpur"));
      });
  }

  render() {
    const { forecast } = this.props;

    return forecast === null ? (
      <Button variant="primary" disabled className="App">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Locating your geographic area. Please wait....
      </Button>
    ) : (
      <div>
        <WeatherForecast data={forecast} />
      </div>
    );
  }
}
