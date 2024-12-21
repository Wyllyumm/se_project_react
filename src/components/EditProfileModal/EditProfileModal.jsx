import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, isOpen, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setUserName] = useState("");
  const handleUserNameChange = (e) => {
    console.log(e);
    setUserName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    console.log(e);
    setAvatar(e.target.value);
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    handleEditProfile({ name, avatar });
  };

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser?.name);
      setAvatar(currentUser?.avatar);
    }
  });

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      /* activeModal={activeModal} convert to universal */
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleEditProfileSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleUserNameChange}
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
    </ModalWithForm>
  );
};

export default EditProfileModal;
