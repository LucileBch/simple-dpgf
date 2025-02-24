import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import SubmitButton from "../../components/buttons/SubmitButton";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { TextInput } from "../../components/inputs/TextInput";
import { useForm } from "../../core/hooks/use-form";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertContext } from "../../core/contexts/alert-context";
import { resolveUrl } from "../../core/services/http-service";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PageContainerSpace from "../../components/containers/PageContaineSpace";
export default function AcceptInvitation() {
    const navigate = useNavigate();
    const { handleErrorAlert } = useContext(AlertContext);
    const [searchParams] = useSearchParams();
    const [invitationToken, setInvitationToken] = useState(undefined);
    const initialFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
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
        return errors;
    };
    const onSubmit = async (formData) => {
        try {
            const response = await fetch(resolveUrl(apiEndpoints.ACCEPT_INVITATION, [], {
                invitationToken: invitationToken,
            }), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            navigate(pagesUrl.ACCOUNT_VALIDATION_PAGE);
        }
        catch (error) {
            if (error instanceof Error) {
                handleErrorAlert(error);
            }
        }
    };
    const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm({ initialFormValues, validate, onSubmit });
    useEffect(() => {
        const tokenParams = searchParams.get("invitationToken");
        if (tokenParams) {
            setInvitationToken(tokenParams);
            console.log("Token d'invitation :", tokenParams);
        }
    }, [searchParams]);
    if (!invitationToken) {
        return _jsx("div", { children: "Token d'invitation non trouv\u00E9." });
    }
    return (_jsxs(PageContainerSpace, { children: [_jsx(BackgroundImage, {}), _jsx(Box, { sx: { textAlign: "center", p: 4 }, children: _jsx(Typography, { variant: "h1", children: "Cr\u00E9er votre compte" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: [_jsx(TextInput, { id: "firstName", name: "firstName", type: "text", label: "Pr\u00E9nom", value: formData.firstName, onChange: handleChange, error: !!errors.firstName, helperText: errors.firstName }), _jsx(TextInput, { id: "lastName", name: "lastName", type: "text", label: "Nom", value: formData.lastName, onChange: handleChange, error: !!errors.lastName, helperText: errors.lastName })] }), _jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: [_jsx(TextInput, { id: "email", name: "email", type: "email", label: "Email", value: formData.email, onChange: handleChange, error: !!errors.email, helperText: errors.email }), _jsx(TextInput, { id: "password", name: "password", type: "password", label: "Mot de passe", value: formData.password, onChange: handleChange, error: !!errors.password, helperText: errors.password })] }), _jsx(SubmitButton, { label: "S'inscrire", disabled: isSubmitting })] })] }));
}
