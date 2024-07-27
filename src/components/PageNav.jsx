import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";

function NavBar() {
  const { isAuthenticated, logOut } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    if (isAuthenticated) {
      logOut();
    } else {
      navigate("/login");
    }
  };
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <button className={styles.button} onClick={handleClick}>
            {isAuthenticated ? "Logout" : "LogIn"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
