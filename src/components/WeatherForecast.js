import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ForecastTiles from "./ForecastTiles";
import SingleForecastTile from "./SingleForecastTile";
import styles from "./WheatherForecast.css";
const WeatherForecast = ({ data }) => {
  const { list } = data;

  return (
    <div className="wheatherForecast_div">
      <Container>
        <Row>
          <Col xs={{ order: "first" }}>
            <SingleForecastTile forecasts={list} />
          </Col>
          <Col xs={{ order: "last" }}>
            <div>
              <ForecastTiles forecasts={list} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WeatherForecast;
