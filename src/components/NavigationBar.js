import "./Header.scss";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";

const NavigationBar = () => {
  const [value, setValue] = useState("1");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs onChange={handleChange} centered value={value}>
            <Tab label="Sneakers" value="1" />
            <Tab label="Clothing" value="2" />
            <Tab label="Brands" value="3" />
            <Tab label="Customers" value="4" />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <ItemList itemType={"Sneaker"}></ItemList>
        </TabPanel>
        <TabPanel value="2">
          <ItemList itemType={"Garment"}></ItemList>
        </TabPanel>
        <TabPanel value="3">
          <ItemList itemType={"Brand"}></ItemList>
        </TabPanel>
        <TabPanel value="4">
          <ItemList itemType={"Customer"}></ItemList>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default NavigationBar;
