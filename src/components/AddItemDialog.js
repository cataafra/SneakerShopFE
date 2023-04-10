import "./AddItemDialog.scss";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Fab,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import ApiService from "../api/apiService";

function AddItemDialog({ loadItems, itemType }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    style: "",
    price: 0,
    quantity: 0,
    brand: 0,
    size: 0,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    createItem(formData);
    loadItems();
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createItem = (itemData) => {
    const url = `${itemType}/`;
    try {
      ApiService.post(url, itemData).then((response) => response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Fab
        onClick={handleOpen}
        variant="extended"
        className="add-sneaker-fab"
        color="primary"
        aria-label="add"
        style={{ position: "fixed" }}
      >
        <Add sx={{ mr: 1 }} />
        Add new {itemType}
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New {itemType}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="style"
            label="Style"
            fullWidth
            value={formData.style}
            onChange={handleChange}
          />
          <TextField
            type="number"
            margin="dense"
            name="price"
            label="Price"
            fullWidth
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            type="number"
            margin="dense"
            name="quantity"
            label="Quantity"
            fullWidth
            value={formData.quantity}
            onChange={handleChange}
          />
          <TextField
            type="brand"
            margin="dense"
            name="brand"
            label="Brand"
            fullWidth
            value={formData.brand}
            onChange={handleChange}
          />
          <TextField
            type="size"
            margin="dense"
            name="size"
            label="Size"
            fullWidth
            value={formData.size}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddItemDialog;
