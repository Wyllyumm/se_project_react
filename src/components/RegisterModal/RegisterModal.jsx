import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onClose,
  handleSignup,
  handleLoginClick,
  isLoading,
}) => {
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const signupSubmitBtnClassName = buttonIsActive
    ? "modal__submit modal__submit_signup_active"
    : "modal__submit modal__submit_siginup";

  const [name, setUsername] = useState("");
  const handleUsernameChange = (e) => {
    console.log(e);
    setUsername(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    console.log(e);
    setAvatar(e.target.value);
  };

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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    handleSignup({ email, password, name, avatar });
  };

  useEffect(() => {
    if (name && avatar && email && password) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [name, avatar, email, password]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Signing up..." : "next"}
      /* activeModal={activeModal} convert to universal */
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSignupSubmit}
      buttonClass={signupSubmitBtnClassName}
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
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleUsernameChange}
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="avatar"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
      <button
        onClick={handleLoginClick}
        className="modal__or-btn"
        type="button"
      >
        or login
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
