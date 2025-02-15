import { Box, Container, Grid2, Typography } from "@mui/material";
import { pagesUrl } from "../core/appConstants";
import ContainedButton from "./buttons/NavigationButton";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.webp";
import { useCallback, useContext, useState } from "react";
import { TokenContext } from "../core/contexts/token-context";
import { UserContext } from "../core/contexts/user-context";
import { getUserFromLocalStorage } from "../core/services/authentication-service";

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

  console.log("getlocalstorage", getUserFromLocalStorage());

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        backgroundColor: "lightgray",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Link to="/">
          {/* TODO: resize image */}
          <img style={{ width: 40 }} src={Logo} alt="Logo de Simple DPGF" />
        </Link>
        <Typography variant="h1">Simple DPGF</Typography>
      </Box>

      {isAuthenticated ? (
        <Grid2 size={6}>
          <ContainedButton
            label="Déconnexion"
            onClick={handleLogout}
            loading={isLoading}
          />
        </Grid2>
      ) : (
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <ContainedButton label="Inscription" path={pagesUrl.SIGN_UP_PAGE} />
          </Grid2>
          <Grid2 size={6}>
            <ContainedButton label="Connexion" path={pagesUrl.SIGN_IN_PAGE} />
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
}
