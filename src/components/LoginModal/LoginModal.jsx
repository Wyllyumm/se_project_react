import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ onClose, isOpen, handleLogin, handleSignupClick }) => {
  /* const [data, setData] = useState({ email: "", password: "" }); */
  const [buttonIsActive, setButtonIsActive] = useState(false);

  const loginSubmitBtnClassName = buttonIsActive
    ? "modal__submit modal__submit_login_active"
    : "modal__submit modal__submit_login";

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    console.log(e);
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    console.log(e);
    setPassword(e.target.value);
  };

  function resetUserForm() {
    setPassword("");
    setEmail("");
  }

  const handleUserSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password }, resetUserForm);
  };

  useEffect(() => {
    if (email && password) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [email, password]);

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log In"
      /* activeModal={activeModal} convert to universal */
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleUserSubmit}
      buttonClass={loginSubmitBtnClassName}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <button
        onClick={handleSignupClick}
        className="modal__or-btn"
        type="button"
      >
        or signup
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
