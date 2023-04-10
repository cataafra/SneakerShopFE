import "./ItemList.scss";
import React, { useState, useEffect } from "react";
import ApiService from "../api/apiService";
import { Grid, IconButton, TextField } from "@mui/material";
import { NavigateBefore, NavigateNext, Add } from "@mui/icons-material/";

import ItemCard from "./ItemCard";
import AddItemDialog from "./AddItemDialog";

const ItemList = ({ itemType }) => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [currPageurl, setCurrPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [minPrice, setMinPrice] = useState(null);

  const loadItems = async (page = 1) => {
    let url = `${itemType}/?page=${page}`;
    if (minPrice !== null) {
      url += `&min-price=${minPrice}`;
    }
    try {
      const response = await ApiService.get(url);
      setNextPageUrl(response.next);
      setPrevPageUrl(response.previous);
      setCurrPageUrl(url);
      setItems(response.results);
      setCount(response.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadItems();
  }, [minPrice]);

  const handleNextClick = () => {
    loadItems(getPageNumber(nextPageUrl));
  };

  const handlePrevClick = () => {
    loadItems(getPageNumber(prevPageUrl));
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value ? parseInt(event.target.value) : null);
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
    <section className="item-list">
      <div style={{ display: "flex", width: "100%" }}>
        <h1 className="item-list__title" style={{ marginRight: "auto" }}>
          All {itemType}s ({count})
        </h1>
        {itemType === "Sneaker" && (
          <TextField
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            defaultValue={"Min Price"}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      </div>
      <Grid container spacing={2} className="item-list__grid">
        {items.map((item) => (
          <Grid item lg={4} md={6} sm={8} key={item.id}>
            <ItemCard
              item={item}
              loadItems={loadItems}
              itemType={itemType}
            ></ItemCard>
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
      <AddItemDialog loadItems={loadItems} itemType={itemType}></AddItemDialog>
    </section>
  );
};

export default ItemList;
