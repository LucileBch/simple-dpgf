import { Box, Card, CardContent, Typography } from "@mui/material";
import { DpgfDto } from "../../core/dtos/dpgf/DpgfDto";
import TitleH3 from "../typographies/TitleH3";
import ChipStatus from "../info/ChipStatus";

interface IProps {
  dpgf: DpgfDto;
  onClick?(): void;
}

export default function DpgfCard({
  dpgf,
  onClick,
}: Readonly<IProps>): JSX.Element {
  return (
    <Card
      sx={{
        maxWidth: 275,
        minHeight: 130,
      }}
    >
      <CardContent onClick={onClick} sx={{ cursor: "pointer" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TitleH3>{dpgf.name}</TitleH3>
          <ChipStatus label={dpgf.dpgfStatus} />
        </Box>
        <Typography>Créé par : {dpgf.createdByUser}</Typography>
        <Typography>
          Mise à jour le :{" "}
          {new Date(dpgf.lastModifiedDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
