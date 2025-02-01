import { Box, Typography } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput";
import { useContext, useState } from "react";
import { UserAuthenticationDto } from "../../core/dtos/user/UserAuthenticationDto";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import axios from "axios";
import SubmitButton from "../../components/buttons/SubmitButton";
import { getErrorMessage } from "../../core/utils/error-handler";
import AlertSnack from "../../components/alert/AlertSnack";
import { UserContext } from "../../core/contexts/user-context";
import { setTokensInCookies } from "../../core/services/authentication-service";
import { TokenContext } from "../../core/contexts/token-context";
import PageContainer from "../../components/containers/PageContainer";

export default function SignIn() {
  const { user, getCurrentUserConnexion } = useContext(UserContext);
  const { setIsAuthenticated } = useContext(TokenContext);

  const [formData, setFormData] = useState<UserAuthenticationDto>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(apiEndpoints.SIGN_IN, formData);
      console.log("connexion reussi");
      console.log("response", data);

      const { accessToken, refreshToken } = data;
      setTokensInCookies(accessToken, refreshToken);

      getCurrentUserConnexion();
      setIsAuthenticated(true);
      console.log("user form context", user);

      navigate(pagesUrl.DASHBOARD_PAGE);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(getErrorMessage(error.response.data));
        setOpenAlert(true);
      }

      setIsAuthenticated(false);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <PageContainer>
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h1">Se connecter</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            p: 1,
          }}
        >
          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            onChange={handleChange}
          />
          <TextInput
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            required
            onChange={handleChange}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
            gap: 2,
          }}
        >
          <Link to={pagesUrl.FORGOT_PASSWORD}>Mot de passe oublié</Link>
          <SubmitButton label="Se connecter" />
        </Box>
      </form>

      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity="error"
        errorMessage={errorMessage}
      />
    </PageContainer>
  );
}
