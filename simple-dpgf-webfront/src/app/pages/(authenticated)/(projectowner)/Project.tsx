import { useContext } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import { Box } from "@mui/material";
import SelectStatusInput from "../../../components/inputs/SelectStatusInput";

export default function Project(): JSX.Element {
  const { dpgf } = useContext(DpgfContext);

  return (
    <PageContainer>
      <NavBar />
      {dpgf && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <TitleH2>{dpgf?.name}</TitleH2>
          <SelectStatusInput label={dpgf.dpgfStatus} />
        </Box>
      )}
    </PageContainer>
  );
}
