import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";
import "./App.css";

function App() {
  const [filterMode, setFilterMode] = useState("all"); // "all" or "favorites"
  return (
    <>
      <div className="dark:bg-spot-dark pt-4 h-screen ">
        <Navbar filterMode={filterMode} setFilterMode={setFilterMode} />
        <Home filterMode={filterMode} setFilterMode={setFilterMode} />
        <div className="md:hidden">
          <BottomNav filterMode={filterMode} setFilterMode={setFilterMode} />
        </div>
      </div>
    </>
  );
}

export default App;
