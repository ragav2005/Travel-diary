import { NavLink, Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function NavBar() {
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
          <Link to="/login" className="cta">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
