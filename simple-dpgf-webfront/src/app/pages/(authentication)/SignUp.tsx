import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { UserCreationDto } from "../../core/dtos/user/UserCreationDto";
import axios from "axios";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { OrganizationTypeEnum } from "../../core/enums/OrganizationTypeEnum";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import AlertSnack from "../../components/alert/AlertSnack";
import { getErrorMessage } from "../../core/utils/error-handler";

export default function SignIn() {
  const [formData, setFormData] = useState<UserCreationDto>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organization: { organizationType: OrganizationTypeEnum.MOA, name: "" },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "organizationType" || name === "name") {
      setFormData({
        ...formData,
        organization: {
          ...formData.organization,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(apiEndpoints.SIGN_UP, formData);
      navigate(pagesUrl.ACCOUNT_VALIDATION_PAGE);
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
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h1">Créer votre compte</Typography>
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
            id="firstName"
            name="firstName"
            type="text"
            label="Prénom"
            required
            onChange={handleChange}
          />
          <TextInput
            id="lastName"
            name="lastName"
            type="text"
            label="Nom"
            required
            onChange={handleChange}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            p: 1,
          }}
        >
          <TextInput
            id="organizationType"
            name="organizationType"
            type="text"
            label="Type d'organisation"
            required
            onChange={handleChange}
          />
          <TextInput
            id="name"
            name="name"
            type="text"
            label="Nom de l'organisation"
            required
            onChange={handleChange}
          />
        </Box>

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
        <SubmitButton label="S'inscrire" />
      </form>

      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity="error"
        errorMessage={errorMessage}
      />
    </Container>
  );
}
