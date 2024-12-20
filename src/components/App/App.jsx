import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import {
  getItems,
  addClothes,
  deleteClothes,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import { userSignin, userSignUp, getUserInfo } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import * as auth from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  /*const [temp, setTemp] = useState(0); */
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    avatar: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleSignupClick = () => {
    setActiveModal("registerModal");
  };

  const handleDeleteClick = () => {
    deleteClothes(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id != selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (item, formReset) => {
    addClothes(item)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
        formReset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = ({ email, password, name, avatar }, resetUserForm) => {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    auth
      .userSignin({ email, password })

      .then((res) => {
        setToken(res.token);
        setIsLoggedIn(true);
        auth.getUserInfo(res.token).then((res) => {
          setCurrentUser({ email, password, name, avatar });
        });
        closeActiveModal();
        resetUserForm();
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignup = ({ name, avatar, email, password }) => {
    auth.userSignUp({ name, avatar, email, password }).then(() => {
      handleLogin({ email, password });
    });
  };

  const handleUserSignout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser("");
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(currentTemperatureUnit);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const checkToken = getToken();
    if (!checkToken) {
      return;
    }
    auth
      .getUserInfo(checkToken)
      .then(({ username, email }) => {
        setCurrentUser({ username, email });
        setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={{ currentUser }}>
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleSignupClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleUserSignout={handleUserSignout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              handleCloseClick={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
              onClose={closeActiveModal}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              handleCloseClick={closeActiveModal}
              handleDeleteClick={handleDeleteClick}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              /*handleCloseClick={closeActiveModal} */
              onClose={closeActiveModal}
              handleLogin={handleLogin}
            />
          )}
          {activeModal === "registerModal" && (
            <RegisterModal
              isOpen={activeModal === "registerModal"}
              onClose={closeActiveModal}
              handleSignup={handleSignup}
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
