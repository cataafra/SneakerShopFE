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

function AddItemDialog({ createItem }) {
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
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
        Add new sneaker
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Sneaker</DialogTitle>
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
