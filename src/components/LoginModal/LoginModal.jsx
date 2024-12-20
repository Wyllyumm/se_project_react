import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ onClose, isOpen, handleLogin }) => {
  /* const [data, setData] = useState({ email: "", password: "" }); */

  /*const handleUserChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log(e);
  };*/

  /*const handleUserChange = (e) => {
    /*console.log(e); 
    setData(e.target.value);
  }; */

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
    setData("");
  }

  const handleUserSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password }, resetUserForm);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log In"
      /*activeModal={activeModal} convert to universal*/
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleUserSubmit}
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
    </ModalWithForm>
  );
};

export default LoginModal;
