import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className={styles?.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
