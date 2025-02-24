import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useContext, useState } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/navbar/NavBar";
import { OrganizationContext } from "../../../core/contexts/organization-context";
import { Grid2, Typography } from "@mui/material";
import { DpgfContext } from "../../../core/contexts/dpgf-context";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import DpgfCard from "../../../components/cards/DpgfCard";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../../core/appConstants";
import { resolveUrl } from "../../../core/services/http-service";
import CustomPagination from "../../../components/pagination/CustomPagination";
import NoOutcome from "../../../components/NoOutcome";
import { dpgfStatusToLabel } from "../../../core/enums/DpgfStatusEnum";
import PageTitleWithFilter from "../../../components/headers/PageTitleWithFilter";
export default function ManagerProjects() {
    const navigate = useNavigate();
    const { organization } = useContext(OrganizationContext);
    const { setDpgf, dpgfByOrganizationList, isDpgfByOrganizationListLoading } = useContext(DpgfContext);
    // search and pagination
    const [projectSearch, setProjectSearch] = useState("");
    const filteredProjects = dpgfByOrganizationList.filter((dpgf) => dpgf.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
        (dpgf.createdByUser &&
            dpgf.createdByUser
                .toLowerCase()
                .includes(projectSearch.toLowerCase())) ||
        (dpgfStatusToLabel(dpgf.dpgfStatus) &&
            dpgfStatusToLabel(dpgf.dpgfStatus)
                .toLowerCase()
                .includes(projectSearch.toLowerCase())));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const dpgfListToDisplay = projectSearch
        ? filteredProjects
        : dpgfByOrganizationList;
    const currentItems = dpgfListToDisplay.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(dpgfListToDisplay.length / itemsPerPage);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const handleSearch = useCallback((event) => {
        setProjectSearch(event.target.value);
    }, []);
    const navigateToDpgfSummary = useCallback((dpgf) => {
        setDpgf(dpgf);
        navigate(resolveUrl(pagesUrl.MOA_MANAGER_PROJECT_SUMMARY, [dpgf.id]));
    }, [navigate, setDpgf]);
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsxs(PageContainer, { children: [_jsx(PageTitleWithFilter, { title: "Gestion des projets", inputLabel: "Rechercher un projet", searchValue: projectSearch, onChange: handleSearch }), isDpgfByOrganizationListLoading ? (_jsx(CircularLoadingPage, {})) : (_jsx(Grid2, { container: true, spacing: 2, sx: { marginBottom: "20px" }, children: dpgfByOrganizationList.length === 0 ? (
                        // no projects initiated
                        _jsx(NoOutcome, { content: "Il n'y a pas encore de projet..." })) : projectSearch ? (
                        // search but no results
                        dpgfListToDisplay.length === 0 ? (_jsx(NoOutcome, { content: "Pas de r\u00E9sultat correspondant \u00E0 la recherche..." })) : (
                        // projects from search
                        currentItems.map((dpgf) => (_jsx(Grid2, { size: 4, children: _jsx(DpgfCard, { dpgf: dpgf, onClick: () => navigateToDpgfSummary(dpgf) }) }, dpgf.id))))) : (
                        // all projets
                        currentItems.map((dpgf) => (_jsx(Grid2, { size: 4, children: _jsx(DpgfCard, { dpgf: dpgf, onClick: () => navigateToDpgfSummary(dpgf) }) }, dpgf.id)))) })), _jsxs(Typography, { sx: { textAlign: "end" }, children: ["Nombre de licences projets consomm\u00E9es :", " ", organization?.projectLicenseCounter, " /", " ", organization?.maxProjectLicenseCounter] })] }), _jsx(CustomPagination, { count: totalPages, page: currentPage, onChange: handlePageChange })] }));
}
