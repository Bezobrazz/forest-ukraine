import { GiHamburgerMenu } from "react-icons/gi";
import s from "./NavBar.module.css";

const NavBar = ({ onHamburgerMenuBtnHandle }) => {
  return (
    <div className={s.container}>
      <GiHamburgerMenu
        onClick={onHamburgerMenuBtnHandle}
        className={s.hamburgerBtn}
      />
    </div>
  );
};

export default NavBar;
