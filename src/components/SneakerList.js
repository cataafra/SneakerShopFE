import "./SneakerList.scss";
import React, { useState, useEffect } from "react";
import ApiService from "../api/apiService";
import { Grid, IconButton, Fab } from "@mui/material";
import { NavigateBefore, NavigateNext, Add } from "@mui/icons-material/";

import SneakerCard from "./SneakerCard";
import AddItemDialog from "./AddItemDialog";

const SneakerList = () => {
  const [items, setItems] = useState([]);
  const [currPageurl, setCurrPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async (page = 1) => {
    const url = `Sneaker/?page=${page}`;
    try {
      const response = await ApiService.get(url);
      setNextPageUrl(response.next);
      setPrevPageUrl(response.previous);
      setCurrPageUrl(url);
      setItems(response.results);
    } catch (error) {
      console.error(error);
    }
  };

  const createItem = async (itemData) => {
    const url = `Sneaker/`;
    try {
      ApiService.post(url, itemData).then((response) => response.data);
      loadItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextClick = () => {
    loadItems(getPageNumber(nextPageUrl));
  };

  const handlePrevClick = () => {
    loadItems(getPageNumber(prevPageUrl));
  };

  const getPageNumber = (url) => {
    if (!url) {
      return null;
    }
    const pageRegex = /page=(\d+)/;
    const match = url.match(pageRegex);
    return match ? parseInt(match[1]) : 1; // or 1 is requiered for first page
  };

  return (
    <section className="sneaker-list">
      <h1 className="sneaker-list__title">All Sneakers</h1>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item lg={4} md={6} sm={8} key={item.id}>
            <SneakerCard sneaker={item}></SneakerCard>
          </Grid>
        ))}
      </Grid>
      <nav className="pagination">
        <IconButton onClick={handlePrevClick} disabled={!prevPageUrl}>
          <NavigateBefore />
        </IconButton>
        {getPageNumber(currPageurl)}
        <IconButton onClick={handleNextClick} disabled={!nextPageUrl}>
          <NavigateNext />
        </IconButton>
      </nav>
      <AddItemDialog createItem={createItem}></AddItemDialog>
    </section>
  );
};

export default SneakerList;
