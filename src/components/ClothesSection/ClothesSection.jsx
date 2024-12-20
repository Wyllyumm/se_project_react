import { useContext } from "react";

/*import { defaultClothingItems } from "../../utils/constants"; */
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems = [],
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const ownerItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your Items</p>
        <button className="clothes-section__add-items" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {
          /*ownerItems.length > 0 ? (*/
          ownerItems.map((item) => {
            return (
              <ItemCard
                key={item._id || item.id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })
        }
      </ul>
    </div>
  );
}

export default ClothesSection;
