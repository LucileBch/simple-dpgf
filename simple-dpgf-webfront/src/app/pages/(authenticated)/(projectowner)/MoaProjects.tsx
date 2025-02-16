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

export default function MoaProjects(): JSX.Element {
  const { setIsCreateDialogOpen } = useContext(DialogContext);
  const { dpgfList, isDpgfListLoading } = useContext(DpgfContext);

  const handleOpenDpgfCreationDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, [setIsCreateDialogOpen]);

  return (
    <PageContainer>
      <NavBar />
      <TitleH2>Mes projets</TitleH2>
      {/* au click sur un projet => page de SYNTHESE d'un projet avec bouton "modifier" qui renvoie à la page de modif du projet*/}

      {isDpgfListLoading ? (
        <CircularLoadingPage />
      ) : (
        <Grid2 container spacing={2} sx={{ marginBottom: "20px" }}>
          {dpgfList.length === 0 ? (
            <Typography>Vous n'avez pas encore de projets.</Typography>
          ) : (
            dpgfList.map((dpgf) => {
              return (
                <Grid2 size={4} key={dpgf.id}>
                  <DpgfCard dpgf={dpgf} />
                </Grid2>
              );
            })
          )}
        </Grid2>
      )}

      {/* FAIRE une modale pour rentre les premières infos projet puis naviguer à la page du projet */}
      <NavigationButton
        label="Créer un projet"
        onClick={handleOpenDpgfCreationDialog}
      />
      <DpgfCreationDialog dialogTitle="Créer un nouveau DPGF" />
    </PageContainer>
  );
}
