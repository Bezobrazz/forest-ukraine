import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Home from "./pages/Home/Home.jsx";
import Production from "./pages/Production/Production.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import s from "./App.module.css";
import { useState } from "react";

const App = () => {
  return (
    <div className={s.pageWrapper}>
      <div className="content">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/production" element={<Production />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
