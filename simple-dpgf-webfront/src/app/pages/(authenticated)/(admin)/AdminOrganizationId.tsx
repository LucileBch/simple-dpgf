import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdminOrganizationContext } from "../../../core/contexts/admin-organization-context";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import NavBar from "../../../components/navbar/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import TitleH3 from "../../../components/typographies/TitleH3";
import { UserDto } from "../../../core/dtos/user/UserDto";
import { useOrganization } from "../../../core/hooks/use-organization";
import { RoleEnum } from "../../../core/enums/RoleEnum";
import OutlinedButton from "../../../components/buttons/OutlinedButton";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import DeleteOrgaDialog from "../../../components/modals/DeleteOrgaDialog";
import UpdateLicenseDialog from "../../../components/modals/UpdateLicenseDialog";
import { DialogContext } from "../../../core/contexts/dialog-context";
import PageContainerMedium from "../../../components/containers/PageContainerMedium";
import PageContainerSpace from "../../../components/containers/PageContainerSpace";

export default function AdminOrganizationId(): React.JSX.Element {
  const { organization, isOrganizationLoading } = useContext(
    AdminOrganizationContext
  );
  const { setIsUpdateDialogOpen, setIsDeleteDialogOpen } =
    useContext(DialogContext);

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

  const notManagerMembers = organizationMemberList?.filter(
    (member) => member.role !== RoleEnum.ORGANIZATION_MANAGER
  );

  const handleOpenUpdateDialog = useCallback(() => {
    setIsUpdateDialogOpen(true);
  }, [setIsUpdateDialogOpen]);

  const handleOpenDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, [setIsDeleteDialogOpen]);

  return (
    <>
      <NavBar />
      <PageContainerSpace>
        {isOrganizationLoading ? (
          <CircularLoadingPage />
        ) : (
          <>
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
                Nombre de licenses projets :{" "}
                {organization?.projectLicenseCounter} /{" "}
                {organization?.maxProjectLicenseCounter}
              </Typography>
              {organization?.id && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <OutlinedButton
                    label="Mettre à jour les licenses"
                    onClick={handleOpenUpdateDialog}
                  />
                  <UpdateLicenseDialog
                    dialogTitle="Modifier les licenses de l'organisation."
                    organization={organization}
                  />
                </Box>
              )}
            </Box>
            <Divider />

            <Box sx={{ pb: 3 }}>
              <TitleH3>Informations sur le manager de l'organisation :</TitleH3>
              {organizationMemberList
                ?.filter(
                  (member) => member.role === RoleEnum.ORGANIZATION_MANAGER
                )
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
              <TitleH3>
                Informations sur les membres de l'organisation :
              </TitleH3>
              {notManagerMembers !== undefined &&
              notManagerMembers.length > 0 ? (
                notManagerMembers?.map((member) => {
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

            {/* TODO */}
            {/* Penser à delete les projets une fois créés*/}
            {organization?.id && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <OutlinedButton
                  label="Supprimer l'organisation"
                  onClick={handleOpenDeleteDialog}
                />
                <DeleteOrgaDialog
                  dialogTitle="Etes-vous sur de vouloir supprimer cette organisation ?"
                  organizationId={organization.id}
                />
              </Box>
            )}
          </>
        )}
      </PageContainerSpace>
    </>
  );
}
