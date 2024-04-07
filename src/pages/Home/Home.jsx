import { GiHamburgerMenu } from "react-icons/gi";
import s from "./Home.module.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

const Home = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const onHamburgerMenuBtnHandle = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return (
    <div className={s.container}>
      <GiHamburgerMenu
        onClick={onHamburgerMenuBtnHandle}
        className={s.hamburgerBtn}
      />
      {sidebarIsOpen && <Sidebar closeSidebar={onHamburgerMenuBtnHandle} />}
      <h2>Welcome to Home Page</h2>
      {/* Other content */}
    </div>
  );
};

export default Home;
