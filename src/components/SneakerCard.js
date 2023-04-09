import "./SneakerCard.scss";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const SneakerCard = ({ sneaker }) => {
  return (
    <Card variant="outlined" className="sneaker-card">
      <CardContent style={{ textAlign: "left" }}>
        <Typography sx={{ fontSize: 14 }} color="primary.text" gutterBottom>
          {sneaker.brand_name}
        </Typography>
        <Typography variant="h5" component="div">
          {sneaker.style}
        </Typography>
        <Typography variant="body2">
          Size: {sneaker.size}
          <br />
          Quantity: {sneaker.quantity}
        </Typography>
        <Typography>
          <div className="sneaker-card__price">${sneaker.price}</div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default SneakerCard;
