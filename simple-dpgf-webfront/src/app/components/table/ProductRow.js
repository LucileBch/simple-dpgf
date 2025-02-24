import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TableCell, TableRow } from "@mui/material";
import { unitEnumtoLabel } from "../../core/enums/UnitEnum";
import { useCallback, useContext } from "react";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { DialogContext } from "../../core/contexts/dialog-context";
import ProductUpdateDialog from "../modals/ProductUpdateDialog";
export default function ProductRow({ product, isManager = false, }) {
    const { selectedProduct, setSelectedProduct } = useContext(DpgfContext);
    const { setIsUpdateDialogOpen } = useContext(DialogContext);
    const updateProduct = useCallback((product) => {
        setIsUpdateDialogOpen(true);
        setSelectedProduct(product);
    }, [setIsUpdateDialogOpen, setSelectedProduct]);
    return (_jsxs(_Fragment, { children: [_jsxs(TableRow, { hover: true, sx: {
                    cursor: isManager ? "default" : "pointer",
                    transition: isManager ? "none" : "box-shadow 0.2s ease-in-out",
                    "&:hover": {
                        boxShadow: 3,
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                }, onClick: isManager ? undefined : () => updateProduct(product), children: [_jsx(TableCell, { sx: { padding: "4px 10px" }, children: product.name }), _jsx(TableCell, { sx: { padding: "4px 10px" }, children: unitEnumtoLabel(product.unit) }), _jsx(TableCell, { sx: { padding: "4px 10px" }, children: product.quantity }), _jsx(TableCell, { sx: { padding: "4px 10px" }, children: product.unitPrice.toFixed(2) }), _jsx(TableCell, { sx: { padding: "4px 10px" }, children: product.totalPrice.toFixed(2) })] }), selectedProduct && (_jsx(ProductUpdateDialog, { dialogTitle: "Modifier ou supprimer ce poste", product: selectedProduct }))] }));
}
