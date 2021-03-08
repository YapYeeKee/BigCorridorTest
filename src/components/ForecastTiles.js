import React, { Component } from "react";
import DetailedInfo from "./DetailedInfo";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import styles from "./ForecastTiles.css";

export default class ForecastTiles extends Component {
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

  _getForecastHours = () => {
    const forecasthours = "3 Hours Forecast";
    return forecasthours;
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

  convertToDate = str => {
    var date = new Date(str),
      day = ("0" + date.getDate()).slice(-2),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
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
      <div>
        <div>
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
    const forecastTiles = tiles.length > 7 ? tiles.slice(0, 7) : tiles;

    return (
      <div style={{ paddingTop: "30px" }}>
        {forecastTiles.map((item, i) => (
          <div>
            <div className="card">
              <Card style={{ width: "15rem" }} bg={"Dark"}>
                <Card.Img
                  variant="top"
                  src={this._getIcon(item)}
                  style={{ backgroundColor: "black" }}
                />
                <Card.Body style={{ backgroundColor: "rgb(190, 190, 190)" }}>
                  <Card.Text>
                    {this._getInfo(item)}
                    {this.convertToDayWords(item) +
                      this.convertToDate(this._getDayInfo(item), item)}
                  </Card.Text>
                  <div className="hourForecastsNav">
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Card.Header
                          style={{ backgroundColor: "rgb(190, 190, 190)" }}
                        >
                          <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey="1"
                            className="buttonForecastTiles"
                            variant="primary"
                          >
                            {this._getForecastHours()}
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body
                            style={{ backgroundColor: "rgb(190, 190, 190)" }}
                          >
                            {" "}
                            <DetailedInfo data={item} />
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
