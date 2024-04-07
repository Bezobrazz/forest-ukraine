import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.css";

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className={s.sidebar}>
      <h2>Navigation</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/production">Production</Link>
        </li>
      </ul>
      <div>
        <AiFillCloseSquare
          onClick={closeSidebar}
          className={s.closeSidebarBtn}
        />
      </div>
    </div>
  );
};

export default Sidebar;
