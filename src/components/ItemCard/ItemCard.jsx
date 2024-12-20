import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  /*const isLiked = item.likes.some((id) => id === currentUser._id);
  /*const itemLikeButtonClassName = `card__like-btn ${
    isOwner ? "" : "card__like-btn_hidden"
  }`; */
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
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
      <button className="card__like-btn"></button>
    </li>
  );
}

export default ItemCard;
