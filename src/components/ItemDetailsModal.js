import React, { useState, useEffect } from "react";
import "./ItemDetailsModal.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiService from "../api/apiService";

function ItemDetailsModal({ itemId, itemType, loadItems }) {
  const [open, setOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const [editMode, setEditMode] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    fetchItemDetails();
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const fetchItemDetails = async () => {
    const itemData = await ApiService.get(`${itemType}/${itemId}/`);
    setItemDetails(itemData);
  };

  const renderJSON = (input) => {
    if (typeof input == "object") {
      if (Array.isArray(input)) {
        return <div>{input.map((e) => renderJSON(e))}</div>;
      }

      return (
        <ul>
          {Object.keys(input).map((key) => (
            <li key={key}>
              <b>{key}:</b> {input[key]}
            </li>
          ))}
        </ul>
      );
    }

    return input;
  };

  const renderDetails = () => {
    return (
      <div className="item-details">
        {Object.keys(itemDetails).map((key) => (
          <div key={key} style={{ fontSize: "18px" }}>
            <h3
              className="item-details__key"
              style={{ textTransform: "capitalize", display: "inline-block" }}
            >
              {key}:&nbsp;
            </h3>
            {editMode ? (
              <TextField
                defaultValue={JSON.stringify(itemDetails[key])}
                fullWidth
                onChange={(e) =>
                  setItemDetails((prevState) => ({
                    ...prevState,
                    [key]: e.target.value,
                  }))
                }
              />
            ) : (
              <span>{renderJSON(itemDetails[key])}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    await ApiService.patch(`${itemType}/${itemId}/`, itemDetails);
    loadItems();
    setEditMode(false);
  };

  const handleDeleteClick = async () => {
    // Show a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) {
      return;
    }

    await ApiService.delete(`${itemType}/${itemId}/`);
    loadItems();
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>View Details</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={{ "& .MuiDialog-paper": { minWidth: "60vw" } }}
        className="item-details"
      >
        <DialogTitle
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderBottom: 1,
            borderColor: "divider",
            marginBottom: 2,
          }}
        >
          <h1 className="item-details__title">
            {itemType} object #{itemId}
          </h1>
        </DialogTitle>
        <DialogContent>{renderDetails()}</DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
              <Button onClick={handleSaveClick} variant="contained">
                Save
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={handleEditClick} startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button
                sx={{ color: "darkred" }}
                onClick={handleDeleteClick}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ItemDetailsModal;
