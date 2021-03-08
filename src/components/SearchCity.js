import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/weatherStation";

@connect(store => {
  return {
    status: store.weatherStation.status
  };
})
export default class SearchCity extends Component {
  _updateCity = () => {
    const city = this.__cityInput.value;
    city.length !== 0 ? this.props.dispatch(fetchData(city)) : null;
  };

  _onkeyPress = e => {
    e.key === "Enter" ? this._updateCity() : null;
  };

  render() {
    const { city, status } = this.props;
    return (
      <div>
        <header>
          <h4>Weather Forecast</h4>
        </header>
        <section>
          <div>
            <input
              type="text"
              ref={input => {
                this.__cityInput = input;
                return this.__cityInput;
              }}
              onKeyPress={this._onkeyPress}
              placeholder={!!city ? city : "Search City Here"}
            />
            <input
              type="button"
              value="&gt;"
              className="search"
              onClick={this._updateCity}
            />
          </div>
        </section>
        <span>
          {status === "failed" ? (
            <div style={{ color: "red", fontWeight: "bold" }}>
              Please enter valid city name!
            </div>
          ) : (
            ""
          )}
        </span>
      </div>
    );
  }
}
