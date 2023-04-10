import "./Header.scss";
import logo from "../images/afra_logo.png";
import { Box, Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";

const Header = () => {


  return (
    <>
      <section className="header">
        <img src={logo} alt="Afra Logo" className="header__logo" />
        <h1 className="header__text">Streetwear Store Manager</h1>
      </section>
      
    </>
  );
};

export default Header;
