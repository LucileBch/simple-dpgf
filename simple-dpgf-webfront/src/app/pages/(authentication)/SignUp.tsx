import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { UserCreationDto } from "../../core/dtos/user/UserCreationDto";
import axios from "axios";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { OrganizationTypeEnum } from "../../core/enums/OrganizationTypeEnum";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState<UserCreationDto>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organization: { organizationType: OrganizationTypeEnum.MOA, name: "" },
  });

  //const [errorMessage, setErrorMessage] = useState({});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "organizationType" || name === "name") {
      setFormData({
        ...formData,
        organization: {
          ...formData.organization,
          [name]: value, // Mise à jour de l'objet `organizationCreationDto`
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Mise à jour des autres champs
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
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h1">Créer votre compte</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          name="organizationType"
          value={formData.organization.organizationType}
          onChange={handleChange}
        />
        <input
          name="name"
          value={formData.organization.name}
          onChange={handleChange}
        />
        <input name="email" value={formData.email} onChange={handleChange} />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Valider</button>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            p: 1,
          }}
        >
          <TextInput fieldName="Prénom" label="Prénom" required />
          <TextInput fieldName="Nom" label="Nom" required />
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
            fieldName="Organisation"
            label="Organisation"
            required
            disabled={false}
          />
          <TextInput
            fieldName="Type d'Organisation"
            label="Type d'Organisation"
            defaultValue="Maîtrise d'Ouvrage"
            disabled
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            pt: 1,
            pb: 4,
          }}
        >
          <TextInput fieldName="Email" label="Email" required />
          <TextInput
            required
            fieldName="Mot de Passe"
            label="Mot de passe"
            type="password"
          />
        </Box> */}

        {/* <ValidationButton
          label={isSubmitting ? "Envoi..." : "Valider"}
          disabled={isSubmitting}
          onClick={handleSubmit}
        ></ValidationButton> */}
      </form>
    </Container>
  );
}
