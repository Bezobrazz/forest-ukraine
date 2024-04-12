import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.css";

const Sidebar = ({ toggleSidebar, closeSidebar }) => {
  return (
    <div className={s.sidebar}>
      <div className={s.topBar}>
        <h2 className={s.sidebarTitle}>Navigation</h2>
      </div>
      <ul className={s.navWrapper}>
        <li>
          <Link className={s.navLink} to="/" onClick={closeSidebar}>
            Головна
          </Link>
        </li>
        <li>
          <Link className={s.navLink} to="/production" onClick={closeSidebar}>
            Виробництво
          </Link>
        </li>
      </ul>
      <AiFillCloseSquare
        onClick={toggleSidebar}
        className={s.closeSidebarBtn}
      />
    </div>
  );
};

export default Sidebar;
