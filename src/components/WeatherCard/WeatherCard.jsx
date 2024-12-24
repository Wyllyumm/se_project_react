import { useContext } from "react";

import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const tempUnit = weatherData?.temp?.[currentTemperatureUnit] || 999;
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  /* const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionCondition = filteredOptions[0]?.condition; */

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {tempUnit} &deg; {""} {[currentTemperatureUnit]}
      </p>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.condition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
