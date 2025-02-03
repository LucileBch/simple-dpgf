import { useState } from "react";
import { apiEndpoints, pagesUrl } from "../../../core/appConstants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getErrorMessage } from "../../../core/utils/error-handler";
import AlertSnack from "../../../components/alert/AlertSnack";
import { Box, Container, Typography } from "@mui/material";
import { TextInput } from "../../../components/inputs/TextInput";
import SubmitButton from "../../../components/buttons/SubmitButton";
import apiClient from "../../../core/utils/apiClient";
import { InvitationCreationDto } from "../../../core/dtos/invitation/InvitationCreationDto";

// TODO : transformer en modal
export default function InviteProjectOwner() {
  const [formData, setFormData] = useState<InvitationCreationDto>({
    firstName: "",
    lastName: "",
    emailReceiver: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post(
        apiEndpoints.SEND_PROJECT_OWNER_INVITATION,
        formData
      );
      navigate(pagesUrl.MOA_MANAGER_TEAM_PAGE);
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
    <>
      <div>
        {/* Orgnization manager */}
        <h1>Manager Dashboard MOA</h1>
        <Link to={pagesUrl.MOA_MANAGER_TEAM_PAGE}>
          <button>Equipe</button>
        </Link>
        <button>Mon profil</button>
      </div>

      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h1">
            Inviter un membre dans votre organisation
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
              id="firstName"
              name="firstName"
              type="text"
              label="Prénom"
              required
              onChange={handleChange}
            />
            <TextInput
              id="lastName"
              name="lastName"
              type="text"
              label="Nom"
              required
              onChange={handleChange}
            />
            <TextInput
              id="emailReceiver"
              name="emailReceiver"
              type="email"
              label="Email"
              required
              onChange={handleChange}
            />
          </Box>
          <SubmitButton label="Envoyer l'invitation" />
        </form>

        <AlertSnack
          open={openAlert}
          onClose={handleCloseAlert}
          severity="error"
          message={errorMessage}
        />
      </Container>
    </>
  );
}
