import "./ItemList.scss";
import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../api/apiService";
import {
  Grid,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  NavigateBefore,
  NavigateNext,
  SentimentDissatisfied,
} from "@mui/icons-material/";

import ItemCard from "./ItemCard";
import AddItemDialog from "./AddItemDialog";

const ItemList = ({ itemType }) => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [currPageurl, setCurrPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [sortBy, setSortBy] = useState("ID");

  const loadItems = useCallback(
    async (page = 1) => {
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
    },
    [itemType, minPrice]
  );

  useEffect(() => {
    loadItems();
  }, [minPrice, sortBy, loadItems]);

  const sortItems = useCallback(() => {
    if (sortBy === "PriceAsc") {
      setItems([...items].sort((a, b) => a.price - b.price));
    } else if (sortBy === "PriceDesc") {
      setItems([...items].sort((a, b) => b.price - a.price));
    }
  }, [items, sortBy]);

  useEffect(() => {
    sortItems();
  }, [sortItems]);

  const handleNextClick = () => {
    loadItems(getPageNumber(nextPageUrl));
  };

  const handlePrevClick = () => {
    loadItems(getPageNumber(prevPageUrl));
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value ? parseInt(event.target.value) : null);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value ? event.target.value : null);
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
        {itemType === "Sneaker" && (
          <FormControl sx={{ marginLeft: 1 }}>
            <InputLabel id="sort-by-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-select-label"
              id="sort-by-select"
              value={sortBy}
              label="Sort By"
              onChange={handleSortByChange}
            >
              <MenuItem value={"ID"}>ID</MenuItem>
              <MenuItem value={"PriceAsc"}>Price (ascending)</MenuItem>
              <MenuItem value={"PriceDesc"}>Price (descending)</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
      {items.length ? (
        <>
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
        </>
      ) : (
        <section
          className="no-data"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "25vh 0",
          }}
        >
          No items available. &nbsp;
          <SentimentDissatisfied></SentimentDissatisfied>
        </section>
      )}

      <AddItemDialog loadItems={loadItems} itemType={itemType}></AddItemDialog>
    </section>
  );
};

export default ItemList;
