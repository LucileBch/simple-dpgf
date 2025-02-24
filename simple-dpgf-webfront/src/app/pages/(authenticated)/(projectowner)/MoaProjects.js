import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useContext, useState } from "react";
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
import NoProjectImage from "../../../../assets/images/no-project-image.webp";
import NoOutcome from "../../../components/NoOutcome";
import PageContainerSpace from "../../../components/containers/PageContaineSpace";
import CustomPagination from "../../../components/pagination/CustomPagination";
import { dpgfStatusToLabel } from "../../../core/enums/DpgfStatusEnum";
export default function MoaProjects() {
    const navigate = useNavigate();
    const { setIsCreateDialogOpen } = useContext(DialogContext);
    const { dpgfByUserList, isDpgfByUserListLoading } = useContext(DpgfContext);
    // search and pagination
    const [projectSearch, setProjectSearch] = useState("");
    const filteredProjects = dpgfByUserList.filter((dpgf) => dpgf.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
        (dpgfStatusToLabel(dpgf.dpgfStatus) &&
            dpgfStatusToLabel(dpgf.dpgfStatus)
                .toLowerCase()
                .includes(projectSearch.toLowerCase())));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const dpgfListToDisplay = projectSearch ? filteredProjects : dpgfByUserList;
    const currentItems = dpgfListToDisplay.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(dpgfListToDisplay.length / itemsPerPage);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const navigateToDpgf = useCallback((dpgf) => {
        navigate(resolveUrl(pagesUrl.MOA_PROJECT, [dpgf.id]));
    }, [navigate]);
    const handleOpenDpgfCreationDialog = useCallback(() => {
        setIsCreateDialogOpen(true);
    }, [setIsCreateDialogOpen]);
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsxs(PageContainerSpace, { children: [_jsxs(Box, { sx: { display: "flex", justifyContent: "space-between" }, children: [_jsx(TitleH2, { children: "Mes projets" }), " ", _jsx(TextField, { label: "Rechercher un projet", variant: "outlined", sx: { marginBottom: 2 }, value: projectSearch, onChange: (e) => setProjectSearch(e.target.value) })] }), isDpgfByUserListLoading ? (_jsx(CircularLoadingPage, {})) : (_jsx(Grid2, { container: true, spacing: 2, sx: { marginBottom: "20px" }, children: dpgfByUserList.length === 0 ? (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
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
                                            background: "radial-gradient(circle, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.3) 100%)",
                                            filter: "blur(15px)",
                                        },
                                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                                    } }), _jsx(NoOutcome, { content: " Vous n'avez pas encore de projets..." })] })) : projectSearch ? (dpgfListToDisplay.length === 0 ? (_jsx(NoOutcome, { content: "Pas de r\u00E9sultat correspondant \u00E0 la recherche..." })) : (currentItems.map((dpgf) => (_jsx(Grid2, { size: 4, children: _jsx(DpgfCard, { dpgf: dpgf, onClick: () => navigateToDpgf(dpgf) }) }, dpgf.id))))) : (
                        // all projets
                        currentItems.map((dpgf) => (_jsx(Grid2, { size: 4, children: _jsx(DpgfCard, { dpgf: dpgf, onClick: () => navigateToDpgf(dpgf) }) }, dpgf.id)))) }))] }), _jsx(Box, { sx: { marginBottom: 2, marginRight: 2 }, children: _jsx(NavigationButton, { label: "Cr\u00E9er un projet", onClick: handleOpenDpgfCreationDialog }) }), _jsx(DpgfCreationDialog, { dialogTitle: "Cr\u00E9er un nouveau DPGF" }), _jsx(CustomPagination, { count: totalPages, page: currentPage, onChange: handlePageChange })] }));
}
