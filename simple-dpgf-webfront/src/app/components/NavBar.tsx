import { Box, Container, Grid2 } from "@mui/material";
import NavigationButton from "./buttons/NavigationButton";
import { pagesUrl } from "../core/appConstants";
import { useContext } from "react";
import { UserContext } from "../core/contexts/user-context";
import { RoleEnum } from "../core/enums/RoleEnum";
import TitleH1 from "./typographies/TitleH1";

export default function NavBar(): JSX.Element {
  const { user } = useContext(UserContext);

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
              path={pagesUrl.ADMIN_ORGANIZATIONS_PAGE}
            />
          </Grid2>
          <Grid2>
            <NavigationButton
              label="Mon profil"
              path={pagesUrl.USER_PROFILE_PAGE}
            />
          </Grid2>
        </Grid2>
      )}
      {user?.role === RoleEnum.ORGANIZATION_MANAGER && (
        <Grid2 container spacing={2}>
          <Grid2>
            <NavigationButton label="Manager" path={pagesUrl.DASHBOARD_PAGE} />
          </Grid2>
          <Grid2>
            <NavigationButton
              label="Mon profil"
              path={pagesUrl.DASHBOARD_PAGE}
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
              path={pagesUrl.DASHBOARD_PAGE}
            />
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
}
