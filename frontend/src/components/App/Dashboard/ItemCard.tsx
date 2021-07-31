import { Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { MouseEventHandler } from "react";
import { Button } from "react-admin";

type ItemCardProps = {
  category: string;
  buttonText?: string;
  description: string;
  name: string;
  onPlusButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onMinusButtonClick?: MouseEventHandler<HTMLButtonElement>;
  totalQuantity: number;
  currentQuantity: number;
};

const ItemCard = ({
  category,
  description,
  name,
  onPlusButtonClick,
  onMinusButtonClick,
  totalQuantity,
  currentQuantity,
}: ItemCardProps) => {
  return (
    <Card style={{ padding: "0.5rem 0.5rem" }}>
      <CardHeader style={{ textTransform: "capitalize" }} title={name} />
      <CardContent>
        <Typography component="p" variant="body1">
          {description}
        </Typography>
        <Typography color="textSecondary">Categoría: {category}</Typography>
        <Typography color="textSecondary">Cantidad total: {totalQuantity}</Typography>
      </CardContent>
      <CardActions
        style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}
      >
        <Button
          color="primary"
          disabled={currentQuantity === 0}
          onClick={onMinusButtonClick}
          size="small"
          variant="outlined"
          label="-"
        />

        {currentQuantity}

        <Button
          color="primary"
          disabled={currentQuantity === totalQuantity}
          onClick={onPlusButtonClick}
          size="small"
          variant="outlined"
          label="+"
        />
      </CardActions>
    </Card>
  );
};

export default ItemCard;
