export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const coordinates = {
  latitude: 38.907192,
  longitude: -77.036873,
};

export const APIkey = "0fffee6f38c3630c383305b0f639ac01";

export const weatherOptions = [
  {
    day: true,
    condition: "Clear",
    url: new URL("../assets/day/wtwrSunny.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "Clear",
    url: new URL("../assets/day/wtwrNight.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "Clouds",
    url: new URL("../assets/day/wtwrCloudyDay.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "Clouds",
    url: new URL("../assets/night/wtwrCloudyNight.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "Rain",
    url: new URL("../assets/day/wtwrRainDay.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "Rain",
    url: new URL("../assets/night/wtwrRainNight.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "Thunderstorm",
    url: new URL("../assets/day/wtwrStormDay.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "Thunderstorm",
    url: new URL("../assets/night/wtwrStormNight.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "Snow",
    url: new URL("../assets/day/wtwrSnowDay.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "Snow",
    url: new URL("../assets/night/wtwrSnowNight.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "Fog",
    url: new URL("../assets/day/wtwrFogDay.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "Fog",
    url: new URL("../assets/night/wtwrFogNight.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/wtwrDefaultDay.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/wtwrDefaultNight.png", import.meta.url).href,
  },
};
