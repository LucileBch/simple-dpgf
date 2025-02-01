import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import { UserCodeRequestDto } from "../../core/dtos/user/UserCodeRequestDto";
import { getErrorMessage } from "../../core/utils/error-handler";
import axios from "axios";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { Box, Typography } from "@mui/material";
import AlertSnack from "../../components/alert/AlertSnack";
import { useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import PageContainer from "../../components/containers/PageContainer";

export default function RequestCode(): JSX.Element {
  const [email, setEmail] = useState<UserCodeRequestDto>({
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(apiEndpoints.USER_REQUEST_NEW_CODE, email);
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
    <PageContainer>
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
            required
            onChange={handleChange}
          />
        </Box>

        <SubmitButton label="Valider" />
      </form>

      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity="error"
        errorMessage={errorMessage}
      />
    </PageContainer>
  );
}
