import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  DpgfStatusEnum,
  dpgfStatusToLabel,
} from "../../core/enums/DpgfStatusEnum";
import { useCallback, useContext, useState } from "react";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../core/contexts/alert-context";
import { pagesUrl } from "../../core/appConstants";

interface IProps {
  label: DpgfStatusEnum;
}

export default function StatusSelectInput({
  label,
}: Readonly<IProps>): JSX.Element {
  const { dpgfId } = useParams();

  const navigate = useNavigate();

  const [status, setStatus] = useState<DpgfStatusEnum>(label);

  const { updateDpgfStatus, deleteDpgf } = useContext(DpgfContext);
  const { handleSuccessAlert, handleErrorAlert } = useContext(AlertContext);

  const handleChange = useCallback(
    async (event: SelectChangeEvent<string>) => {
      const newStatus = event.target.value as DpgfStatusEnum;
      console.log("New status selected:", newStatus, dpgfId);
      if (!dpgfId) {
        handleErrorAlert("Dpgf non reconnu");
        return;
      }

      if (newStatus === DpgfStatusEnum.DELETED) {
        await deleteDpgf(dpgfId);

        handleSuccessAlert("Dpgf supprimé");
        navigate(pagesUrl.MOA_PROJECTS_PAGE);
      } else {
        await updateDpgfStatus(dpgfId, newStatus);

        handleSuccessAlert("Status du projet mis à jour");
        setStatus(newStatus);
      }
    },
    [
      deleteDpgf,
      dpgfId,
      handleErrorAlert,
      handleSuccessAlert,
      navigate,
      updateDpgfStatus,
    ]
  );

  return (
    <FormControl>
      <InputLabel id="select-status-input">Statut</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="Statut"
        onChange={handleChange}
        sx={{
          "& .MuiSelect-select": {
            padding: "8px 16px",
          },
        }}
      >
        <MenuItem value={DpgfStatusEnum.IN_PROGRESS}>
          {dpgfStatusToLabel(DpgfStatusEnum.IN_PROGRESS)}
        </MenuItem>
        <MenuItem value={DpgfStatusEnum.DONE}>
          {dpgfStatusToLabel(DpgfStatusEnum.DONE)}
        </MenuItem>
        <MenuItem value={DpgfStatusEnum.ARCHIVED}>
          {dpgfStatusToLabel(DpgfStatusEnum.ARCHIVED)}
        </MenuItem>
        <MenuItem value={DpgfStatusEnum.DELETED}>
          {dpgfStatusToLabel(DpgfStatusEnum.DELETED)}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
