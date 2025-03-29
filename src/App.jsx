import './App.css';
import { useState } from 'react';
import getWeather, { apiKey } from './api.js';

// Her I Import all necessary components
import Header from './components/Header/Header';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import SearchBar from './components/Search/SearchBar';
import SearchHistory from './components/Search/SearchHistory';
import CurrentWeather from './components/WeatherDisplay/CurrentWeather';
import Forecast from './components/WeatherDisplay/Forecast';

function App() {
  // Here State management for all application data
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Here Main function to fetch weather data
  const getWeatherbyCity = async () => {
    if (!city.trim()) {
      setErrorMessage("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
    // Fetch current weather data
      const weatherData = await getWeather(city);
      setWeather(weatherData);
      setCity("");
      
      // Update search history
      setSearchHistory(prev => {
        const updated = [city, ...prev.filter(item => item.toLowerCase() !== city.toLowerCase())];
        return updated.slice(0, 5);
      });

      // Fetch forecast
      await fetchForecast(city);
    } catch (error) {

      // Handle errors from API
      setWeather(null);
      setForecast([]);
      setErrorMessage(error.message || "City not found. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch 5-day forecast data
  const fetchForecast = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch forecast data");
      }

      const data = await response.json();

      if (data.list) {
        const dailyForecast = data.list
          .filter((_, index) => index % 8 === 0)
          .slice(0, 5) // Ensure we only get 5 days
          .map(item => ({
            date: new Date(item.dt * 1000).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            }),
            temp: Math.round(item.main.temp),
            icon: item.weather[0].icon
          }));

        setForecast(dailyForecast);
      }
    } catch (error) {
      console.error("Forecast error:", error);
      setErrorMessage(error.message || "Could not load forecast data");
    }
  };


  // Toggle between dark/light theme
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const refreshWeather = () => weather?.name && getWeatherbyCity();

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header />
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <SearchBar 
        city={city} 
        setCity={setCity} 
        getWeatherbyCity={getWeatherbyCity} 
        isLoading={isLoading}
      />
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      {/* Display search history */}
      <SearchHistory 
        searchHistory={searchHistory} 
        setCity={setCity} 
      />

      {/* Display weather data or placeholder */}
      {weather ? (
        <>
          <CurrentWeather 
            weather={weather} 
            refreshWeather={refreshWeather} 
          />
          {forecast.length > 0 && <Forecast forecast={forecast} />}
        </>
      ) : (
        !errorMessage && <div className="content">Search for a city to see weather</div>
      )}
    </div>
  );
}

export default App;