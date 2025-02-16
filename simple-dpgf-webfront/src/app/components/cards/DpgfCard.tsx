import { Box, Card, CardContent, Typography } from "@mui/material";
import { DpgfDto } from "../../core/dtos/dpgf/DpgfDto";
import TitleH3 from "../typographies/TitleH3";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DpgfContext } from "../../core/contexts/dpgf-context";
import { resolveUrl } from "../../core/services/http-service";
import { pagesUrl } from "../../core/appConstants";
import ChipStatus from "../info/ChipStatus";

interface IProps {
  dpgf: DpgfDto;
}

export default function DpgfCard({ dpgf }: Readonly<IProps>): JSX.Element {
  const navigate = useNavigate();

  const { setDpgf } = useContext(DpgfContext);

  const navigateToDpgf = useCallback(() => {
    setDpgf(dpgf);
    navigate(resolveUrl(pagesUrl.MOA_PROJECT, [dpgf.id]));
  }, [dpgf, navigate, setDpgf]);

  return (
    <Card
      sx={{
        maxWidth: 275,
        minHeight: 130,
      }}
    >
      <CardContent onClick={navigateToDpgf} sx={{ cursor: "pointer" }}>
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
