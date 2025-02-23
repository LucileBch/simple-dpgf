import SubmitButton from "../../components/buttons/SubmitButton";
import PageContainer from "../../components/containers/PageContainer";
import { TextInput } from "../../components/inputs/TextInput";
import NavBar from "../../components/navbar/NavBar";
import { Box, Typography } from "@mui/material";
import { useCallback, useContext } from "react";
import { FormValues, useForm } from "../../core/hooks/use-form";
import { UserProfileUpdateDto } from "../../core/dtos/user/UserProfileUpdateDto";
import { UserContext } from "../../core/contexts/user-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { useUser } from "../../core/hooks/use-user";
import { UserDetailsDto } from "../../core/dtos/user/UserDetailsDto";
import {
  removeCookies,
  removeUserFromLocalStorage,
  setTokensInCookies,
  setUserInLocalStorage,
} from "../../core/services/authentication-service";
import { TokenContext } from "../../core/contexts/token-context";
import PasswordRules from "../../components/rules/passwordRules";

export default function UserProfile(): JSX.Element {
  const { user, setUser } = useContext(UserContext);
  const { handleErrorAlert, handleSuccessAlert } = useContext(AlertContext);
  const { setAccessToken, setRefreshToken } = useContext(TokenContext);

  const { updateUserProfile } = useUser();

  const initialFormValues: FormValues<UserProfileUpdateDto> = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
  };

  const validate = (formData: FormValues<UserProfileUpdateDto>) => {
    const errors: Partial<UserProfileUpdateDto> = {};
    if (!formData.firstName) {
      errors.firstName = "Le prénom est requis";
    }
    if (!formData.lastName) {
      errors.lastName = "Le nom est requis";
    }
    if (!formData.email) {
      errors.email = "L'email est requis";
    }
    if (!formData.oldPassword) {
      errors.oldPassword = "L'ancien mot de passe est requis";
    }

    return errors;
  };

  const onSubmit = useCallback(
    async (userUpdateProfileDto: UserProfileUpdateDto) => {
      if (!user) {
        handleErrorAlert("Identifiant utilisateur invalide");
        return;
      }

      const updatedUser = await updateUserProfile(
        user.id,
        userUpdateProfileDto
      );

      const userDetailsDto: UserDetailsDto = {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
      };
      setUser(userDetailsDto);

      removeUserFromLocalStorage();
      setUserInLocalStorage(userDetailsDto);

      if (updatedUser.accessToken && updatedUser.refreshToken) {
        removeCookies();
        setAccessToken(updatedUser.accessToken);
        setRefreshToken(updatedUser.refreshToken);
        setTokensInCookies(updatedUser.accessToken, updatedUser.refreshToken);
      }

      handleSuccessAlert("Vos informations ont bien été mises à jour.");
    },
    [
      handleErrorAlert,
      handleSuccessAlert,
      setAccessToken,
      setRefreshToken,
      setUser,
      updateUserProfile,
      user,
    ]
  );

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <>
      <NavBar />
      <PageContainer>
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h1">Modifier mes informations :</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              pb: 3,
            }}
          >
            <TextInput
              id="firstName"
              name="firstName"
              type="text"
              label="Modifier mon prénom"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextInput
              id="lastName"
              name="lastName"
              type="text"
              label="Modifier mon nom"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <TextInput
              id="email"
              name="email"
              type="email"
              label="Modifier mon email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextInput
              id="oldPassword"
              name="oldPassword"
              type="password"
              label="Ancien mot de passe"
              value={formData.oldPassword}
              onChange={handleChange}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
            />

            <TextInput
              id="newPassword"
              name="newPassword"
              type="password"
              label="Nouveau mot de passe"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>

          <PasswordRules />

          <SubmitButton label="Valider" disabled={isSubmitting} />
        </form>
      </PageContainer>
    </>
  );
}
