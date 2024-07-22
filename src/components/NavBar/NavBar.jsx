import { RxHamburgerMenu } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";
import s from "./NavBar.module.css";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

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

      {isTabletOrMobile && (
        <Link to="/">
          <img src={Logo} alt="logo" className={s.logo} />
        </Link>
      )}
    </div>
  );
};

export default NavBar;
