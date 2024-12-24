import { useEffect, useState, useContext } from "react";
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
import {
  userSignin,
  userSignUp,
  getUserInfo,
  userEdit,
} from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import * as auth from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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

  const handleEditClick = () => {
    setActiveModal("editProfileModal");
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

  const handleCardLike = ({ _id, isLiked }) => {
    const token = getToken();

    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        /*api */
        // the first argument is the card's id
        addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) => (item._id === _id ? updatedCard.item : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        /* api */
        // the first argument is the card's id
        removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) => (item._id === _id ? updatedCard.item : item))
            );
          })
          .catch((err) => {
            console.error(err);
          });
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function handleAllFormSubmit(request) {
    // start loading
    setIsLoading(true);
    request()
      // we need to close only in `then`
      .then(closeActiveModal())
      // we need to catch possible errors
      // console.error is used to handle errors if you don’t have any other ways for that
      .catch(console.error)
      // and in finally we need to stop loading
      .finally(() => setIsLoading(false));
  }

  const onAddItem = (item, resetForm) => {
    function makeRequest() {
      return addClothes(item).then((item) => {
        setClothingItems([
          item.data,
          ...clothingItems,
        ]); /* using cmd + p in console we can see what needs to be added in "setClothingItems" params and attach it to the end of item res to fix additem issues */
        resetForm();
      });
    }
    handleAllFormSubmit(makeRequest);
  };

  const handleLogin = ({ email, password, name, avatar }, resetUserForm) => {
    if (!email || !password) {
      return;
    }
    function makeRequest() {
      return auth
        .userSignin({ email, password })

        .then((res) => {
          setToken(res.token);
          setIsLoggedIn(true);
          auth.getUserInfo(res.token).then((user) => {
            setCurrentUser({
              name: user.name,
              email: user.email,
              _id: user._id,
              avatar: user.avatar,
            }); /* using cmd + p in console we can see what needs to be added in "setCurrentUser" params and attach it to the end of user res to fix login issues */
          });
          resetUserForm();
          navigate("/profile");
        });
    }
    handleAllFormSubmit(makeRequest);
  };

  const handleSignup = ({ name, avatar, email, password }) => {
    function makeRequest() {
      return auth.userSignUp({ name, avatar, email, password }).then(() => {
        handleLogin({ email, password });
      });
    }
    handleAllFormSubmit(makeRequest);
  };

  const handleEditProfile = ({ name, avatar }) => {
    function makeRequest() {
      const token = getToken();

      return auth.userEdit({ name, avatar }, token).then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      });
    }
    handleAllFormSubmit(makeRequest);
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
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      /* after completion remove the event listener */
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleClickToClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.target.className === "modal__opened") {
        e.preventDefault();
        closeActiveModal();
      }
    };

    document.addEventListener("mousedown", handleClickToClose);

    return () => {
      /* after completion remove the event listener */
      document.removeEventListener("mousedown", handleClickToClose);
    };
  }, [activeModal]);

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
                    handleCardLike={handleCardLike}
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
                      handleEditClick={handleEditClick}
                      handleCardLike={handleCardLike}
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
              isLoading={isLoading}
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
              handleSignupClick={handleSignupClick}
              isLoading={isLoading}
            />
          )}
          {activeModal === "registerModal" && (
            <RegisterModal
              isOpen={activeModal === "registerModal"}
              onClose={closeActiveModal}
              handleSignup={handleSignup}
              handleLoginClick={handleLoginClick}
              isLoading={isLoading}
            />
          )}
          {activeModal === "editProfileModal" && (
            <EditProfileModal
              isOpen={activeModal === "editProfileModal"}
              onClose={closeActiveModal}
              handleEditProfile={handleEditProfile}
              isLoading={isLoading}
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
