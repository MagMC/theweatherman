import React, { useEffect, useState } from "react";
import axios from "axios";
import {WeatherData} from "./IWeatherData";
import './WeatherComponent.css';

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
        <Grid className={'weather-container'}>
            <h1>WeatherComponent</h1>
            {weatherData && (
                <div>
                    <h2>Current Weather</h2>
                    <p>Location: {weatherData.location.name}, {weatherData.location.country}</p>
                    <p>Temperature: {weatherData.current.temp_c}°C</p>
                    <p>Condition: {weatherData.current.condition.text}</p>

                    <h2>7-Day Weather Forecast</h2>
                    {weatherData.forecast.forecastday.map(day => (
                        <div key={day.date}>
                            <h3>{day.date}</h3>
                            <p>Max Temp: {day.day.maxtemp_c}°C</p>
                            <p>Min Temp: {day.day.mintemp_c}°C</p>
                            <p>Condition: {day.day.condition.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </Grid>
    );
};

export default WeatherComponent;
