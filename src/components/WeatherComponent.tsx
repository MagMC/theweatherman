import React, { useEffect, useState } from "react";
import axios from "axios";
import {WeatherData} from "./IWeatherData";
import './WeatherComponent.css';
import { Grid } from "@mui/material";

const WeatherComponent = () => {
    //OBS: Ville gerne have gjort dette, dog var der ikke tid nok
    //useState to set background image based on if weather condition includes 'rain', 'cloud', 'sunny' or 'clear'
    const [backgroundImage, setBackgroundImage] = useState<string>('');

    //OBS! Could use some refactoring
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const lat = 56.1518;
    const lon = 10.2064;
    //Key should not have been hardcoded IRL
    const key = 'ea801724f03c4bc6aea144730231812';
    const days = 7;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`;
                const response = await axios.get<WeatherData>(weatherApi);
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data: ", error);
            }
        };

        fetchData();
    }, [lat, lon, key, days]);

    return (
        <Grid >
            {weatherData && (
                <Grid className="weather-container">
                    <Grid className="current-weather">
                        <h2>Current Weather</h2>
                        <p> {weatherData.location.name}, {weatherData.location.country}</p>
                        <p> {weatherData.current.temp_c}°C</p>
                        <p> {weatherData.current.condition.text}</p>
                        <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                        <h3>Wind</h3>
                        <p> {weatherData.current.wind_kph} KPH</p>
                        <p> {weatherData.current.wind_dir}</p>
                    </Grid>
                    <Grid className="forecast-weather">
                        <Grid item >
                            <h2>7-Day Weather Forecast</h2>
                        </Grid>
                        <Grid item className="forecast-items">
                            {weatherData.forecast.forecastday.map(day => (
                                <Grid key={day.date}>
                                    <h3>{epochToDay(day.date_epoch)}</h3>
                                    <p>{day.day.maxtemp_c}°C</p>
                                    <p>{day.day.condition.text}</p>
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};


//OBS! Again refactoring could be done here
//epoch to date day conversion but only the 3 first letters - function
function epochToDay(epoch: number) {
    //if epoch is today, return 'Today'
    if (new Date(epoch * 1000).toDateString() === new Date().toDateString()) {
        return "Today";
    }
    //else return day of the week but only the 3 first letters
    return new Date(epoch * 1000).toDateString().slice(0, 3);
}


export default WeatherComponent;
