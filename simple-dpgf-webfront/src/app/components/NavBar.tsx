import { Box, Container, Grid2 } from "@mui/material";
import NavigationButton from "./buttons/NavigationButton";
import { pagesUrl } from "../core/appConstants";
import { useCallback, useContext } from "react";
import { UserContext } from "../core/contexts/user-context";
import { RoleEnum } from "../core/enums/RoleEnum";
import TitleH1 from "./typographies/TitleH1";
import { useNavigate } from "react-router-dom";
import { resolveUrl } from "../core/services/http-service";

export default function NavBar(): JSX.Element {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const navigateToProfilePage = useCallback(() => {
    if (user !== undefined) {
      navigate(resolveUrl(pagesUrl.USER_PROFILE_PAGE, [user.id]));
    } else {
      console.log("aucun user");
    }
  }, [navigate, user]);

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
      {user?.role === RoleEnum.ADMIN && (
        <Grid2
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid2>
            <NavigationButton
              label="Organisations"
              path={pagesUrl.DASHBOARD_PAGE}
            />
          </Grid2>
          <Grid2>
            <NavigationButton
              label="Mon profil"
              onClick={navigateToProfilePage}
            />
          </Grid2>
        </Grid2>
      )}
      {user?.role === RoleEnum.ORGANIZATION_MANAGER && (
        <Grid2
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid2>
            <NavigationButton label="Projets" path={pagesUrl.DASHBOARD_PAGE} />
          </Grid2>
          <Grid2>
            <NavigationButton
              label="Equipe"
              path={pagesUrl.MOA_MANAGER_TEAM_PAGE}
            />
          </Grid2>
          <Grid2>
            <NavigationButton
              label="Mon profil"
              onClick={navigateToProfilePage}
            />
          </Grid2>
        </Grid2>
      )}
      {user?.role === RoleEnum.PROJECT_OWNER && (
        <Grid2 container spacing={2}>
          <Grid2>
            <NavigationButton
              label="ProjectOWner"
              path={pagesUrl.DASHBOARD_PAGE}
            />
          </Grid2>
          <Grid2>
            <NavigationButton
              label="Mon profil"
              onClick={navigateToProfilePage}
            />
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
}
