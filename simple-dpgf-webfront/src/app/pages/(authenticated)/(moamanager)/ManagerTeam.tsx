import { pagesUrl } from "../../../core/appConstants";
import { useContext, useEffect } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import { OrganizationContext } from "../../../core/contexts/organization-context";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import MemberCard from "../../../components/cards/MemberCard";
import NavigationButton from "../../../components/buttons/NavigationButton";

export default function ManagerTeam(): JSX.Element {
  const { organization, isInvitedMemberListLoading, invitedMemberList } =
    useContext(OrganizationContext);

  useEffect(() => {}, [invitedMemberList]);

  console.log("organizaition", organization);

  return (
    <PageContainer>
      <NavBar />
      <div>
        <TitleH2>Membres de l'organisation</TitleH2>
      </div>
      {isInvitedMemberListLoading ? (
        <CircularLoadingPage />
      ) : (
        <>
          <Grid2 container spacing={2} sx={{ marginBottom: "10px" }}>
            {invitedMemberList.length === 0 ? (
              <Typography>Personne dans l'équipe</Typography>
            ) : (
              <Grid2
                size={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {invitedMemberList.map((invitedMember) => {
                  return (
                    <Grid2 key={invitedMember.id}>
                      <MemberCard invitedMember={invitedMember} />
                    </Grid2>
                  );
                })}
              </Grid2>
            )}{" "}
          </Grid2>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography sx={{ textAlign: "end" }}>
              Nombre de licenses utilisateurs consommées :{" "}
              {organization?.memberLicenseCounter} /{" "}
              {organization?.maxMemberLicenseCounter}
            </Typography>

            <Box>
              <NavigationButton
                label="Inviter un membre"
                path={pagesUrl.MOA_MANAGER_INVITE_PAGE}
              />
            </Box>
          </Box>
        </>
      )}
    </PageContainer>
  );
}
