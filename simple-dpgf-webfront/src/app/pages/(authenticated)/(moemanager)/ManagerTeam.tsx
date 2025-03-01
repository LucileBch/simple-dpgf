import { pagesUrl } from "../../../core/appConstants";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import PageContainer from "../../../components/containers/PageContainer";
import { OrganizationContext } from "../../../core/contexts/organization-context";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import MemberCard from "../../../components/cards/MemberCard";
import NavigationButton from "../../../components/buttons/NavigationButton";

import NoOutcome from "../../../components/NoOutcome";
import NavBar from "../../../components/navbar/NavBar";
import CustomPagination from "../../../components/pagination/CustomPagination";
import { invitationStatusToLabel } from "../../../core/enums/InvitationStatusEnum";
import PageTitleWithFilter from "../../../components/headers/PageTitleWithFilter";

export default function ManagerTeam(): React.JSX.Element {
  const { organization, isInvitedMemberListLoading, invitedMemberList } =
    useContext(OrganizationContext);

  useEffect(() => {}, [invitedMemberList]);

  const [invitSearch, setInvitSearch] = useState<string>("");
  const filteredInvitation = invitedMemberList.filter(
    (member) =>
      member.firstName.toLowerCase().includes(invitSearch.toLowerCase()) ||
      (member.lastName &&
        member.lastName.toLowerCase().includes(invitSearch.toLowerCase())) ||
      (member.emailReceiver &&
        member.emailReceiver
          .toLowerCase()
          .includes(invitSearch.toLowerCase())) ||
      (invitationStatusToLabel(member.invitationStatus) &&
        invitationStatusToLabel(member.invitationStatus)
          .toLowerCase()
          .includes(invitSearch.toLowerCase()))
  );

  // search and pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const invitListToDisplay = invitSearch
    ? filteredInvitation
    : invitedMemberList;

  const currentInvits = invitListToDisplay.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(invitListToDisplay.length / itemsPerPage);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInvitSearch(event.target.value);
    },
    []
  );

  return (
    <>
      <NavBar />
      <PageContainer>
        <PageTitleWithFilter
          title="Membres de l'organisation"
          inputLabel="Rechercher un membre"
          searchValue={invitSearch}
          onChange={handleSearch}
        />
        {isInvitedMemberListLoading ? (
          <CircularLoadingPage />
        ) : (
          <>
            <Grid2 container spacing={2} sx={{ marginBottom: "10px" }}>
              {invitedMemberList.length === 0 ? (
                <NoOutcome content="Personne dans l'équipe" />
              ) : invitSearch ? (
                invitListToDisplay.length === 0 ? (
                  <NoOutcome content="Pas de résultat correspondant à la recherche..." />
                ) : (
                  <Grid2
                    size={12}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {currentInvits.map((invitedMember) => (
                      <Grid2 key={invitedMember.id}>
                        <MemberCard invitedMember={invitedMember} />
                      </Grid2>
                    ))}
                  </Grid2>
                )
              ) : (
                <Grid2
                  size={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {currentInvits.map((invitedMember) => (
                    <Grid2 key={invitedMember.id}>
                      <MemberCard invitedMember={invitedMember} />
                    </Grid2>
                  ))}
                </Grid2>
              )}
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
            </Box>
          </>
        )}
      </PageContainer>

      <Box sx={{ marginBottom: 2, marginRight: 2 }}>
        <NavigationButton
          label="Inviter un membre"
          path={pagesUrl.MOE_MANAGER_INVITE_PAGE}
        />
      </Box>
      <CustomPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}
