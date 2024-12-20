import { useContext } from "react";
import avatar from "../../assets/wtwrAvatar.svg";
import "./Sidebar.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function Sidebar({ handleUserSignout, handleEditClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
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
      <p className="sidebar__username">{currentUser?.name}</p>
      <button
        onClick={handleEditClick}
        type="button"
        className="sidebar__user-edit"
      >
        Change profile data
      </button>
      <button
        onClick={handleUserSignout}
        type="button"
        className="sidebar__user-signout"
      >
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
