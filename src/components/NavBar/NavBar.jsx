import { GiHamburgerMenu } from "react-icons/gi";
import { useMediaQuery } from "react-responsive";
import s from "./NavBar.module.css";

const NavBar = ({ onHamburgerMenuBtnHandle }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div className={s.container}>
      {isTabletOrMobile && (
        <GiHamburgerMenu
          onClick={onHamburgerMenuBtnHandle}
          className={s.hamburgerBtn}
        />
      )}
    </div>
  );
};

export default NavBar;
