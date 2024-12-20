import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  handleUserSignout,
  handleEditClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          handleUserSignout={handleUserSignout}
          handleEditClick={handleEditClick}
        />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
