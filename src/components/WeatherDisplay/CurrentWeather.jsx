// components/WeatherDisplay/CurrentWeather.jsx
import { MapPin, Wind, RefreshCcw } from "react-feather";
import dateFormat from "dateformat";
import "./WeatherDisplay.css";

// This component shows the current weather details
const CurrentWeather = ({ weather, refreshWeather }) => {
  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <div className="content">
      <div className="location d-flex">
        <MapPin />
        <h2>
          {weather.name} <span>({weather.sys?.country})</span>
        </h2>
      </div>
      {/* Formatted current date and time */}
      <p className="datetext">{renderDate()}</p>

      <div className="weatherdesc d-flex flex-c">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
        <h3>{weather.weather[0].description}</h3>
      </div>

      {/* Temperature readings - current and "feels like" */}
      <div className="tempstats d-flex flex-c">
        <h1>
          {weather.main?.temp} <span>&deg;C</span>
        </h1>
        <h3>
          Feels Like {weather.main?.feels_like} <span>&deg;C</span>
        </h3>
      </div>

      {/* Wind speed and direction */}
      <div className="windstats d-flex">
        <Wind />
        <h3>
          Wind is {weather.wind?.speed} Knots in {weather.wind?.deg}&deg;
        </h3>
      </div>

      {/* Button to refresh weather data */}
      <button className="refresh-button" onClick={refreshWeather}>
        <RefreshCcw /> Refresh
      </button>
    </div>
  );
};

export default CurrentWeather;
