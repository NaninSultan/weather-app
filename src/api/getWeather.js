async function getLocationWeather (location) {
    try {
        const result = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${location},&APPID=2e37aff5061302de674aa9e2ec721d0a&units=metric`,
        );  

        if (result.status === 200) {
            return { success: true, data: await result.json() };
        }

        return { success: false, error: result.statusText };
    } catch (ex) {
        return { success: false, error: ex.message };
    }
};

export default getLocationWeather;