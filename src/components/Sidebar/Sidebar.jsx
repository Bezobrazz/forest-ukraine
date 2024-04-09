import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.css";

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className={s.sidebar}>
      <div className={s.topBar}>
        <h2 className={s.sidebarTitle}>Navigation</h2>
      </div>
      <ul className={s.navWrapper}>
        <li className={s.navLink}>
          <Link to="/">Home</Link>
        </li>
        <li className={s.navLink}>
          <Link to="/production">Production</Link>
        </li>
      </ul>
      <AiFillCloseSquare onClick={closeSidebar} className={s.closeSidebarBtn} />
    </div>
  );
};

export default Sidebar;
