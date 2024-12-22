import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const isOwner = item.owner === currentUser?._id;
  const itemLikeButtonClassName = `card__like-btn ${
    isOwner ? "" : "card__like-btn_hidden"
  }`;
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      <button onClick={handleLike} className={itemLikeButtonClassName}></button>
    </li>
  );
}

export default ItemCard;
