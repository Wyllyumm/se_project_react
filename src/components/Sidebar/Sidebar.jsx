import { useContext } from "react";
import avatar from "../../assets/wtwrAvatar.svg";
import "./Sidebar.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function Sidebar({ handleUserSignout, handleEditClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser.avatar ? (
          <img
            src={currentUser?.avatar}
            alt="User Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div className="header__avatar-null">{currentUser.name}</div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__btns">
        <button
          onClick={handleEditClick}
          type="button"
          className="sidebar__btn"
        >
          Change profile data
        </button>
        <button
          onClick={handleUserSignout}
          type="button"
          className="sidebar__btn"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
