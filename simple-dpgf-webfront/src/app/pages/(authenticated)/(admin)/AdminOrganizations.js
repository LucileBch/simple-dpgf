import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
export default function AdminOrganizations() {
    const { organizationList, isOrganizationListLoading } = useContext(AdminOrganizationContext);
    // search and pagination
    const [organisationSearch, setOrganisationSearch] = useState("");
    const filteredProjects = organizationList.filter((organisation) => organisation.name.toLowerCase().includes(organisationSearch.toLowerCase()));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const organisationListToDisplay = organisationSearch
        ? filteredProjects
        : organizationList;
    const currentItems = organisationListToDisplay.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(organisationListToDisplay.length / itemsPerPage);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const handleSearch = useCallback((event) => {
        setOrganisationSearch(event.target.value);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsxs(PageContainerSpace, { children: [_jsx(PageTitleWithFilter, { title: "Gestion des organisations", inputLabel: "Rechercher une organisation", searchValue: organisationSearch, onChange: handleSearch }), isOrganizationListLoading ? (_jsx(CircularLoadingPage, {})) : (_jsx(Grid2, { container: true, spacing: 2, children: organizationList.length === 0 ? (_jsx(NoOutcome, { content: "Il n'y a pas encore d'organisation..." })) : organisationSearch ? (organisationListToDisplay.length === 0 ? (_jsx(NoOutcome, { content: "Pas de r\u00E9sultat correspondant \u00E0 la recherche..." })) : (currentItems.map((organization) => {
                            return (_jsx(Grid2, { size: 4, children: _jsx(OrganizationCard, { organization: organization }) }, organization.id));
                        }))) : (organizationList.map((organization) => {
                            return (_jsx(Grid2, { size: 4, children: _jsx(OrganizationCard, { organization: organization }) }, organization.id));
                        })) }))] }), _jsx(CustomPagination, { count: totalPages, page: currentPage, onChange: handlePageChange })] }));
}
