import React from "react";
import PropTypes from "prop-types";
import getLocationWeather from "../api/getWeather";
import { Typography, CircularProgress } from "@mui/material";
import WeatherDisplay from './weatherDisplay'
import { ErrorOutline } from "@mui/icons-material";


function LoadingIndicator({ isLoading }) {
    return isLoading ? <CircularProgress /> : null;
}

function ErrorMessage({ apiError }) {
    if (!apiError) return null;

    return (
        <>
            <ErrorOutline color="error" />
            <Typography color="error" variant="h6">
                {apiError}
            </Typography>
        </>
    );
}

function LocationWeather({ location }) {

    const [weatherData, setWeatherData] = React.useState({});
    const [apiError, setApiError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const loadingIndicatorTimeout = setTimeout(() => setIsLoading(true), 500);
        const getWeather = async () => {
            const result = await getLocationWeather(location);
            clearTimeout(loadingIndicatorTimeout);
            setIsLoading(false);
            setWeatherData(result.success ? result.data : {});
            setApiError(result.success ? "" : result.error);
        };

        getWeather();
        return () => clearTimeout(loadingIndicatorTimeout);
    }, [location]);

    const { flagIcon, countryCode } = React.useMemo(() => {
        return {
            flagIcon: weatherData.sys ? `https://www.countryflags.io/${weatherData.sys.country}/shiny/32.png` : "",
            countryCode: weatherData.sys ? weatherData.sys.country : "",
        };
    }, [weatherData]);

    return (
        <>
            <div >
                <Typography  variant="h5">
                    {location}
                </Typography>
                {flagIcon && <img alt={countryCode} src={flagIcon} />}
            </div>
            <div >
                <LoadingIndicator isLoading={isLoading} />
                <ErrorMessage apiError={apiError} />
                <WeatherDisplay weatherData={weatherData} />
            </div>
        </>
    );
}

LocationWeather.propTypes = {
    location: PropTypes.string.isRequired,
};

export default LocationWeather;
