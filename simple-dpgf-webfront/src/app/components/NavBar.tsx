import { Box, Container, Grid2 } from "@mui/material";
import NavigationButton from "./buttons/NavigationButton";
import { pagesUrl } from "../core/appConstants";
import { useCallback, useContext } from "react";
import { UserContext } from "../core/contexts/user-context";
import { RoleEnum } from "../core/enums/RoleEnum";
import TitleH1 from "./typographies/TitleH1";
import { useNavigate } from "react-router-dom";
import { resolveUrl } from "../core/services/http-service";
import { OrganizationContext } from "../core/contexts/organization-context";
import { AlertContext } from "../core/contexts/alert-context";

export default function NavBar(): JSX.Element {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { organization } = useContext(OrganizationContext);
  const { handleErrorAlert } = useContext(AlertContext);

  const navigateToProfilePage = useCallback(() => {
    if (user !== undefined) {
      navigate(resolveUrl(pagesUrl.USER_PROFILE_PAGE, [user.id]));
    } else {
      console.log("aucun user");
    }
  }, [navigate, user]);

  const navigateToTeamPage = useCallback(() => {
    if (organization != undefined) {
      navigate(resolveUrl(pagesUrl.MOA_MANAGER_TEAM_PAGE, [organization.id]));
    } else {
      handleErrorAlert("Vous devez appartenir à une organisation valide");
    }
  }, [handleErrorAlert, navigate, organization]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "cyan",
      }}
    >
      <Box>
        <TitleH1>Tableau de bord</TitleH1>
      </Box>
      <Grid2
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {user?.role === RoleEnum.ADMIN && (
          <>
            <Grid2>
              <NavigationButton
                label="Organisations"
                path={pagesUrl.ADMIN_ORGANIZATIONS_PAGE}
              />
            </Grid2>
          </>
        )}

        {user?.role === RoleEnum.ORGANIZATION_MANAGER && (
          <>
            <Grid2>
              <NavigationButton
                label="Projets"
                path={pagesUrl.MOA_MANAGER_PROJECTS_PAGE}
              />
            </Grid2>
            <Grid2>
              <NavigationButton label="Equipe" onClick={navigateToTeamPage} />
            </Grid2>
          </>
        )}

        {user?.role === RoleEnum.PROJECT_OWNER && (
          <Grid2>
            <NavigationButton
              label="Projets"
              path={pagesUrl.MOA_PROJECTS_PAGE}
            />
          </Grid2>
        )}

        <Grid2>
          <NavigationButton
            label="Mon profil"
            onClick={navigateToProfilePage}
          />
        </Grid2>
      </Grid2>
    </Container>
  );
}
