import { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/wtwrAvatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser?.avatar}
                    alt="User Avatar"
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-null">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-btns">
            <button
              onClick={handleRegisterClick}
              className="header__register"
              type="button"
            >
              {" "}
              Signup
            </button>
            <button
              onClick={handleLoginClick}
              className="header__login"
              type="button"
            >
              {" "}
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
