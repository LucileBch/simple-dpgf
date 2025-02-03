import { Box, Typography } from "@mui/material";
import SubmitButton from "../../components/buttons/SubmitButton";
import { TextInput } from "../../components/inputs/TextInput";
import axios from "axios";
import { getErrorMessage } from "../../core/utils/error-handler";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import AlertSnack from "../../components/alert/AlertSnack";
import { UserUpdatePasswordDto } from "../../core/dtos/user/UserUpdatePasswordDto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCodeRequestDto } from "../../core/dtos/user/UserCodeRequestDto";
import PageContainer from "../../components/containers/PageContainer";

//TODO: l'email reste affiché alors qu'il est vide

export default function ForgotPassord(): JSX.Element {
  const [email, setEmail] = useState<UserCodeRequestDto>({
    email: "",
  });

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const [formData, setFormData] = useState<UserUpdatePasswordDto>({
    email: "",
    activationCode: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(apiEndpoints.REQUEST_NEW_PASSWORD_CODE, email);
      setIsEmailSent(!isEmailSent);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(getErrorMessage(error.response.data));
        setOpenAlert(true);
      }
    }
  };

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
      await axios.post(apiEndpoints.FORGOT_PASSWORD, formData);
      navigate(pagesUrl.SIGN_IN_PAGE);
      setIsEmailSent(!isEmailSent);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(getErrorMessage(error.response.data));
        setOpenAlert(true);
      }
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <PageContainer>
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h1">
          {!isEmailSent
            ? "Un code va vous être envoyé."
            : "Réinitialisez votre mot de passe"}
        </Typography>
      </Box>

      {!isEmailSent ? (
        <form onSubmit={handleSubmitEmail}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              onChange={handleChangeEmail}
            />
          </Box>

          <SubmitButton label="Valider" />
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              id="activationCode"
              name="activationCode"
              type="text"
              label="Code d'activation"
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

          <SubmitButton label="Valider" />
        </form>
      )}

      {/* <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h1">Créez votre nouveau mot de passe.</Typography>
      </Box> */}

      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity="error"
        message={errorMessage}
      />
    </PageContainer>
  );
}
