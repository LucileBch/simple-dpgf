import { Box, Typography } from "@mui/material";
import SubmitButton from "../../components/buttons/SubmitButton";
import { TextInput } from "../../components/inputs/TextInput";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { UserPasswordResetDto } from "../../core/dtos/user/UserPasswordResetDto";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCodeRequestDto } from "../../core/dtos/user/UserCodeRequestDto";
import PageContainer from "../../components/containers/PageContainer";
import { AlertContext } from "../../core/contexts/alert-context";
import { FormValues, useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";

export default function ForgotPassord(): JSX.Element {
  const navigate = useNavigate();

  const { handleErrorAlert } = useContext(AlertContext);

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  // useForm confirm email before enable reset password
  const initialFormValuesEmail: FormValues<UserCodeRequestDto> = {
    email: "",
  };

  const validateEmail = (formData: FormValues<UserCodeRequestDto>) => {
    const errors: Partial<UserCodeRequestDto> = {};
    if (!formData.email) {
      errors.email = "L'email est requis";
    }

    return errors;
  };

  const onSubmitEmail = async (formData: FormValues<UserCodeRequestDto>) => {
    try {
      const response = await fetch(apiEndpoints.REQUEST_NEW_PASSWORD_CODE, {
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

      setIsEmailSent(!isEmailSent);
    } catch (error) {
      console.log("requestCode error", error);
      if (error instanceof Error) {
        handleErrorAlert(error);
      }
    }
  };

  const {
    formData: formDataEmail,
    errors: errorsEmail,
    isSubmitting: isSubmittingEmail,
    handleChange: handleChangeEmail,
    handleSubmit: handleSubmitEmail,
  } = useForm({
    initialFormValues: initialFormValuesEmail,
    validate: validateEmail,
    onSubmit: onSubmitEmail,
  });

  // useForm for reset password
  const initialFormValuesReset: FormValues<UserPasswordResetDto> = {
    email: "",
    activationCode: "",
    password: "",
  };

  const validateReset = (formData: FormValues<UserPasswordResetDto>) => {
    const errors: Partial<UserPasswordResetDto> = {};
    if (!formData.email) {
      errors.email = "L'email est requis";
    }
    if (!formData.activationCode) {
      errors.activationCode = "Le code est requis";
    }
    if (!formData.password) {
      errors.password = "Le nouveau mot de passe est requis";
    }

    return errors;
  };

  const onSubmitReset = async (formData: FormValues<UserPasswordResetDto>) => {
    try {
      const response = await fetch(apiEndpoints.FORGOT_PASSWORD, {
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

      navigate(pagesUrl.SIGN_IN_PAGE);
    } catch (error) {
      console.log("requestCode error", error);
      if (error instanceof Error) {
        handleErrorAlert(error);
      }
    }
  };

  const {
    formData: formDataReset,
    errors: errorsReset,
    isSubmitting: isSubmittingReset,
    handleChange: handleChangeReset,
    handleSubmit: handleSubmitReset,
  } = useForm({
    initialFormValues: initialFormValuesReset,
    validate: validateReset,
    onSubmit: onSubmitReset,
  });

  return (
    <PageContainer>
      <BackgroundImage />
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
              value={formDataEmail.email}
              onChange={handleChangeEmail}
              error={!!errorsEmail.email}
              helperText={errorsEmail.email}
            />
          </Box>

          <SubmitButton label="Valider" disabled={isSubmittingEmail} />
        </form>
      ) : (
        <form onSubmit={handleSubmitReset}>
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
              value={formDataReset.email}
              onChange={handleChangeReset}
              error={!!errorsReset.email}
              helperText={errorsReset.email}
            />
            <TextInput
              id="activationCode"
              name="activationCode"
              type="text"
              label="Code d'activation"
              value={formDataReset.activationCode}
              onChange={handleChangeReset}
              error={!!errorsReset.activationCode}
              helperText={errorsReset.activationCode}
            />
            <TextInput
              id="password"
              name="password"
              type="password"
              label="Mot de passe"
              value={formDataReset.password}
              onChange={handleChangeReset}
              error={!!errorsReset.password}
              helperText={errorsReset.password}
            />
          </Box>

          <SubmitButton label="Valider" disabled={isSubmittingReset} />
        </form>
      )}
    </PageContainer>
  );
}
