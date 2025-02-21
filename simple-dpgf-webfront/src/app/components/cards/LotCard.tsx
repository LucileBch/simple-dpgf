import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { Grid2, Tooltip } from "@mui/material";
import { LotDto } from "../../core/dtos/lot/LotDto";
import { lotNameToLabel } from "../../core/enums/LotEnum";
import { theme } from "../../styles/theme";
import TitleH3 from "../typographies/TitleH3";
import { useCallback, useContext } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import ProductCreationDialog from "../modals/ProductCreationDialog";
import { DpgfContext } from "../../core/contexts/dpgf-context";

interface IProps {
  lot: LotDto;
}

export default function LotCard({ lot }: Readonly<IProps>): JSX.Element {
  const { setIsCreateDialogProductOpen } = useContext(DialogContext);

  const { setSelectedLot } = useContext(DpgfContext);

  const handleOpenCreateDialog = useCallback(() => {
    setIsCreateDialogProductOpen(true);
    setSelectedLot(lot);
  }, [lot, setIsCreateDialogProductOpen, setSelectedLot]);

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
        <ProductCreationDialog dialogTitle="Ajouter un nouveau poste" />

        <Tooltip title="Supprimer un lot">
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
      </Grid2>
    </Grid2>
  );
}
