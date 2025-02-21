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

  const { isCreateDialogOpen, setIsCreateDialogOpen } =
    useContext(DialogContext);
  const { setDpgf, dpgfByUserList, isDpgfByUserListLoading } =
    useContext(DpgfContext);

  const navigateToDpgf = useCallback(
    (dpgf: DpgfDto) => {
      setDpgf(dpgf);
      navigate(resolveUrl(pagesUrl.MOA_PROJECT, [dpgf.id]));
    },
    [navigate, setDpgf]
  );

  const handleOpenDpgfCreationDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, [setIsCreateDialogOpen]);

  console.log("modal", isCreateDialogOpen);

  return (
    <>
      <NavBar />
      <PageContainer>
        <TitleH2>Mes projets</TitleH2>
        {/* au click sur un projet => page de SYNTHESE d'un projet avec bouton "modifier" qui renvoie à la page de modif du projet*/}

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
