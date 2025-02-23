import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { Grid2, Tooltip } from "@mui/material";
import { LotDto } from "../../core/dtos/lot/LotDto";
import { lotNameToLabel } from "../../core/enums/LotEnum";
import { theme } from "../../styles/theme";
import TitleH3 from "../typographies/TitleH3";
import { useCallback, useContext, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import ProductCreationDialog from "../modals/ProductCreationDialog";
import DeleteLotDialog from "../modals/DeleteLotDialog";

interface IProps {
  lot: LotDto;
}

export default function LotCard({ lot }: Readonly<IProps>): JSX.Element {
  const [selectedLot, setSelectedLot] = useState<LotDto | undefined>(undefined);

  const { setIsCreateDialogProductOpen, setIsDeleteDialogOpen } =
    useContext(DialogContext);

  const handleOpenCreateDialog = useCallback(() => {
    setIsCreateDialogProductOpen(true);
    setSelectedLot(lot);
  }, [lot, setIsCreateDialogProductOpen, setSelectedLot]);

  const handleOpenDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(true);
    setSelectedLot(lot);
  }, [lot, setIsDeleteDialogOpen, setSelectedLot]);

  return (
    <Grid2
      sx={{
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
      }}
    >
      <Grid2 sx={{ display: "flex", gap: 2 }}>
        <TitleH3>{lot.code}.</TitleH3>
        <TitleH3>{lotNameToLabel(lot.lotName)}</TitleH3>
      </Grid2>
      <Grid2 sx={{ display: "flex", gap: "10px" }}>
        <Tooltip title="Ajouter un poste">
          <AddIcon
            onClick={handleOpenCreateDialog}
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
        {selectedLot && (
          <ProductCreationDialog
            dialogTitle="Ajouter un nouveau poste"
            selectedLot={selectedLot}
            setSelectedLot={setSelectedLot}
          />
        )}

        <Tooltip title="Supprimer un lot">
          <DeleteOutlineIcon
            onClick={handleOpenDeleteDialog}
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

        {selectedLot && (
          <DeleteLotDialog
            dialogTitle="Supprimer un lot"
            dialogContent={`Êtes-vous sur de vouloir supprimer le lot n°${
              lot.code
            } : ${lotNameToLabel(
              lot.lotName
            )}, ainsi que tous les postes associés ?`}
            selectedLot={selectedLot}
            setSelectedLot={setSelectedLot}
          />
        )}
      </Grid2>
    </Grid2>
  );
}
