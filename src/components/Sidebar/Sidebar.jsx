import avatar from "../../assets/wtwrAvatar.svg";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
      <p className="sidebar__username">Terrance Tegegne</p>
    </div>
  );
}

export default Sidebar;
