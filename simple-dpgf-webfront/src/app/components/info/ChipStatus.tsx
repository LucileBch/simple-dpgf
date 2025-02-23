import { Chip } from "@mui/material";
import {
  DpgfStatusEnum,
  dpgfStatusToLabel,
} from "../../core/enums/DpgfStatusEnum";
import { theme } from "../../styles/theme";
import React from "react";

interface IProps {
  label: DpgfStatusEnum;
}

export default function ChipStatus({ label }: Readonly<IProps>): JSX.Element {
  const getColorFromLabel = (label: DpgfStatusEnum): React.CSSProperties => {
    switch (label) {
      case DpgfStatusEnum.IN_PROGRESS:
        return { backgroundColor: theme.palette.secondary.main };
      case DpgfStatusEnum.DONE:
        return { backgroundColor: theme.palette.success.contrastText };
      case DpgfStatusEnum.ARCHIVED:
        return { backgroundColor: theme.palette.error.contrastText };
      case DpgfStatusEnum.DELETED:
        return { backgroundColor: theme.palette.error.main };
      default:
        return { backgroundColor: theme.palette.background.paper };
    }
  };

  return (
    <Chip
      label={dpgfStatusToLabel(label)}
      sx={{
        ...getColorFromLabel(label),
        color: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        fontWeight: "bold",
      }}
    />
  );
}
