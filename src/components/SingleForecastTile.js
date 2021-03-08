import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import SearchCity from "../components/SearchCity";

@connect(store => {
  return {
    forecast: store.weatherStation.data
  };
})
export default class SingleForecastTile extends Component {
  convertToDayWords = item => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return daysOfWeek[new Date(item[0].dt * 1000).getDay()] + "\t";
  };

  convertToDate = str => {
    var date = new Date(str),
      day = ("0" + date.getDate()).slice(-2),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  };

  _groupByDays = data => {
    return data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0, 10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {});
  };
  _getDayInfo = data => {
    return new Date(data[0].dt * 1000).toString();
  };

  _getIcon = data =>
    `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

  _getInfo = (data, min = [], max = [], humidity = []) => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });
    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max))
    };
    const avgHumdity = Math.round(
      humidity.reduce((curr, next) => curr + next) / humidity.length
    );

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>
            {`${minMax.min}°C`} / {`${minMax.max}°C`}
          </strong>
        </div>
        <div>{`Avg. Humidity: ${avgHumdity}%`}</div>
        <div style={{ color: "blue" }}>{data[0].weather[0].main}</div>
      </div>
    );
  };

  render() {
    const { forecasts } = this.props;
    const tiles = Object.values(this._groupByDays(forecasts));
    const forecastTiles = tiles.length > 1 ? tiles.slice(0, 1) : tiles;

    return (
      <div style={{ paddingTop: "30px" }}>
        <Card style={{ width: "17rem", backgroundColor: "rgb(190, 190, 190)" }}>
          <Card.Body>
            <SearchCity />
            <Card.Text style={{ fontWeight: "bold", paddingTop: "10px" }}>
              {this.props.forecast.city.name}
            </Card.Text>
            <Card.Img
              style={{ height: "200px", width: "13rem" }}
              variant="top"
              src={this._getIcon(forecastTiles[0])}
              style={{ backgroundColor: "black" }}
            />
            <Card.Title> {this._getInfo(forecastTiles[0])}</Card.Title>
            <Card.Text style={{ fontWeight: "bold" }}>
              {this.convertToDayWords(forecastTiles[0]) +
                this.convertToDate(
                  this._getDayInfo(forecastTiles[0]),
                  forecastTiles[0]
                ) +
                "\t(Today)"}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
