//Make a forecast for the next 7 days

import React from "react";
import  WeatherComponent  from "./WeatherComponent";
import {Grid} from "@mui/material";


export const Frontpage = () => {


  return (
    <Grid >
        <WeatherComponent />
    </Grid>
  );
};