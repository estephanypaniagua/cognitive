import { Card, CardContent, Typography } from "@material-ui/core";

import myFormatRelative from "#root/helpers/myFormatRelative";

type CartCardProps = {
  allComponents: any;
  components: any;
  isApproved: string;
  createdAt: string;
};

const CartCard = ({ allComponents, components, isApproved, createdAt }: CartCardProps) => {
  return (
    <Card style={{ padding: "0.5rem 0.5rem" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {myFormatRelative(new Date(createdAt))}
        </Typography>

        <Typography
          component="h4"
          gutterBottom
          style={{ textTransform: "capitalize" }}
          variant="h5"
        >
          Aprobado: {isApproved === "0" ? "No" : "Si"}
        </Typography>

        {components?.map((c: any) => {
          const myComp = allComponents.filter((comp: any) => comp.id == c.component_id)[0]?.name;
          const myQty = c.quantity;
          return <Typography color="textSecondary">{`${myComp}: ${myQty}`}</Typography>;
        })}
      </CardContent>
    </Card>
  );
};

export default CartCard;
