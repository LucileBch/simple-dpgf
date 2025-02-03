import { useState } from "react";
import { AccountValidationDto } from "../../core/dtos/user/AccountValidationDto";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import { Box, Typography } from "@mui/material";
import { getErrorMessage } from "../../core/utils/error-handler";
import AlertSnack from "../../components/alert/AlertSnack";
import NavigationButton from "../../components/buttons/NavigationButton";
import PageContainer from "../../components/containers/PageContainer";

export default function AccountValidation(): JSX.Element {
  const [activationCode, setActivationCode] = useState<AccountValidationDto>({
    activationCode: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivationCode({
      ...activationCode,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(apiEndpoints.USER_ACCOUNT_VALIDATION, activationCode);
      navigate(pagesUrl.SIGN_IN_PAGE);
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
            required
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <SubmitButton label="Valider" />

          {errorMessage && (
            <NavigationButton
              path={pagesUrl.NEW_CODE_REQUEST}
              label="Recevoir un code"
            />
          )}
        </Box>
      </form>

      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity="error"
        message={errorMessage}
      />
    </PageContainer>
  );
}
