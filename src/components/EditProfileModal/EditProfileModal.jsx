import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, isOpen, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setNewName] = useState("");
  const handleNewNameChange = (e) => {
    console.log(e);
    setNewName(e.target.value);
  };

  const [avatar, setNewAvatar] = useState("");
  const handleNewAvatarChange = (e) => {
    console.log(e);
    setNewAvatar(e.target.value);
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    handleEditProfile({ name, avatar });
  };

  useEffect(() => {
    if (currentUser) {
      setNewName(currentUser.name);
      setNewAvatar(currentUser.avatar);
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
          onChange={handleNewNameChange}
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
          onChange={handleNewAvatarChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
