import { Link } from "react-router-dom";
import { pagesUrl } from "../../../core/appConstants";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../core/utils/error-handler";
import axios from "axios";
import apiClient from "../../../core/utils/apiClient";
import { Box, Container, Typography } from "@mui/material";
import AlertSnack from "../../../components/alert/AlertSnack";
import { InvitationDto } from "../../../core/dtos/invitation/InvitationDto";

export default function MoaManagerTeam(): JSX.Element {
  const [data, setData] = useState<InvitationDto[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(
        "http://localhost:8080/organization/6776732d35bdb812f8eced24/members"
      );
      console.log("response", data);

      setData(data);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(getErrorMessage(error.response.data));
        setOpenAlert(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <div>
        {/* Orgnization manager */}
        <h1>Manager MOA Equipe</h1>
        {/* au click voir tous les membres de l'orga  avec statut de l'invit pending, consumed et possibilité d'annuler ou supprimer ...*/}
        {/* bouton envoie invitation avec status invitation */}
        <Link to={pagesUrl.MOA_MANAGER_TEAM_PAGE}>
          <button>Equipe</button>
        </Link>
        {/* au click voir tous les projets + status du projet en cours... */}
        {/* au click sur un projet voir la page extrait pdf */}
        <Link to={pagesUrl.MOA_MANAGER_DASHBOARD_PAGE}>
          <button>Projets</button>
        </Link>
        <Link to={pagesUrl.MOA_MANAGER_INVITE_PAGE}>
          <button>Inviter un membre</button>
        </Link>
      </div>

      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h1">Membres de l'équipe</Typography>
        </Box>

        {data.length === 0 ? (
          <p>Personne dans l'équipe</p>
        ) : (
          data.map((invitation) => {
            //TODO => helper service transformer enum en label
            return (
              <div
                key={invitation._id}
                style={{ display: "flex", gap: "15px" }}
              >
                <p>{invitation.firstName}</p>
                <p>{invitation.lastName}</p>
                <p>{invitation.emailReceiver}</p>
                <p>{invitation.invitationStatus}</p>
                {/* si invit pending */}
                <button>delete invitation</button>
                {/* si invit consumed */}
                <button>delete user</button>
              </div>
            );
          })
        )}

        <AlertSnack
          open={openAlert}
          onClose={handleCloseAlert}
          severity="error"
          errorMessage={errorMessage}
        />
      </Container>
    </>
  );
}
