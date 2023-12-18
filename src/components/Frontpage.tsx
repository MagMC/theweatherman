//Make a forecast for the next 7 days

import React from "react";
import  WeatherComponent  from "./WeatherComponent";

export const Frontpage = () => {
  return (
    <div>
      <h1>The Weatherman</h1>
        <WeatherComponent />
    </div>
  );
};