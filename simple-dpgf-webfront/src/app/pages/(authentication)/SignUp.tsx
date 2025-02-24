import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserCreationDto } from "../../core/dtos/user/UserCreationDto";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { OrganizationTypeEnum } from "../../core/enums/OrganizationTypeEnum";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import PageContainer from "../../components/containers/PageContainer";
import { AlertContext } from "../../core/contexts/alert-context";
import { FormValues, useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PasswordRules from "../../components/rules/passwordRules";

export default function SignUp(): React.JSX.Element {
  const navigate = useNavigate();

  const { handleErrorAlert } = useContext(AlertContext);

  const initialFormValues: FormValues<UserCreationDto> = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organization: { organizationType: OrganizationTypeEnum.MOA, name: "" },
  };

  const validate = (formData: FormValues<UserCreationDto>) => {
    const errors: Record<string, string | undefined> = {};
    if (!formData.firstName) {
      errors.firstName = "Le prénom est requis";
    }
    if (!formData.lastName) {
      errors.lastName = "Le nom est requis";
    }
    if (!formData.email) {
      errors.email = "L'email est requis";
    }
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    }
    if (!formData.organization.organizationType) {
      errors["organization.organizationType"] =
        "Le type de l'organisation est requis";
    }
    if (!formData.organization.name) {
      errors["organization.name"] = "Le nom de l'organisation est requis";
    }

    return errors;
  };

  const onSubmit = async (formData: FormValues<UserCreationDto>) => {
    try {
      const response = await fetch(apiEndpoints.SIGN_UP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log("response not ok", errorMessage);
        throw new Error(errorMessage);
      }

      navigate(pagesUrl.ACCOUNT_VALIDATION_PAGE);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        console.log("ici", error);
        handleErrorAlert(error);
      }
    }
  };

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <PageContainer>
      <BackgroundImage />
      <Box sx={{ textAlign: "center", p: 1 }}>
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
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextInput
            id="lastName"
            name="lastName"
            type="text"
            label="Nom"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
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
            name="organization.organizationType"
            type="text"
            label="Type d'organisation"
            disabled
            value={OrganizationTypeEnum.MOA}
            error={!!errors["organization.organizationType"]}
            helperText={errors["organization.organizationType"]}
          />

          <TextInput
            id="name"
            name="organization.name"
            type="text"
            label="Nom de l'organisation"
            value={formData.organization.name}
            onChange={handleChange}
            error={!!errors["organization.name"]}
            helperText={errors["organization.name"]}
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

        <PasswordRules />

        <SubmitButton label="S'inscrire" disabled={isSubmitting} />
      </form>
    </PageContainer>
  );
}
