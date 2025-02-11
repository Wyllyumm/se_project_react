import { useContext } from "react";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { clothingItems } from "../../utils/constants";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  const tempUnit = weatherData?.temp?.[currentTemperatureUnit] || 999;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {tempUnit}&deg;{""} {[currentTemperatureUnit]} / You may want
          to wear
        </p>
        <ul className="cards__list">
          {
            /* defaultClothes */
            clothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                );
              })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
