// API key for OpenWeatherMap - keep this secure in production
export const apiKey = '4086e54501444f95991002262a78bc2c'; // Add export

const getWeather = async (city) => {
    // Make API request for current weather data
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    // Handle failed requests
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
    }

    return await response.json();
}

export default getWeather;