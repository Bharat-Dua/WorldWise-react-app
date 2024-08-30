import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to={"/"}>Home </NavLink>
        <NavLink to={"/price"}>Pricing </NavLink>
        <NavLink to={"/product"}>Product </NavLink>
      </ul>
    </nav>
  );
}

export default PageNav;
