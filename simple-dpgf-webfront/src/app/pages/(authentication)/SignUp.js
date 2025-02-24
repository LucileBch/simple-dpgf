import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { OrganizationTypeEnum } from "../../core/enums/OrganizationTypeEnum";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import PageContainer from "../../components/containers/PageContainer";
import { AlertContext } from "../../core/contexts/alert-context";
import { useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PasswordRules from "../../components/rules/passwordRules";
export default function SignUp() {
    const navigate = useNavigate();
    const { handleErrorAlert } = useContext(AlertContext);
    const initialFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        organization: { organizationType: OrganizationTypeEnum.MOA, name: "" },
    };
    const validate = (formData) => {
        const errors = {};
        if (!formData.firstName) {
            errors.firstName = "Le prénom est requis";
        }
        if (!formData.lastName) {
            errors.lastName = "Le nom est requis";
        }
        if (!formData.email) {
            errors.email = "L'email est requis";
        }
        if (!formData.password) {
            errors.password = "Le mot de passe est requis";
        }
        if (!formData.organization.organizationType) {
            errors["organization.organizationType"] =
                "Le type de l'organisation est requis";
        }
        if (!formData.organization.name) {
            errors["organization.name"] = "Le nom de l'organisation est requis";
        }
        return errors;
    };
    const onSubmit = async (formData) => {
        try {
            const response = await fetch(apiEndpoints.SIGN_UP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                console.log("response not ok", errorMessage);
                throw new Error(errorMessage);
            }
            navigate(pagesUrl.ACCOUNT_VALIDATION_PAGE);
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error) {
                console.log("ici", error);
                handleErrorAlert(error);
            }
        }
    };
    const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm({ initialFormValues, validate, onSubmit });
    return (_jsxs(PageContainer, { children: [_jsx(BackgroundImage, {}), _jsx(Box, { sx: { textAlign: "center", p: 1 }, children: _jsx(Typography, { variant: "h1", children: "Cr\u00E9er votre compte" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: [_jsx(TextInput, { id: "firstName", name: "firstName", type: "text", label: "Pr\u00E9nom", value: formData.firstName, onChange: handleChange, error: !!errors.firstName, helperText: errors.firstName }), _jsx(TextInput, { id: "lastName", name: "lastName", type: "text", label: "Nom", value: formData.lastName, onChange: handleChange, error: !!errors.lastName, helperText: errors.lastName })] }), _jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: [_jsx(TextInput, { id: "organizationType", name: "organization.organizationType", type: "text", label: "Type d'organisation", disabled: true, value: OrganizationTypeEnum.MOA, error: !!errors["organization.organizationType"], helperText: errors["organization.organizationType"] }), _jsx(TextInput, { id: "name", name: "organization.name", type: "text", label: "Nom de l'organisation", value: formData.organization.name, onChange: handleChange, error: !!errors["organization.name"], helperText: errors["organization.name"] })] }), _jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: [_jsx(TextInput, { id: "email", name: "email", type: "email", label: "Email", value: formData.email, onChange: handleChange, error: !!errors.email, helperText: errors.email }), _jsx(TextInput, { id: "password", name: "password", type: "password", label: "Mot de passe", value: formData.password, onChange: handleChange, error: !!errors.password, helperText: errors.password })] }), _jsx(PasswordRules, {}), _jsx(SubmitButton, { label: "S'inscrire", disabled: isSubmitting })] })] }));
}
