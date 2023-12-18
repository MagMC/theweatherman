export interface WeatherData {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
    };
    forecast: {
        forecastday: {
            date: string;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                condition: {
                    text: string;
                };
            };
        }[];
    };
}