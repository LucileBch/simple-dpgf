import { TableCell, TableRow } from "@mui/material";
import { ProductDto } from "../../core/dtos/product/ProductDto";
import { unitEnumtoLabel } from "../../core/enums/UnitEnum";
import { useCallback, useContext } from "react";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { DialogContext } from "../../core/contexts/dialog-context";
import ProductUpdateDialog from "../modals/ProductUpdateDialog";

interface IProps {
  product: ProductDto;
}

export default function ProductRow({ product }: Readonly<IProps>): JSX.Element {
  const { selectedProduct, setSelectedProduct } = useContext(DpgfContext);
  const { setIsUpdateDialogOpen } = useContext(DialogContext);

  const updateProduct = useCallback(
    (product: ProductDto) => {
      setIsUpdateDialogOpen(true);
      setSelectedProduct(product);
    },
    [setIsUpdateDialogOpen, setSelectedProduct]
  );

  return (
    <>
      <TableRow
        hover
        sx={{
          cursor: "pointer",
          transition: "box-shadow 0.2s ease-in-out",
          "&:hover": {
            boxShadow: 3,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
        onClick={() => updateProduct(product)}
      >
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
      </TableRow>

      {selectedProduct && (
        <ProductUpdateDialog
          dialogTitle="Modifier ou supprimer ce poste"
          product={selectedProduct}
        />
      )}
    </>
  );
}
