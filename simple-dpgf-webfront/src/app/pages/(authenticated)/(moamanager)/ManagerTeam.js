import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { pagesUrl } from "../../../core/appConstants";
import { useCallback, useContext, useEffect, useState } from "react";
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
export default function ManagerTeam() {
    const { organization, isInvitedMemberListLoading, invitedMemberList } = useContext(OrganizationContext);
    useEffect(() => { }, [invitedMemberList]);
    const [invitSearch, setInvitSearch] = useState("");
    const filteredInvitation = invitedMemberList.filter((member) => member.firstName.toLowerCase().includes(invitSearch.toLowerCase()) ||
        (member.lastName &&
            member.lastName.toLowerCase().includes(invitSearch.toLowerCase())) ||
        (member.emailReceiver &&
            member.emailReceiver
                .toLowerCase()
                .includes(invitSearch.toLowerCase())) ||
        (invitationStatusToLabel(member.invitationStatus) &&
            invitationStatusToLabel(member.invitationStatus)
                .toLowerCase()
                .includes(invitSearch.toLowerCase())));
    // search and pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const invitListToDisplay = invitSearch
        ? filteredInvitation
        : invitedMemberList;
    const currentInvits = invitListToDisplay.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(invitListToDisplay.length / itemsPerPage);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const handleSearch = useCallback((event) => {
        setInvitSearch(event.target.value);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsxs(PageContainer, { children: [_jsx(PageTitleWithFilter, { title: "Membres de l'organisation", inputLabel: "Rechercher un membre", searchValue: invitSearch, onChange: handleSearch }), isInvitedMemberListLoading ? (_jsx(CircularLoadingPage, {})) : (_jsxs(_Fragment, { children: [_jsx(Grid2, { container: true, spacing: 2, sx: { marginBottom: "10px" }, children: invitedMemberList.length === 0 ? (_jsx(NoOutcome, { content: "Personne dans l'\u00E9quipe" })) : invitSearch ? (invitListToDisplay.length === 0 ? (_jsx(NoOutcome, { content: "Pas de r\u00E9sultat correspondant \u00E0 la recherche..." })) : (_jsx(Grid2, { size: 12, sx: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "20px",
                                    }, children: currentInvits.map((invitedMember) => (_jsx(Grid2, { children: _jsx(MemberCard, { invitedMember: invitedMember }) }, invitedMember.id))) }))) : (_jsx(Grid2, { size: 12, sx: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "20px",
                                    }, children: currentInvits.map((invitedMember) => (_jsx(Grid2, { children: _jsx(MemberCard, { invitedMember: invitedMember }) }, invitedMember.id))) })) }), _jsx(Box, { sx: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }, children: _jsxs(Typography, { sx: { textAlign: "end" }, children: ["Nombre de licenses utilisateurs consomm\u00E9es :", " ", organization?.memberLicenseCounter, " /", " ", organization?.maxMemberLicenseCounter] }) })] }))] }), _jsx(Box, { sx: { marginBottom: 2, marginRight: 2 }, children: _jsx(NavigationButton, { label: "Inviter un membre", path: pagesUrl.MOA_MANAGER_INVITE_PAGE }) }), _jsx(CustomPagination, { count: totalPages, page: currentPage, onChange: handlePageChange })] }));
}
