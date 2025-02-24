import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useContext, useEffect, useState } from "react";
import { AdminOrganizationContext } from "../../../core/contexts/admin-organization-context";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/navbar/NavBar";
import TitleH2 from "../../../components/typographies/TitleH2";
import TitleH3 from "../../../components/typographies/TitleH3";
import { useOrganization } from "../../../core/hooks/use-organization";
import { RoleEnum } from "../../../core/enums/RoleEnum";
import OutlinedButton from "../../../components/buttons/OutlinedButton";
import CircularLoadingPage from "../../../components/progress/CircularLoadingPage";
import DeleteOrgaDialog from "../../../components/modals/DeleteOrgaDialog";
import UpdateLicenseDialog from "../../../components/modals/UpdateLicenseDialog";
import { DialogContext } from "../../../core/contexts/dialog-context";
export default function AdminOrganizationId() {
    const { organization, isOrganizationLoading } = useContext(AdminOrganizationContext);
    const { setIsUpdateDialogOpen, setIsDeleteDialogOpen } = useContext(DialogContext);
    const { fetchMembersByOrganizationId } = useOrganization();
    const [organizationMemberList, setOrganizationMemberList] = useState();
    const getMembersFromOrganization = useCallback(() => {
        if (organization?.id) {
            fetchMembersByOrganizationId(organization.id).then((newOrganizationMemberList) => setOrganizationMemberList(newOrganizationMemberList));
        }
    }, [fetchMembersByOrganizationId, organization?.id]);
    useEffect(() => {
        getMembersFromOrganization();
    }, [getMembersFromOrganization]);
    const notManagerMembers = organizationMemberList?.filter((member) => member.role !== RoleEnum.ORGANIZATION_MANAGER);
    const handleOpenUpdateDialog = useCallback(() => {
        setIsUpdateDialogOpen(true);
    }, [setIsUpdateDialogOpen]);
    const handleOpenDeleteDialog = useCallback(() => {
        setIsDeleteDialogOpen(true);
    }, [setIsDeleteDialogOpen]);
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx(PageContainer, { children: isOrganizationLoading ? (_jsx(CircularLoadingPage, {})) : (_jsxs(_Fragment, { children: [_jsxs(Grid2, { container: true, sx: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2,
                            }, children: [_jsx(Grid2, { children: _jsx(TitleH2, { children: organization?.name }) }), _jsx(Grid2, { children: _jsxs(Typography, { children: ["(", organization?.organizationType, ")"] }) })] }), _jsxs(Box, { sx: { pb: 3 }, children: [_jsx(TitleH3, { children: "Informations sur les licenses :" }), _jsxs(Typography, { children: ["Nombre de licenses utilisateurs :", " ", organization?.memberLicenseCounter, " /", " ", organization?.maxMemberLicenseCounter] }), _jsxs(Typography, { children: ["Nombre de licenses projets :", " ", organization?.projectLicenseCounter, " /", " ", organization?.maxProjectLicenseCounter] }), organization?.id && (_jsxs(Box, { sx: {
                                        display: "flex",
                                        justifyContent: "end",
                                    }, children: [_jsx(OutlinedButton, { label: "Mettre \u00E0 jour les licenses", onClick: handleOpenUpdateDialog }), _jsx(UpdateLicenseDialog, { dialogTitle: "Modifier les licenses de l'organisation.", organization: organization })] }))] }), _jsx(Divider, {}), _jsxs(Box, { sx: { pb: 3 }, children: [_jsx(TitleH3, { children: "Informations sur le manager de l'organisation :" }), organizationMemberList
                                    ?.filter((member) => member.role === RoleEnum.ORGANIZATION_MANAGER)
                                    .map((member) => {
                                    return (_jsxs("div", { children: [_jsxs(Typography, { children: ["Nom : ", member.firstName, " ", member.lastName] }), _jsxs(Typography, { children: ["Email : ", member.email] }), _jsxs(Typography, { children: ["Role : ", member.role] }), _jsx(Box, { sx: {
                                                    display: "flex",
                                                    justifyContent: "end",
                                                }, children: _jsx(Button, { variant: "outlined", component: "a", href: `mailto:${member.email}`, children: "Contacter le manager" }) })] }, member.id));
                                })] }), _jsx(Divider, {}), _jsxs(Box, { sx: { pb: 3 }, children: [_jsx(TitleH3, { children: "Informations sur les membres de l'organisation :" }), notManagerMembers !== undefined &&
                                    notManagerMembers.length > 0 ? (notManagerMembers?.map((member) => {
                                    return (_jsxs("div", { children: [_jsxs(Typography, { children: ["Nom : ", member.firstName, " ", member.lastName] }), _jsxs(Typography, { children: ["Email : ", member.email] }), _jsxs(Typography, { children: ["Role : ", member.role] })] }, member.id));
                                })) : (_jsx(Typography, { children: "Pas encore de membres autre que le manager." }))] }), organization?.id && (_jsxs(Box, { sx: {
                                display: "flex",
                                justifyContent: "end",
                            }, children: [_jsx(OutlinedButton, { label: "Supprimer l'organisation", onClick: handleOpenDeleteDialog }), _jsx(DeleteOrgaDialog, { dialogTitle: "Etes-vous sur de vouloir supprimer cette organisation ?", organizationId: organization.id })] }))] })) })] }));
}
