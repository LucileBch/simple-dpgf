import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import { Box, Typography } from "@mui/material";
import NavigationButton from "../../components/buttons/NavigationButton";
import { AlertContext } from "../../core/contexts/alert-context";
import { useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PageContainerSpace from "../../components/containers/PageContaineSpace";
export default function AccountValidation() {
    const navigate = useNavigate();
    const { alertMessage, handleErrorAlert } = useContext(AlertContext);
    const initialFormValues = {
        activationCode: "",
    };
    const validate = (formData) => {
        const errors = {};
        if (!formData.activationCode) {
            errors.activationCode = "Le code d'activation est requis";
        }
        return errors;
    };
    const onSubmit = async (formData) => {
        try {
            const response = await fetch(apiEndpoints.USER_ACCOUNT_VALIDATION, {
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
            navigate(pagesUrl.SIGN_IN_PAGE);
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error) {
                handleErrorAlert(error);
            }
        }
    };
    const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm({ initialFormValues, validate, onSubmit });
    return (_jsxs(PageContainerSpace, { children: [_jsx(BackgroundImage, {}), _jsx(Box, { sx: { textAlign: "center", p: 4 }, children: _jsx(Typography, { variant: "h1", children: "Entrez votre code d'activation." }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: _jsx(TextInput, { id: "activationCode", name: "activationCode", type: "text", label: "Code d'activation", value: formData.activationCode, onChange: handleChange, error: !!errors.activationCode, helperText: errors.activationCode }) }), _jsxs(Box, { sx: { display: "flex", justifyContent: "end", gap: 2 }, children: [!alertMessage && (_jsx(SubmitButton, { label: "Valider", disabled: isSubmitting })), alertMessage && (_jsx(NavigationButton, { path: pagesUrl.NEW_CODE_REQUEST, label: "Recevoir un code" }))] })] })] }));
}
