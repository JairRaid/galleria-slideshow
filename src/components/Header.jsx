import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ isPlaying, onPlayPause }) {
  const location = useLocation();

  function handleClick() {
    if (location.pathname === "/detail") {
      onPlayPause("clicked from detail");
    }
  }

  return (
    <header className="main-header">
      <h1 className="logo">
        <img src="assets/shared/logo.svg" alt="Galleria logo" />
      </h1>
      <nav>
        <Link to="/detail" onClick={() => handleClick()}>
          {isPlaying ? "STOP SLIDESHOW" : "START SLIDESHOW"}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
