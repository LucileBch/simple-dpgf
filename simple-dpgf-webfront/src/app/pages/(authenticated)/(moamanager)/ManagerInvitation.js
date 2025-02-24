import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { pagesUrl } from "../../../core/appConstants";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { TextInput } from "../../../components/inputs/TextInput";
import SubmitButton from "../../../components/buttons/SubmitButton";
import PageContainer from "../../../components/containers/PageContainer";
import NavBar from "../../../components/navbar/NavBar";
import { useForm } from "../../../core/hooks/use-form";
import { useMoaManger } from "../../../core/hooks/use-moaManager";
import { AlertContext } from "../../../core/contexts/alert-context";
import { useContext } from "react";
import { OrganizationContext } from "../../../core/contexts/organization-context";
import BackgroundImage from "../../../components/cards/BackgroundImage";
export default function ManagerInvitation() {
    const navigate = useNavigate();
    const { sendInvitation } = useMoaManger();
    const { handleSuccessAlert } = useContext(AlertContext);
    const { organization, setOrganization, getInvitedMembers } = useContext(OrganizationContext);
    const initialFormValues = {
        firstName: "",
        lastName: "",
        emailReceiver: "",
    };
    const validate = (formData) => {
        const errors = {};
        if (!formData.firstName) {
            errors.firstName = "Le prénom est requis";
        }
        if (!formData.lastName) {
            errors.lastName = "Le nom est requis";
        }
        if (!formData.emailReceiver) {
            errors.emailReceiver = "L'email est requis";
        }
        return errors;
    };
    const onSubmit = async (formData) => {
        if (organization !== undefined) {
            await sendInvitation(formData);
            getInvitedMembers(organization);
            setOrganization((prev) => prev
                ? { ...prev, memberLicenseCounter: prev.memberLicenseCounter + 1 }
                : prev);
            handleSuccessAlert("L'invitation a été envoyée");
            navigate(pagesUrl.MOA_MANAGER_TEAM_PAGE);
        }
    };
    const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm({ initialFormValues, validate, onSubmit });
    return (_jsxs(PageContainer, { children: [_jsx(NavBar, {}), _jsx(Box, { sx: { textAlign: "center", p: 4 }, children: _jsx(Typography, { variant: "h1", children: "Inviter un membre dans votre organisation" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: [_jsx(TextInput, { id: "firstName", name: "firstName", type: "text", label: "Pr\u00E9nom", value: formData.firstName, onChange: handleChange, error: !!errors.firstName, helperText: errors.firstName }), _jsx(TextInput, { id: "lastName", name: "lastName", type: "text", label: "Nom", value: formData.lastName, onChange: handleChange, error: !!errors.lastName, helperText: errors.lastName }), _jsx(TextInput, { id: "emailReceiver", name: "emailReceiver", type: "email", label: "Email", value: formData.emailReceiver, onChange: handleChange, error: !!errors.emailReceiver, helperText: errors.emailReceiver })] }), _jsx(SubmitButton, { label: "Envoyer l'invitation", disabled: isSubmitting, sx: { mb: 2 } })] }), _jsx(BackgroundImage, {})] }));
}
