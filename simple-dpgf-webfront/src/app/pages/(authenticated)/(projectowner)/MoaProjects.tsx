import React, { useCallback, useContext, useState } from "react";
import NavigationButton from "../../../components/buttons/NavigationButton";
import DpgfCreationDialog from "../../../components/modals/DpgfCreationDialog";
import NavBar from "../../../components/navbar/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import { DialogContext } from "../../../core/contexts/dialog-context";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import { Box, Grid2, TextField } from "@mui/material";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import DpgfCard from "../../../components/cards/DpgfCard";
import { useNavigate } from "react-router-dom";
import { resolveUrl } from "../../../core/services/http-service";
import { pagesUrl } from "../../../core/appConstants";
import { DpgfDto } from "../../../core/dtos/dpgf/DpgfDto";
import NoProjectImage from "../../../../assets/images/no-project-image.webp";
import NoOutcome from "../../../components/NoOutcome";
import PageContainerSpace from "../../../components/containers/PageContaineSpace";
import CustomPagination from "../../../components/pagination/CustomPagination";
import { dpgfStatusToLabel } from "../../../core/enums/DpgfStatusEnum";

export default function MoaProjects(): React.JSX.Element {
  const navigate = useNavigate();

  const { setIsCreateDialogOpen } = useContext(DialogContext);
  const { dpgfByUserList, isDpgfByUserListLoading } = useContext(DpgfContext);

  // search and pagination
  const [projectSearch, setProjectSearch] = useState<string>("");
  const filteredProjects = dpgfByUserList.filter(
    (dpgf) =>
      dpgf.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (dpgfStatusToLabel(dpgf.dpgfStatus) &&
        dpgfStatusToLabel(dpgf.dpgfStatus)
          .toLowerCase()
          .includes(projectSearch.toLowerCase()))
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const dpgfListToDisplay = projectSearch ? filteredProjects : dpgfByUserList;

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

  const navigateToDpgf = useCallback(
    (dpgf: DpgfDto) => {
      navigate(resolveUrl(pagesUrl.MOA_PROJECT, [dpgf.id]));
    },
    [navigate]
  );

  const handleOpenDpgfCreationDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, [setIsCreateDialogOpen]);

  return (
    <>
      <NavBar />
      <PageContainerSpace>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TitleH2>Mes projets</TitleH2>{" "}
          <TextField
            label="Rechercher un projet"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            value={projectSearch}
            onChange={(e) => setProjectSearch(e.target.value)}
          />
        </Box>

        {isDpgfByUserListLoading ? (
          <CircularLoadingPage />
        ) : (
          <Grid2 container spacing={2} sx={{ marginBottom: "20px" }}>
            {dpgfByUserList.length === 0 ? (
              <>
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    paddingTop: 2,
                    paddingLeft: 2,
                    backgroundImage: `url(${NoProjectImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.3) 100%)",
                      filter: "blur(15px)",
                    },
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                  }}
                ></Box>
                <NoOutcome content=" Vous n'avez pas encore de projets..." />
              </>
            ) : projectSearch ? (
              dpgfListToDisplay.length === 0 ? (
                <NoOutcome content="Pas de résultat correspondant à la recherche..." />
              ) : (
                currentItems.map((dpgf) => (
                  <Grid2 size={4} key={dpgf.id}>
                    <DpgfCard
                      dpgf={dpgf}
                      onClick={() => navigateToDpgf(dpgf)}
                    />
                  </Grid2>
                ))
              )
            ) : (
              // all projets
              currentItems.map((dpgf) => (
                <Grid2 size={4} key={dpgf.id}>
                  <DpgfCard dpgf={dpgf} onClick={() => navigateToDpgf(dpgf)} />
                </Grid2>
              ))
            )}
          </Grid2>
        )}
      </PageContainerSpace>

      <Box sx={{ marginBottom: 2, marginRight: 2 }}>
        <NavigationButton
          label="Créer un projet"
          onClick={handleOpenDpgfCreationDialog}
        />
      </Box>
      <DpgfCreationDialog dialogTitle="Créer un nouveau DPGF" />

      <CustomPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}
