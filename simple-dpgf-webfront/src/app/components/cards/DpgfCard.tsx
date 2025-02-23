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
        minHeight: 180,
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transition douce
        "&:hover": {
          transform: "translateZ(10px)", // Déplacement vers l'avant (au-dessus du plan)
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Ombre pour l'effet de survol
        },
      }}
    >
      <CardContent
        onClick={onClick}
        sx={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TitleH3>{dpgf.name}</TitleH3>
          <ChipStatus label={dpgf.dpgfStatus} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>
            Total actuel : {dpgf.dpgfTotal.toFixed(2)} €
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Créé par : {dpgf.createdByUser}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Mise à jour le :{" "}
            {new Date(dpgf.lastModifiedDate).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
