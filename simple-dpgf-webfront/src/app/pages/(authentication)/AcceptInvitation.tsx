import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import SubmitButton from "../../components/buttons/SubmitButton";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { TextInput } from "../../components/inputs/TextInput";
import { FormValues, useForm } from "../../core/hooks/use-form";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertContext } from "../../core/contexts/alert-context";
import { UserInvitedDto } from "../../core/dtos/user/UserInvitedDto";
import { resolveUrl } from "../../core/services/http-service";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PageContainerSpace from "../../components/containers/PageContainerSpace";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AcceptInvitation(): React.JSX.Element {
  const navigate = useNavigate();

  const { handleErrorAlert } = useContext(AlertContext);

  const [searchParams] = useSearchParams();
  const [invitationToken, setInvitationToken] = useState<string | undefined>(
    undefined
  );

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleDisplayPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialFormValues: FormValues<UserInvitedDto> = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validate = (formData: FormValues<UserInvitedDto>) => {
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

    return errors;
  };

  const onSubmit = async (formData: FormValues<UserInvitedDto>) => {
    try {
      const response = await fetch(
        resolveUrl(apiEndpoints.ACCEPT_INVITATION, [], {
          invitationToken: invitationToken,
        }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      navigate(pagesUrl.ACCOUNT_VALIDATION_PAGE);
    } catch (error) {
      if (error instanceof Error) {
        handleErrorAlert(error);
      }
    }
  };

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  useEffect(() => {
    const tokenParams = searchParams.get("invitationToken");

    if (tokenParams) {
      setInvitationToken(tokenParams);
      console.log("Token d'invitation :", tokenParams);
    }
  }, [searchParams]);

  if (!invitationToken) {
    return <div>Token d'invitation non trouvé.</div>;
  }

  return (
    <PageContainerSpace>
      <BackgroundImage />
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
            type={showPassword ? "text" : "password"}
            label="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleDisplayPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <SubmitButton label="S'inscrire" disabled={isSubmitting} />
      </form>
    </PageContainerSpace>
  );
}
