import { Link } from "react-router-dom";
import { pagesUrl } from "../../../core/appConstants";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../core/utils/error-handler";
import axios from "axios";
import { Container } from "@mui/material";
import AlertSnack from "../../../components/alert/AlertSnack";
import { InvitationDto } from "../../../core/dtos/invitation/InvitationDto";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";

export default function ManagerTeam(): JSX.Element {
  const [data, setData] = useState<InvitationDto[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const fetchData = async () => {
    try {
      // const { data } = await apiClient.get(
      //   "http://localhost:8080/api/organization/67796e9d68110c23b71c3260/members"
      // );
      // console.log("response", data);

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
    <PageContainer>
      <NavBar />
      <div>
        <TitleH2>Membres de l'organisation</TitleH2>
        <Link to={pagesUrl.MOA_MANAGER_INVITE_PAGE}>
          <button>Inviter un membre</button>
        </Link>
      </div>

      <Container maxWidth="lg" sx={{ mb: 4 }}>
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
          message={errorMessage}
        />
      </Container>
    </PageContainer>
  );
}
