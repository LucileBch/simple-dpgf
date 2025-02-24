import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";
import OutlinedButton from "../buttons/OutlinedButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { DialogContext } from "../../core/contexts/dialog-context";
import { useOrganization } from "../../core/hooks/use-organization";
import { NumberInput } from "../inputs/NumberInput";
import { AdminOrganizationContext } from "../../core/contexts/admin-organization-context";
export default function UpdateLicenseDialog({ dialogTitle, dialogContent, organization, }) {
    const { updateOrganizationLicense } = useOrganization();
    const { setOrganization } = useContext(AdminOrganizationContext);
    const { isUpdateDialogOpen, isSubmitting, setIsSubmitting, setAlertMessage, setIsUpdateDialogOpen, setOpenAlert, handleCancelAndClose, } = useContext(DialogContext);
    const [formData, setFormData] = useState({
        memberLicenseCounter: organization.memberLicenseCounter,
        maxMemberLicenseCounter: organization.maxMemberLicenseCounter,
        projectLicenseCounter: organization.projectLicenseCounter,
        maxProjectLicenseCounter: organization.maxProjectLicenseCounter,
    });
    useEffect(() => {
        if (isUpdateDialogOpen) {
            setFormData({
                memberLicenseCounter: organization.memberLicenseCounter,
                maxMemberLicenseCounter: organization.maxMemberLicenseCounter,
                projectLicenseCounter: organization.projectLicenseCounter,
                maxProjectLicenseCounter: organization.maxProjectLicenseCounter,
            });
        }
    }, [isUpdateDialogOpen, organization]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        const valueToNumber = Number(value);
        const number = Number(value);
        if (number < 0)
            return;
        setFormData({
            ...formData,
            [name]: valueToNumber,
        });
    };
    const handleSubmitAndClose = useCallback(async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        setAlertMessage(null);
        setOpenAlert(false);
        try {
            const updatedOrganization = await updateOrganizationLicense(organization.id, formData);
            setOrganization(updatedOrganization);
            setIsSubmitting(false);
            setAlertMessage("Les licenses de l'organisation ont été mises à jour.");
            setOpenAlert(true);
            setTimeout(() => {
                setIsUpdateDialogOpen(false);
            }, 2000);
        }
        finally {
            setIsSubmitting(false);
        }
    }, [
        formData,
        isSubmitting,
        organization.id,
        setAlertMessage,
        setIsUpdateDialogOpen,
        setIsSubmitting,
        setOpenAlert,
        setOrganization,
        updateOrganizationLicense,
    ]);
    return (_jsxs(Dialog, { open: isUpdateDialogOpen, onClose: handleCancelAndClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description", children: [_jsx(DialogTitle, { id: "alert-dialog-title", children: dialogTitle }), _jsxs(DialogContent, { id: "alert-dialog-description", sx: { display: "flex", flexDirection: "column", p: 2, gap: 2 }, children: [dialogContent, _jsx(NumberInput, { id: "memberLicenseCounter", name: "memberLicenseCounter", label: "Licenses utilisateurs", required: true, onChange: handleChange, value: formData.memberLicenseCounter }), _jsx(NumberInput, { id: "maxMemberLicenseCounter", name: "maxMemberLicenseCounter", label: "Licenses utilisateurs maximum", required: true, onChange: handleChange, value: formData.maxMemberLicenseCounter }), _jsx(NumberInput, { id: "projectLicenseCounter", name: "projectLicenseCounter", label: "Licenses projets", required: true, onChange: handleChange, value: formData.projectLicenseCounter }), _jsx(NumberInput, { id: "maxProjectLicense", name: "maxProjectLicenseCounter", label: "Licenses projets maximum", required: true, onChange: handleChange, value: formData.maxProjectLicenseCounter })] }), _jsxs(DialogActions, { children: [_jsx(OutlinedButton, { label: "Annuler", onClick: handleCancelAndClose, disabled: isSubmitting }), _jsx(OutlinedButton, { label: "Confirmer", onClick: handleSubmitAndClose })] })] }));
}
