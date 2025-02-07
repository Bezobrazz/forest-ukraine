import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "../../assets/images/logo.svg";

// just comment

const Sidebar = ({ toggleSidebar, closeSidebar, isTabletOrMobile }) => {
  const navItems = [
    { to: "/", text: "Форест " },
    {
      to: "/production",
      text: "Сировина",
      // subItems: [
      //   { to: "/production/finished-products", text: "Виготовлена Продукція" },
      // ],
    },
    { to: "/delivery-cost", text: "Вартість доставки для клієнта" },
    { to: "/google-sheets", text: "Виготовлена продукція" },
  ];

  const handleNavLinkClick = () => {
    isTabletOrMobile && closeSidebar();
  };

  return (
    <div
      className={`${isTabletOrMobile ? styles.sidebarMobile : styles.sidebar}`}
    >
      <div className={styles.topBar}>
        {!isTabletOrMobile && (
          <Link to="/">
            <img src={Logo} alt="logo" className={styles.logo} />
          </Link>
        )}
      </div>
      <ul className={styles.navWrapper}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className={styles.navMainLinks}
              onClick={handleNavLinkClick}
            >
              {item.text}
            </Link>
            {item.subItems && (
              <ul className={styles.navSubitemsWrapper}>
                {item.subItems.map((subItem, subIndex) => (
                  <li className={styles.navSubitem} key={subIndex}>
                    <Link
                      to={subItem.to}
                      className={styles.navSubLink}
                      onClick={handleNavLinkClick}
                    >
                      {subItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {isTabletOrMobile && (
        <CgClose onClick={toggleSidebar} className={styles.closeSidebarBtn} />
      )}
    </div>
  );
};

export default Sidebar;
