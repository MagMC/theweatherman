export interface WeatherData {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
    forecast: {
        forecastday: {
            date: string;
            date_epoch: number;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                condition: {
                    text: string;
                    icon: string;
                };
            };
        }[];
    };
}