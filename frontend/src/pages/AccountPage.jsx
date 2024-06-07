import AccountNav from "../AccountNav";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import Button from "@mui/material/Button";
import axios from "axios";
import './AccountPage.css'; // Імпортуємо CSS файл

export default function AccountPage() {
  const { isSignedIn, signOut, user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastname || "");
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.patch(`/userManager/user/${user.user_id}`, {
        firstname: firstName,
        lastname: lastName,
      });
      // Оновлюємо стан користувача новими даними
      setUser((prevUser) => ({
        ...prevUser,
        firstname: firstName,
        lastname: lastName,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <AccountNav />
      {user && subpage === "profile" && (
        <div className="account-container">
          <h2>Профіль</h2>
          <p>
            <span className="bold-label">Авторизовано як:</span> {user.user_id} 
            <br />
            <span className="bold-label">Ім'я користувача:</span> {user.firstname} {user.lastname}
          </p>
          <h1 className="bold-label">Введіть дані</h1>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Button onClick={handleUpdateProfile} variant="contained" color="primary" size="small">
              Зберегти зміни
            </Button>
          </div>
          <Button onClick={signOut} variant="contained" color="primary" size="small" className="logout-button">
            Logout
          </Button>
        </div>
      )}
      {subpage === "bookings" && <PlacesPage />}
    </div>
  );
}
