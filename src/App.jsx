import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Home from "./pages/Home/Home.jsx";
import Production from "./pages/Production/Production.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import s from "./App.module.css";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import NavBar from "./components/NavBar/NavBar.jsx";
import FinishedProducts from "./pages/FinishedProducts/FinishedProducts.jsx";

const App = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [backdropIsOpen, setBackdropIsOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (isTabletOrMobile) {
      setSidebarIsOpen(false);
      setBackdropIsOpen(false);
    } else {
      setSidebarIsOpen(true);
      setBackdropIsOpen(false);
    }
  }, [isTabletOrMobile]);

  const onHamburgerMenuBtnHandle = () => {
    setSidebarIsOpen(!sidebarIsOpen);
    setBackdropIsOpen(!backdropIsOpen);
  };

  const closeSidebar = () => {
    setSidebarIsOpen(false);
    setBackdropIsOpen(false);
  };
  return (
    <div className={s.pageWrapper}>
      {sidebarIsOpen && (
        <Sidebar
          toggleSidebar={onHamburgerMenuBtnHandle}
          isTabletOrMobile={isTabletOrMobile}
          closeSidebar={closeSidebar}
        />
      )}
      <div className={s.contentWrapper}>
        <NavBar onHamburgerMenuBtnHandle={onHamburgerMenuBtnHandle} />
        <div className={s.content}>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/production" element={<Production />} />
            <Route
              path="/production/finished-products"
              element={<FinishedProducts />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {backdropIsOpen && (
        <div className={s.backdrop} onClick={closeSidebar}></div>
      )}
    </div>
  );
};

export default App;
