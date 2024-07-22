import { RxHamburgerMenu } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";
import s from "./NavBar.module.css";
import Logo from "../../assets/images/logo.svg";

const NavBar = ({ onHamburgerMenuBtnHandle }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div className={s.container}>
      {isTabletOrMobile && (
        <RxHamburgerMenu
          onClick={onHamburgerMenuBtnHandle}
          className={s.hamburgerBtn}
        />
      )}

      {isTabletOrMobile && <img src={Logo} alt="logo" className={s.logo} />}
    </div>
  );
};

export default NavBar;
