//Make a forecast for the next 7 days

import React from "react";
import  WeatherComponent  from "./WeatherComponent";
import {Grid} from "@mui/material";
import rain from '../static/img/rain.jpg';


export const Frontpage = () => {

    const backgroundStyle = {
        backgroundImage: `url(${rain})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',


        height: '100vh',
        width: '100vw',
    }
  return (
    <Grid style={backgroundStyle}>
        <WeatherComponent />
    </Grid>
  );
};