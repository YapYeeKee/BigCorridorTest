import React from "react";
const DetailedInfo = ({ data }) => {
  const getHour = time =>
    time ? new Date(time).getHours() : new Date().getHours();
  const getDate = date =>
    date ? new Date(date).getDate() : new Date().getDate();

  const displayMoreInfo = (item, i) => {
    return (
      <div
        key={i}
        style={{ backgroundColor: "rgb(190, 190, 190)", fontWeight: "bold" }}
      >
        <div style={{ paddingLeft: "32px" }}>
          <div>{`Time: ${getHour(item.dt * 1000)}:00`}</div>
          <div
            style={{ color: "blue" }}
          >{` ${item.weather[0].description.toUpperCase()}`}</div>
        </div>
        <br />
      </div>
    );
  };

  return (
    <div>
      {data.map((item, i) =>
        getHour(item.dt * 1000) > getHour() &&
        getDate(item.dt * 1000) === getDate()
          ? displayMoreInfo(item, i)
          : getHour(item.dt * 1000) >= 5 && getHour(item.dt * 1000) <= 23
          ? displayMoreInfo(item, i)
          : null
      )}
    </div>
  );
};

export default DetailedInfo;
