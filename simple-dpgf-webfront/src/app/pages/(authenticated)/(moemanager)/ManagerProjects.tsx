import React, { useCallback, useContext, useState } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/navbar/NavBar";
import { OrganizationContext } from "../../../core/contexts/organization-context";
import { Grid2, Typography } from "@mui/material";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import DpgfCard from "../../../components/cards/DpgfCard";
import { DpgfDto } from "../../../core/dtos/dpgf/DpgfDto";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../../core/appConstants";
import { resolveUrl } from "../../../core/services/http-service";
import CustomPagination from "../../../components/pagination/CustomPagination";
import NoOutcome from "../../../components/NoOutcome";
import { dpgfStatusToLabel } from "../../../core/enums/DpgfStatusEnum";
import PageTitleWithFilter from "../../../components/headers/PageTitleWithFilter";

export default function ManagerProjects(): React.JSX.Element {
  const navigate = useNavigate();

  const { organization } = useContext(OrganizationContext);
  const { setDpgf, dpgfByOrganizationList, isDpgfByOrganizationListLoading } =
    useContext(DpgfContext);

  // search and pagination
  const [projectSearch, setProjectSearch] = useState<string>("");
  const filteredProjects = dpgfByOrganizationList.filter(
    (dpgf) =>
      dpgf.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (dpgf.createdByUser &&
        dpgf.createdByUser
          .toLowerCase()
          .includes(projectSearch.toLowerCase())) ||
      (dpgfStatusToLabel(dpgf.dpgfStatus) &&
        dpgfStatusToLabel(dpgf.dpgfStatus)
          .toLowerCase()
          .includes(projectSearch.toLowerCase()))
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const dpgfListToDisplay = projectSearch
    ? filteredProjects
    : dpgfByOrganizationList;

  const currentItems = dpgfListToDisplay.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(dpgfListToDisplay.length / itemsPerPage);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProjectSearch(event.target.value);
    },
    []
  );

  const navigateToDpgfSummary = useCallback(
    (dpgf: DpgfDto) => {
      setDpgf(dpgf);
      navigate(resolveUrl(pagesUrl.MOE_MANAGER_PROJECT_SUMMARY, [dpgf.id]));
    },
    [navigate, setDpgf]
  );

  return (
    <>
      <NavBar />
      <PageContainer>
        <PageTitleWithFilter
          title="Gestion des projets"
          inputLabel="Rechercher un projet"
          searchValue={projectSearch}
          onChange={handleSearch}
        />

        {isDpgfByOrganizationListLoading ? (
          <CircularLoadingPage />
        ) : (
          <Grid2 container spacing={2} sx={{ marginBottom: "20px" }}>
            {dpgfByOrganizationList.length === 0 ? (
              // no projects initiated
              <NoOutcome content="Il n'y a pas encore de projet..." />
            ) : projectSearch ? (
              // search but no results
              dpgfListToDisplay.length === 0 ? (
                <NoOutcome content="Pas de résultat correspondant à la recherche..." />
              ) : (
                // projects from search
                currentItems.map((dpgf) => (
                  <Grid2 size={4} key={dpgf.id}>
                    <DpgfCard
                      dpgf={dpgf}
                      onClick={() => navigateToDpgfSummary(dpgf)}
                    />
                  </Grid2>
                ))
              )
            ) : (
              // all projets
              currentItems.map((dpgf) => (
                <Grid2 size={4} key={dpgf.id}>
                  <DpgfCard
                    dpgf={dpgf}
                    onClick={() => navigateToDpgfSummary(dpgf)}
                  />
                </Grid2>
              ))
            )}
          </Grid2>
        )}

        <Typography sx={{ textAlign: "end" }}>
          Nombre de licences projets consommées :{" "}
          {organization?.projectLicenseCounter} /{" "}
          {organization?.maxProjectLicenseCounter}
        </Typography>
      </PageContainer>

      <CustomPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}
