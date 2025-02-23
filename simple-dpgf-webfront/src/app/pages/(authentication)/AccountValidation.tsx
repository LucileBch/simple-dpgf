import { useContext } from "react";
import { AccountValidationDto } from "../../core/dtos/user/AccountValidationDto";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import { Box, Typography } from "@mui/material";
import NavigationButton from "../../components/buttons/NavigationButton";
import { AlertContext } from "../../core/contexts/alert-context";
import { FormValues, useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PageContainerSpace from "../../components/containers/PageContaineSpace";

export default function AccountValidation(): JSX.Element {
  const navigate = useNavigate();

  const { alertMessage, handleErrorAlert } = useContext(AlertContext);

  const initialFormValues: FormValues<AccountValidationDto> = {
    activationCode: "",
  };

  const validate = (formData: FormValues<AccountValidationDto>) => {
    const errors: Partial<AccountValidationDto> = {};
    if (!formData.activationCode) {
      errors.activationCode = "Le code d'activation est requis";
    }

    return errors;
  };

  const onSubmit = async (formData: FormValues<AccountValidationDto>) => {
    try {
      const response = await fetch(apiEndpoints.USER_ACCOUNT_VALIDATION, {
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
      console.log(error);

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
        <Typography variant="h1">Entrez votre code d'activation.</Typography>
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
            id="activationCode"
            name="activationCode"
            type="text"
            label="Code d'activation"
            value={formData.activationCode}
            onChange={handleChange}
            error={!!errors.activationCode}
            helperText={errors.activationCode}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          {!alertMessage && (
            <SubmitButton label="Valider" disabled={isSubmitting} />
          )}

          {alertMessage && (
            <NavigationButton
              path={pagesUrl.NEW_CODE_REQUEST}
              label="Recevoir un code"
            />
          )}
        </Box>
      </form>
    </PageContainerSpace>
  );
}
