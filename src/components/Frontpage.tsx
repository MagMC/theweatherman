//Make a forecast for the next 7 days

import React from "react";
import  WeatherComponent  from "./WeatherComponent";
import {Grid} from "@mui/material";


export const Frontpage = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" >
        <h1 style={{ color: 'black' }}>Weather App</h1>
        <WeatherComponent />
    </Grid>
  );
};