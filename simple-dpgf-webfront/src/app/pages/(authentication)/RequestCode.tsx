import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import { UserCodeRequestDto } from "../../core/dtos/user/UserCodeRequestDto";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import PageContainer from "../../components/containers/PageContainer";
import { AlertContext } from "../../core/contexts/alert-context";
import { FormValues, useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";

export default function RequestCode(): React.JSX.Element {
  const navigate = useNavigate();

  const { handleErrorAlert } = useContext(AlertContext);

  const initialFormValues: FormValues<UserCodeRequestDto> = {
    email: "",
  };

  const validate = (formData: FormValues<UserCodeRequestDto>) => {
    const errors: Partial<UserCodeRequestDto> = {};
    if (!formData.email) {
      errors.email = "L'email est requis";
    }

    return errors;
  };

  const onSubmit = async (formData: FormValues<UserCodeRequestDto>) => {
    try {
      const response = await fetch(apiEndpoints.USER_REQUEST_NEW_CODE, {
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

      navigate(pagesUrl.ACCOUNT_VALIDATION_PAGE);
    } catch (error) {
      console.log("requestCode error", error);
      if (error instanceof Error) {
        handleErrorAlert(error);
      }
    }
  };

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <PageContainer>
      <BackgroundImage />
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h1">
          Entrez votre email pour recevoir un nouveau code.
        </Typography>
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
        </Box>

        <SubmitButton label="Valider" disabled={isSubmitting} />
      </form>
    </PageContainer>
  );
}
