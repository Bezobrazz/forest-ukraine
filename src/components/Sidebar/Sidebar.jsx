import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.css";

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className={s.sidebar}>
      <div className={s.topBar}>
        <h2>Navigation</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/production">Production</Link>
        </li>
      </ul>
      <AiFillCloseSquare onClick={closeSidebar} className={s.closeSidebarBtn} />
    </div>
  );
};

export default Sidebar;
