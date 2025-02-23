import { Box, Typography } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput";
import { useContext } from "react";
import { UserAuthenticationDto } from "../../core/dtos/user/UserAuthenticationDto";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import SubmitButton from "../../components/buttons/SubmitButton";
import { UserContext } from "../../core/contexts/user-context";
import { TokenContext } from "../../core/contexts/token-context";
import {
  setTokensInCookies,
  setUserInLocalStorage,
} from "../../core/services/authentication-service";
import { AlertContext } from "../../core/contexts/alert-context";
import { FormValues, useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PageContainerSpace from "../../components/containers/PageContaineSpace";

export default function SignIn(): JSX.Element {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const { setIsAuthenticated, setAccessToken, setRefreshToken } =
    useContext(TokenContext);
  const { handleErrorAlert } = useContext(AlertContext);

  const initialFormValues: FormValues<UserAuthenticationDto> = {
    email: "",
    password: "",
  };

  const validate = (formData: FormValues<UserAuthenticationDto>) => {
    const errors: Partial<UserAuthenticationDto> = {};
    if (!formData.email) {
      errors.email = "L'email est requis";
    }
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    }
    return errors;
  };

  const onSubmit = async (formData: FormValues<UserAuthenticationDto>) => {
    try {
      const response = await fetch(apiEndpoints.SIGN_IN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const { accessToken, refreshToken, user } = await response.json();

      if (user) {
        setUserInLocalStorage(user);
        setTokensInCookies(accessToken, refreshToken);
        setIsAuthenticated(true);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);
      }

      navigate(pagesUrl.DASHBOARD_PAGE);
    } catch (error) {
      if (error instanceof Error) {
        handleErrorAlert(error);
      }
    }
  };

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <PageContainerSpace>
      <BackgroundImage />
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
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextInput
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
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
          <SubmitButton label="Se connecter" disabled={isSubmitting} />
        </Box>
      </form>
    </PageContainerSpace>
  );
}
