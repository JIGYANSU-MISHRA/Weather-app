// components/WeatherDisplay/Forecast.jsx
import './WeatherDisplay.css';

// This component displays a 5-day weather forecast
const Forecast = ({ forecast }) => {
  return (

    <div className="forecast">
      <h4>5-Day Forecast:</h4>

    {/* Container for all forecast cards */}
      <div className="forecast-cards">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <p>{day.date}</p>

            {/* Weather condition icon */}
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
              alt="Forecast Icon" 
            />

            {/* Predicted temperature */}
            <p>{day.temp}&deg;C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;