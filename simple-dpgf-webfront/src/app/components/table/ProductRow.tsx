import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { TableCell, TableRow, Tooltip } from "@mui/material";
import { ProductDto } from "../../core/dtos/product/ProductDto";
import { theme } from "../../styles/theme";
import { unitEnumtoLabel } from "../../core/enums/UnitEnum";

interface IProps {
  product: ProductDto;
}

export default function ProductRow({ product }: Readonly<IProps>): JSX.Element {
  return (
    <TableRow>
      <TableCell sx={{ padding: "4px 10px" }}>{product.name}</TableCell>
      <TableCell sx={{ padding: "4px 10px" }}>
        {unitEnumtoLabel(product.unit)}
      </TableCell>
      <TableCell sx={{ padding: "4px 10px" }}>{product.quantity}</TableCell>
      <TableCell sx={{ padding: "4px 10px" }}>
        {product.unitPrice.toFixed(2)}
      </TableCell>
      <TableCell sx={{ padding: "4px 10px" }}>
        {product.totalPrice.toFixed(2)}
      </TableCell>
      <TableCell sx={{ padding: "4px 10px" }}>
        <Tooltip title="Modifier un poste">
          <CreateOutlinedIcon
            sx={{
              color: theme.palette.primary.main,
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Tooltip>
      </TableCell>
      <TableCell sx={{ padding: "4px 10px" }}>
        <Tooltip title="Supprimer un poste">
          <DeleteOutlineIcon
            sx={{
              color: theme.palette.error.main,
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
