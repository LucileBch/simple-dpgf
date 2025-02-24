import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { Grid2, Tooltip } from "@mui/material";
import { lotNameToLabel } from "../../core/enums/LotEnum";
import { theme } from "../../styles/theme";
import TitleH3 from "../typographies/TitleH3";
import { useCallback, useContext, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import ProductCreationDialog from "../modals/ProductCreationDialog";
import DeleteLotDialog from "../modals/DeleteLotDialog";
export default function LotCard({ lot, isManager = false, }) {
    const [selectedLot, setSelectedLot] = useState(undefined);
    const { setIsCreateDialogProductOpen, setIsDeleteDialogOpen } = useContext(DialogContext);
    const handleOpenCreateDialog = useCallback(() => {
        setIsCreateDialogProductOpen(true);
        setSelectedLot(lot);
    }, [lot, setIsCreateDialogProductOpen, setSelectedLot]);
    const handleOpenDeleteDialog = useCallback(() => {
        setIsDeleteDialogOpen(true);
        setSelectedLot(lot);
    }, [lot, setIsDeleteDialogOpen, setSelectedLot]);
    return (_jsxs(Grid2, { sx: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingX: "10px",
            border: "solid",
            borderWidth: "1px",
            borderColor: theme.palette.primary.main,
            borderRadius: "5px",
            width: "100%",
            backgroundColor: theme.palette.background.paper,
        }, children: [_jsxs(Grid2, { sx: { display: "flex", gap: 2 }, children: [_jsxs(TitleH3, { children: [lot.code, "."] }), _jsx(TitleH3, { children: lotNameToLabel(lot.lotName) })] }), !isManager && (_jsxs(Grid2, { sx: { display: "flex", gap: "10px" }, children: [_jsx(Tooltip, { title: "Ajouter un poste", children: _jsx(AddIcon, { onClick: handleOpenCreateDialog, sx: {
                                color: theme.palette.primary.main,
                                cursor: "pointer",
                                transition: "transform 0.2s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                            } }) }), selectedLot && (_jsx(ProductCreationDialog, { dialogTitle: "Ajouter un nouveau poste", selectedLot: selectedLot, setSelectedLot: setSelectedLot })), _jsx(Tooltip, { title: "Supprimer un lot", children: _jsx(DeleteOutlineIcon, { onClick: handleOpenDeleteDialog, sx: {
                                color: theme.palette.error.main,
                                cursor: "pointer",
                                transition: "transform 0.2s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                            } }) }), selectedLot && (_jsx(DeleteLotDialog, { dialogTitle: "Supprimer un lot", dialogContent: `Êtes-vous sur de vouloir supprimer le lot n°${lot.code} : ${lotNameToLabel(lot.lotName)}, ainsi que tous les postes associés ?`, selectedLot: selectedLot, setSelectedLot: setSelectedLot }))] }))] }));
}
