import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Home from "./pages/Home/Home.jsx";
import Production from "./pages/Production/Production.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import s from "./App.module.css";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar.jsx";

const App = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [backdropIsOpen, setBackdropIsOpen] = useState(false);

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
      <NavBar onHamburgerMenuBtnHandle={onHamburgerMenuBtnHandle} />
      {sidebarIsOpen && (
        <Sidebar
          toggleSidebar={onHamburgerMenuBtnHandle}
          closeSidebar={closeSidebar}
        />
      )}
      <div className="content">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/production" element={<Production />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {backdropIsOpen && (
        <div className={s.backdrop} onClick={closeSidebar}></div>
      )}
    </div>
  );
};

export default App;
