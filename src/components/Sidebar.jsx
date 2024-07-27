import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={styles.sidebar} id="sidebar">
      <Logo />
      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright @ {new Date().getFullYear()} Destination Diary Inc.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
