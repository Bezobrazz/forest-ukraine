import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import s from "./App.module.css";

import Sidebar from "./components/Sidebar/Sidebar.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

import Home from "./pages/Home/Home.jsx";
import Production from "./pages/Production/Production.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import FinishedProducts from "./pages/FinishedProducts/FinishedProducts.jsx";
import DeliveryCost from "./pages/DeliveryCost/DeliveryCost.jsx";
import { GoogleSheet } from "./pages/GoogleSheet/GoogleSheet.jsx";

import {
  Suppliers,
  Bags,
  Operations,
} from "./pages/Production/components/index.js";

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
            <Route path="/production" element={<Production />}>
              <Route index element={<Navigate to="suppliers-info" />} />
              <Route path="suppliers-info" element={<Suppliers />} />
              <Route path="bags-info" element={<Bags />} />
              <Route path="operations-info" element={<Operations />} />
            </Route>
            <Route
              path="/production/finished-products"
              element={<FinishedProducts />}
            />
            <Route path="/delivery-cost" element={<DeliveryCost />} />
            <Route path="/google-sheets" element={<GoogleSheet />} />
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
