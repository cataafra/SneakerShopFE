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
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  const handleSubmit = () => {
    let formErrors = {};
    if (formData.style.trim() === "") {
      formErrors.style = true;
    }
    if (formData.price <= 0) {
      formErrors.price = true;
    }
    if (formData.quantity <= 0) {
      formErrors.quantity = true;
    }
    if (formData.style.trim() === "" || isNaN(formData.size)) {
      formErrors.size = true;
    }
    if (formData.style.trim() === "" || isNaN(formData.brand)) {
      formErrors.brand = true;
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    createItem(formData);
    loadItems();
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const createItem = (itemData) => {
    const url = `${itemType}/`;
    try {
      ApiService.post(
        url,
        itemData,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1NjA4ODExLCJpYXQiOjE2ODQzMTI4MTEsImp0aSI6ImNlNjY0ZGVmMmNkYTQ5YTRiMmJjNTEyYmVmZWIyZWRiIiwidXNlcl9pZCI6MX0.3PfCU-iosDppA9-QMIK9-kLecZwc8xV0wUPOgevoPP0"
      ).then((response) => response.data);
    } catch (error) {
      console.error(error);
      window.alert(error);
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
            error={errors.style}
            helperText={errors.style ? "Style field cannot be empty" : ""}
            className={errors.style ? "error-field" : ""}
          />
          <TextField
            type="number"
            margin="dense"
            name="price"
            label="Price"
            fullWidth
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
            helperText={errors.price ? "Price must be a positive number" : ""}
            className={errors.price ? "error-field" : ""}
          />
          <TextField
            type="number"
            margin="dense"
            name="quantity"
            label="Quantity"
            fullWidth
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
            helperText={
              errors.quantity ? "Quantity must be a positive number" : ""
            }
            className={errors.quantity ? "error-field" : ""}
          />
          <TextField
            type="brand"
            margin="dense"
            name="brand"
            label="Brand"
            fullWidth
            value={formData.brand}
            onChange={handleChange}
            error={errors.brand}
            helperText={errors.brand ? "Brand must be an ID" : ""}
            className={errors.brand ? "error-field" : ""}
          />
          <TextField
            type="size"
            margin="dense"
            name="size"
            label="Size"
            fullWidth
            value={formData.size}
            onChange={handleChange}
            error={errors.size}
            helperText={errors.size ? "Size must be a positive number" : ""}
            className={errors.size ? "error-field" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddItemDialog;
