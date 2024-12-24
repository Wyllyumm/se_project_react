import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onClose, onAddItem, isOpen, isLoading }) => {
  const [buttonIsActive, setButtonIsActive] = useState(false);

  const addSubmitBtnClassName = buttonIsActive
    ? "modal__submit modal__submit_item_active"
    : "modal__submit";

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e);
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e);
    setUrl(e.target.value);
  };

  const [weather, setWeatherType] = useState("");
  const handleWeatherType = (e) => {
    console.log(e);
    setWeatherType(e.target.value);
  };

  function resetForm() {
    setName("");
    setUrl("");
    setWeatherType("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather }, resetForm);
  };

  useEffect(() => {
    if (name && imageUrl && weather) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [name, imageUrl, weather]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Adding garment..." : "Add garment"}
      /* activeModal={activeModal} convert to universal */
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      buttonClass={addSubmitBtnClassName}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherType}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherType}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherType}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
