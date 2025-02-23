import { Box, Container, Grid2 } from "@mui/material";
import { pagesUrl } from "../core/appConstants";
import NavigationButton from "./buttons/NavigationButton";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.webp";
import { useCallback, useContext, useState } from "react";
import { TokenContext } from "../core/contexts/token-context";
import { UserContext } from "../core/contexts/user-context";
import { theme } from "../styles/theme";
import TitleH1 from "./typographies/TitleH1";

export default function Header() {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(TokenContext);
  const { logoutUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    await logoutUser();
    setIsLoading(false);
    navigate(pagesUrl.HOME_PAGE);
  }, [logoutUser, navigate]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingY: 1,
        backgroundColor: theme.palette.background.paper,
        border: "solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
        boxShadow: "0px 10px 12px rgba(0, 0, 0, 0.5)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Link to={isAuthenticated ? pagesUrl.DASHBOARD_PAGE : "/"}>
          <img
            style={{
              width: 50,
              borderRadius: "50%",
              boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.5)",
            }}
            src={Logo}
            alt="Logo de Simple DPGF"
          />
        </Link>
        <TitleH1>Simple DPGF</TitleH1>
      </Box>

      {isAuthenticated ? (
        <Grid2 size={6}>
          <NavigationButton
            label="Déconnexion"
            onClick={handleLogout}
            loading={isLoading}
          />
        </Grid2>
      ) : (
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <NavigationButton
              label="Inscription"
              path={pagesUrl.SIGN_UP_PAGE}
            />
          </Grid2>
          <Grid2 size={6}>
            <NavigationButton label="Connexion" path={pagesUrl.SIGN_IN_PAGE} />
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
}
