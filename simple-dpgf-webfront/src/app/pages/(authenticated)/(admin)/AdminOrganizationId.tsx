import { useCallback, useContext, useEffect, useState } from "react";
import { OrganizationContext } from "../../../core/contexts/organization-context";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import TitleH3 from "../../../components/typographies/TitleH3";
import { UserDto } from "../../../core/dtos/user/UserDto";
import { useOrganization } from "../../../core/hooks/use-organization";
import { RoleEnum } from "../../../core/enums/RoleEnum";
import OutlinedButton from "../../../components/buttons/OutlinedButton";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";

export default function AdminOrganizationId(): JSX.Element {
  const { organization, isOrganizationLoading } =
    useContext(OrganizationContext);

  const { fetchMembersByOrganizationId } = useOrganization();
  const [organizationMemberList, setOrganizationMemberList] =
    useState<UserDto[]>();

  const getMembersFromOrganization = useCallback(() => {
    if (organization?.id) {
      fetchMembersByOrganizationId(organization.id).then(
        (newOrganizationMemberList) =>
          setOrganizationMemberList(newOrganizationMemberList)
      );
    }
  }, [fetchMembersByOrganizationId, organization?.id]);

  useEffect(() => {
    getMembersFromOrganization();
  }, [getMembersFromOrganization]);

  const notAdminMembers = organizationMemberList?.filter(
    (member) => member.role !== RoleEnum.ADMIN
  );

  return (
    <PageContainer>
      {isOrganizationLoading ? (
        <CircularLoadingPage />
      ) : (
        <>
          <NavBar />

          <Grid2
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Grid2>
              <TitleH2>{organization?.name}</TitleH2>
            </Grid2>
            <Grid2>
              <Typography>({organization?.organizationType})</Typography>
            </Grid2>
          </Grid2>

          <Box sx={{ pb: 3 }}>
            <TitleH3>Informations sur les licenses :</TitleH3>
            <Typography>
              Nombre de licenses utilisateurs :{" "}
              {organization?.memberLicenseCounter} /{" "}
              {organization?.maxMemberLicenseCounter}
            </Typography>
            <Typography>
              Nombre de licenses utilisateurs :{" "}
              {organization?.projectLicenseCounter} /{" "}
              {organization?.maxProjectLicenseCounter}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <OutlinedButton label="Mettre à jour les licenses" />
            </Box>
          </Box>
          <Divider />

          <Box sx={{ pb: 3 }}>
            <TitleH3>Informations sur le manager de l'organisation :</TitleH3>
            {organizationMemberList
              ?.filter((member) => member.role === RoleEnum.ADMIN)
              .map((member) => {
                return (
                  <div key={member.id}>
                    <Typography>
                      Nom : {member.firstName} {member.lastName}
                    </Typography>
                    <Typography>Email : {member.email}</Typography>
                    <Typography>Role : {member.role}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <Button
                        variant="outlined"
                        component="a"
                        href={`mailto:${member.email}`}
                      >
                        Contacter le manager
                      </Button>
                    </Box>
                  </div>
                );
              })}
          </Box>
          <Divider />

          <Box sx={{ pb: 3 }}>
            <TitleH3>Informations sur les membres de l'organisation :</TitleH3>
            {notAdminMembers !== undefined && notAdminMembers.length > 0 ? (
              notAdminMembers?.map((member) => {
                return (
                  <div key={member.id}>
                    <Typography>
                      Nom : {member.firstName} {member.lastName}
                    </Typography>
                    <Typography>Email : {member.email}</Typography>
                    <Typography>Role : {member.role}</Typography>
                  </div>
                );
              })
            ) : (
              <Typography>
                Pas encore de membres autre que le manager.
              </Typography>
            )}
          </Box>
          {/* Mettre à jour les licenses*/}

          {/* Ajouter possibilités de supprimer une orga et donc les utilisateurs les projets */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <OutlinedButton label="Supprimer l'organisation" />
          </Box>
        </>
      )}
    </PageContainer>
  );
}
