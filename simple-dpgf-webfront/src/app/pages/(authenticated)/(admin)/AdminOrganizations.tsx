import { AdminOrganizationContext } from "../../../core/contexts/admin-organization-context";
import OrganizationCard from "../../../components/cards/OrganizationCard";
import { Grid2 } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import PageContainerSpace from "../../../components/containers/PageContaineSpace";
import NoOutcome from "../../../components/NoOutcome";
import PageTitleWithFilter from "../../../components/headers/PageTitleWithFilter";
import CustomPagination from "../../../components/pagination/CustomPagination";

export default function AdminOrganizations(): JSX.Element {
  const { organizationList, isOrganizationListLoading } = useContext(
    AdminOrganizationContext
  );

  // search and pagination
  const [organisationSearch, setOrganisationSearch] = useState<string>("");
  const filteredProjects = organizationList.filter((organisation) =>
    organisation.name.toLowerCase().includes(organisationSearch.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const organisationListToDisplay = organisationSearch
    ? filteredProjects
    : organizationList;

  const currentItems = organisationListToDisplay.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(organisationListToDisplay.length / itemsPerPage);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOrganisationSearch(event.target.value);
    },
    []
  );

  return (
    <>
      <NavBar />
      <PageContainerSpace>
        <PageTitleWithFilter
          title="Gestion des organisations"
          inputLabel="Rechercher une organisation"
          searchValue={organisationSearch}
          onChange={handleSearch}
        />
        {isOrganizationListLoading ? (
          <CircularLoadingPage />
        ) : (
          <Grid2 container spacing={2}>
            {organizationList.length === 0 ? (
              <NoOutcome content="Il n'y a pas encore d'organisation..." />
            ) : organisationSearch ? (
              organisationListToDisplay.length === 0 ? (
                <NoOutcome content="Pas de résultat correspondant à la recherche..." />
              ) : (
                currentItems.map((organization) => {
                  return (
                    <Grid2 size={4} key={organization.id}>
                      <OrganizationCard organization={organization} />
                    </Grid2>
                  );
                })
              )
            ) : (
              organizationList.map((organization) => {
                return (
                  <Grid2 size={4} key={organization.id}>
                    <OrganizationCard organization={organization} />
                  </Grid2>
                );
              })
            )}
          </Grid2>
        )}
      </PageContainerSpace>

      <CustomPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}
