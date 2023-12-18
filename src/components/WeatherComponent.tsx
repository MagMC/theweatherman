import React, { useEffect, useState } from "react";
import axios from "axios";
import {WeatherData} from "./IWeatherData";
import './WeatherComponent.css';
import { Grid } from "@mui/material";

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const lat = 56.1518;
    const lon = 10.2064;
    //Key skulle nok ikke være hardcoded IRL
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

                    </Grid>
                    <Grid className="forecast-weather">
                        <h2>7-Day Weather Forecast</h2>
                        {weatherData.forecast.forecastday.map(day => (
                            <div key={day.date}>
                                <h3>{epochToDay(day.date_epoch)}</h3>
                                <p>{day.day.maxtemp_c}°C</p>
                                <p>{day.day.condition.text}</p>
                                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                            </div>
                        ))}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

//epoch to date day conversion - function
function epochToDay(epoch: number) {
    //if epoch is today, return 'Today'
    if (new Date(epoch * 1000).toDateString() === new Date().toDateString()) {
        return "Today";
    }
    //if epoch is tomorrow, return 'Tomorrow'
    else if (
        new Date(epoch * 1000).toDateString() ===
        new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()
    ) {
        return "Tomorrow";
    }
    //else return day of the week
    else {
        return new Date(epoch * 1000).toLocaleDateString("en-US", {
            weekday: "long",
        });
    }
}


export default WeatherComponent;
