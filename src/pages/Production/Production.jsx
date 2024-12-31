import { NavLink, Outlet } from "react-router-dom";
import styles from "./Production.module.css";

const Production = () => {
  const navLinks = [
    { name: "Постачальники", path: "suppliers-info" },
    { name: "Мішки", path: "bags-info" },
    { name: "Операції", path: "operations-info" },
  ];

  const linkClassName = (isActive) =>
    `${isActive ? styles.active : styles.inactive}`;
  return (
    <div className={styles.production}>
      <h2>Production Page</h2>
      <div className={styles.container}>
        <div className={`${styles.navbar} ${styles.scrollbar}`}>
          {navLinks.map((link) => (
            <NavLink key={link.path} className={linkClassName} to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Production;
