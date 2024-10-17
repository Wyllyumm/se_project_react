import "./ItemModal.css";

function ItemModal({ isOpen, card, handleCloseClick, handleDeleteClick }) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button className="modal__delete" onClick={handleDeleteClick}>
          {""}
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
