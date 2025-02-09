import SubmitButton from "../../components/buttons/SubmitButton";
import PageContainer from "../../components/containers/PageContainer";
import { TextInput } from "../../components/inputs/TextInput";
import NavBar from "../../components/NavBar";
import { Box, Typography } from "@mui/material";
import { useCallback, useContext } from "react";
import { FormValues, useForm } from "../../core/hooks/use-form";
import { UserProfileUpdateDto } from "../../core/dtos/user/UserProfileUpdateDto";
import { UserContext } from "../../core/contexts/user-context";

export default function UserProfile(): JSX.Element {
  const { user, updateUserProfileAndTokens } = useContext(UserContext);

  const initialFormValues: FormValues<UserProfileUpdateDto> = {
    firstName: "",
    lastName: "",
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
    (formData: FormValues<UserProfileUpdateDto>) => {
      return updateUserProfileAndTokens(formData);
    },
    [updateUserProfileAndTokens]
  );

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <>
      <NavBar />
      <PageContainer>
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h1">Modifier mes informations :</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              pb: 5,
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
              type="oldPassword"
              label="Ancien mot de passe"
              value={formData.oldPassword}
              onChange={handleChange}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
            />

            <TextInput
              id="newPassword"
              name="newPassword"
              type="newPassword"
              label="Nouveau mot de passe"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>
          <SubmitButton label="Valider" disabled={isSubmitting} />
        </form>
      </PageContainer>
    </>
  );
}
