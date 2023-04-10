import "./ItemCard.scss";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import ItemDetailsModal from "./ItemDetailsModal";

const ItemCard = ({ item, itemType, loadItems }) => {
  return (
    <Card variant="outlined" className="item-card">
      <CardContent style={{ textAlign: "left" }}>
        {itemType === "Sneaker" && (
          <>
            <Typography sx={{ fontSize: 14 }} color="primary.text" gutterBottom>
              {item.brand_name}
            </Typography>
            <Typography variant="h5" component="div">
              {item.style}
            </Typography>
            <Typography variant="body2">
              Size: {item.size}
              <br />
              Quantity: {item.quantity}
            </Typography>
            <Typography>
              <div className="item-card__price">${item.price}</div>
            </Typography>
          </>
        )}
        {itemType === "Garment" && (
          <>
            <Typography variant="h5" component="div">
              {item.style}
            </Typography>
            <Typography variant="body2">
              Size: {item.size}
              <br />
              Quantity: {item.quantity}
            </Typography>
            <Typography>
              <div className="item-card__price">${item.price}</div>
            </Typography>
          </>
        )}
        {itemType === "Brand" && (
          <>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2">Motto: {item.motto}</Typography>
          </>
        )}
        {itemType === "Customer" && (
          <>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2">Age: {item.age}</Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <ItemDetailsModal
          itemType={itemType}
          itemId={item.id}
          loadItems={loadItems}
        ></ItemDetailsModal>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
