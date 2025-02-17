import { useCallback, useContext } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import { OrganizationContext } from "../../../core/contexts/organization-context";
import { Grid2, Typography } from "@mui/material";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import DpgfCard from "../../../components/cards/DpgfCard";
import { DpgfDto } from "../../../core/dtos/dpgf/DpgfDto";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../../core/appConstants";
import { resolveUrl } from "../../../core/services/http-service";

export default function ManagerProjects(): JSX.Element {
  const navigate = useNavigate();

  const { organization } = useContext(OrganizationContext);
  const { setDpgf, dpgfByOrganizationList, isDpgfByOrganizationListLoading } =
    useContext(DpgfContext);

  // TODO : naviguer vers page de résumé
  const navigateToDpgfSummary = useCallback(
    (dpgf: DpgfDto) => {
      setDpgf(dpgf);
      navigate(resolveUrl(pagesUrl.MOA_PROJECT, [dpgf.id]));
    },
    [navigate, setDpgf]
  );

  return (
    <>
      <NavBar />
      <PageContainer>
        <TitleH2>Gestion des projets</TitleH2>

        {isDpgfByOrganizationListLoading ? (
          <CircularLoadingPage />
        ) : (
          <Grid2 container spacing={2} sx={{ marginBottom: "20px" }}>
            {dpgfByOrganizationList.length === 0 ? (
              <Typography>Il n'y a pas encore de projets.</Typography>
            ) : (
              dpgfByOrganizationList.map((dpgf) => {
                return (
                  <Grid2 size={4} key={dpgf.id}>
                    <DpgfCard
                      dpgf={dpgf}
                      onClick={() => navigateToDpgfSummary(dpgf)}
                    />{" "}
                  </Grid2>
                );
              })
            )}
          </Grid2>
        )}

        <Typography sx={{ textAlign: "end" }}>
          Nombre de licenses projets consommées :{" "}
          {organization?.projectLicenseCounter} /{" "}
          {organization?.maxProjectLicenseCounter}
        </Typography>
      </PageContainer>
    </>
  );
}
