import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { theme } from "../../styles/theme";
import { LotDto } from "../../core/dtos/lot/LotDto";

interface IProps {
  dialogTitle: string;
  dialogContent?: string;
  selectedLot: LotDto;
  setSelectedLot: Dispatch<SetStateAction<LotDto | undefined>>;
}

export default function DeleteLotDialog({
  dialogTitle,
  dialogContent,
  selectedLot,
  setSelectedLot,
}: Readonly<IProps>): JSX.Element {
  const {
    isDeleteDialogOpen,
    isSubmitting,
    setOpenAlert,
    setAlertMessage,
    setIsDeleteDialogOpen,
  } = useContext(DialogContext);
  const {
    deleteLotAndAssociatedProducts,
    setProductList,
    productList,
    setLotList,
    setDpgf,
    dpgf,
  } = useContext(DpgfContext);

  const handleCancelAndClose = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setSelectedLot(undefined);
  }, [setIsDeleteDialogOpen, setSelectedLot]);

  const handleSubmitAndClose = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    if (!dpgf) {
      setAlertMessage("Erreur : Dpgf non reconnu");
      return;
    }

    await deleteLotAndAssociatedProducts(dpgf.id, selectedLot.id);
    setAlertMessage("Lot supprimé");

    const productPricesToRemove = productList?.filter(
      (product) => product.lotCode !== selectedLot.code
    );
    const newDpgfTotal =
      productPricesToRemove?.reduce(
        (acc, product) => acc + product.totalPrice,
        0
      ) ?? 0;
    setDpgf((prev) => {
      if (prev) {
        return { ...prev, dpgfTotal: newDpgfTotal };
      }
      return prev;
    });

    setLotList((prev) =>
      prev?.filter((lotToDelete) => lotToDelete.id !== selectedLot.id)
    );
    setProductList((prev) =>
      prev?.filter((product) => product.lotCode !== selectedLot.code)
    );

    setAlertMessage(null);
    setOpenAlert(false);
    setIsDeleteDialogOpen(false);
    setSelectedLot(undefined);
  }, [
    isSubmitting,
    dpgf,
    deleteLotAndAssociatedProducts,
    selectedLot.id,
    selectedLot.code,
    setAlertMessage,
    productList,
    setDpgf,
    setLotList,
    setProductList,
    setOpenAlert,
    setIsDeleteDialogOpen,
    setSelectedLot,
  ]);

  return (
    <Dialog open={isDeleteDialogOpen} onClose={handleCancelAndClose}>
      <DialogTitle sx={{ textAlign: "center" }}>{dialogTitle}</DialogTitle>
      <DialogContentText sx={{ textAlign: "center", marginBottom: "10px" }}>
        {dialogContent}
      </DialogContentText>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}
      >
        <CheckIcon
          onClick={handleSubmitAndClose}
          sx={{
            fontSize: "30px",
            color: theme.palette.primary.main,
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <CloseIcon
          onClick={handleCancelAndClose}
          sx={{
            fontSize: "30px",
            color: theme.palette.error.main,
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </DialogActions>
    </Dialog>
  );
}
