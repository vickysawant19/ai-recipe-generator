import React from "react";
import logo from "../assets/claudeChef.png";

const Navbar = () => {
  return (
    <header className="header">
      <img src={logo} alt="" width={"50px"} />
      <h1>Claude-Chef</h1>
    </header>
  );
};

export default Navbar;
