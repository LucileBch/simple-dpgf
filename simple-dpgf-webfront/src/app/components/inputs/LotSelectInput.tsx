import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback } from "react";
import { LotEnum, lotNameToLabel } from "../../core/enums/LotEnum";

interface IProps {
  selectedLot: LotEnum | null;
  setSelectedLot: (value: LotEnum | null) => void;
}

export default function LotSelectInput({
  selectedLot,
  setSelectedLot,
}: Readonly<IProps>): JSX.Element {
  const handleChange = useCallback(
    async (event: SelectChangeEvent<string>) => {
      const newSelectedLot =
        event.target.value === "" ? null : (event.target.value as LotEnum);

      setSelectedLot(newSelectedLot);
    },
    [setSelectedLot]
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="lot-select-input">Lot</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="lot-select-input"
        value={selectedLot || ""}
        label="Lot"
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="">
          <em>Aucune </em>
        </MenuItem>
        <MenuItem value={LotEnum.VRD_1}>
          {lotNameToLabel(LotEnum.VRD_1)}
        </MenuItem>
        <MenuItem value={LotEnum.FONDATION_2}>
          {lotNameToLabel(LotEnum.FONDATION_2)}
        </MenuItem>
        <MenuItem value={LotEnum.SUPERSTRUCTURE_3}>
          {lotNameToLabel(LotEnum.SUPERSTRUCTURE_3)}
        </MenuItem>
        <MenuItem value={LotEnum.CHARPENTE_4}>
          {lotNameToLabel(LotEnum.CHARPENTE_4)}
        </MenuItem>
        <MenuItem value={LotEnum.CLOISONNEMENT_5}>
          {lotNameToLabel(LotEnum.CLOISONNEMENT_5)}
        </MenuItem>
        <MenuItem value={LotEnum.FACADE_6}>
          {lotNameToLabel(LotEnum.FACADE_6)}
        </MenuItem>
        <MenuItem value={LotEnum.REVETEMENT_7}>
          {lotNameToLabel(LotEnum.REVETEMENT_7)}
        </MenuItem>
        <MenuItem value={LotEnum.CVC_8}>
          {lotNameToLabel(LotEnum.CVC_8)}
        </MenuItem>
        <MenuItem value={LotEnum.SANITAIRES_9}>
          {lotNameToLabel(LotEnum.SANITAIRES_9)}
        </MenuItem>
        <MenuItem value={LotEnum.CFO_10}>
          {lotNameToLabel(LotEnum.CFO_10)}
        </MenuItem>
        <MenuItem value={LotEnum.CFA_11}>
          {lotNameToLabel(LotEnum.CFA_11)}
        </MenuItem>
        <MenuItem value={LotEnum.ELEVATEUR_12}>
          {lotNameToLabel(LotEnum.ELEVATEUR_12)}
        </MenuItem>
        <MenuItem value={LotEnum.PRODUCTION_ELECTRICITE_13}>
          {lotNameToLabel(LotEnum.PRODUCTION_ELECTRICITE_13)}
        </MenuItem>
        <MenuItem value={LotEnum.ENERGIE}>
          {lotNameToLabel(LotEnum.ENERGIE)}
        </MenuItem>
        <MenuItem value={LotEnum.AUTRE}>
          {lotNameToLabel(LotEnum.AUTRE)}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
