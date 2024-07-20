import { CgClose } from "react-icons/cg";
import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ toggleSidebar, closeSidebar, isTabletOrMobile }) => {
  const navItems = [
    { to: "/", text: "Форест " },
    {
      to: "/production",
      text: "Виробництво",
      subItems: [
        { to: "/production/finished-products", text: "Виготовлена Продукція" },
      ],
    },
    { to: "/delivery-cost", text: "Вартість доставки для клієнта" },
    { to: "/google-sheets", text: "Google Sheets" },
  ];

  const handleNavLinkClick = () => {
    isTabletOrMobile && closeSidebar();
  };

  return (
    <div
      className={`${isTabletOrMobile ? styles.sidebarMobile : styles.sidebar}`}
    >
      <div className={styles.topBar}>
        {/* <h2 className={styles.sidebarTitle}>Navigation</h2> */}
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
