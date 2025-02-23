import { useCallback, useContext } from "react";
import NavigationButton from "../../../components/buttons/NavigationButton";
import PageContainer from "../../../components/containers/PageContainer";
import DpgfCreationDialog from "../../../components/modals/DpgfCreationDialog";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import { DialogContext } from "../../../core/contexts/dialog-context";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import { Grid2, Typography } from "@mui/material";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import DpgfCard from "../../../components/cards/DpgfCard";
import { useNavigate } from "react-router-dom";
import { resolveUrl } from "../../../core/services/http-service";
import { pagesUrl } from "../../../core/appConstants";
import { DpgfDto } from "../../../core/dtos/dpgf/DpgfDto";

export default function MoaProjects(): JSX.Element {
  const navigate = useNavigate();

  const { setIsCreateDialogOpen } = useContext(DialogContext);
  const { dpgfByUserList, isDpgfByUserListLoading } = useContext(DpgfContext);

  const navigateToDpgf = useCallback(
    (dpgf: DpgfDto) => {
      navigate(resolveUrl(pagesUrl.MOA_PROJECT, [dpgf.id]));
    },
    [navigate]
  );

  const handleOpenDpgfCreationDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, [setIsCreateDialogOpen]);

  return (
    <>
      <NavBar />
      <PageContainer>
        <TitleH2>Mes projets</TitleH2>

        {isDpgfByUserListLoading ? (
          <CircularLoadingPage />
        ) : (
          <Grid2 container spacing={2} sx={{ marginBottom: "20px" }}>
            {dpgfByUserList.length === 0 ? (
              <Typography>Vous n'avez pas encore de projets.</Typography>
            ) : (
              dpgfByUserList.map((dpgf) => {
                return (
                  <Grid2 size={4} key={dpgf.id}>
                    <DpgfCard
                      dpgf={dpgf}
                      onClick={() => navigateToDpgf(dpgf)}
                    />
                  </Grid2>
                );
              })
            )}
          </Grid2>
        )}

        <NavigationButton
          label="Créer un projet"
          onClick={handleOpenDpgfCreationDialog}
        />
        <DpgfCreationDialog dialogTitle="Créer un nouveau DPGF" />
      </PageContainer>
    </>
  );
}
