import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import PageContainer from "../../components/containers/PageContainer";
import { AlertContext } from "../../core/contexts/alert-context";
import { useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";
export default function RequestCode() {
    const navigate = useNavigate();
    const { handleErrorAlert } = useContext(AlertContext);
    const initialFormValues = {
        email: "",
    };
    const validate = (formData) => {
        const errors = {};
        if (!formData.email) {
            errors.email = "L'email est requis";
        }
        return errors;
    };
    const onSubmit = async (formData) => {
        try {
            const response = await fetch(apiEndpoints.USER_REQUEST_NEW_CODE, {
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
            console.log("requestCode error", error);
            if (error instanceof Error) {
                handleErrorAlert(error);
            }
        }
    };
    const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm({ initialFormValues, validate, onSubmit });
    return (_jsxs(PageContainer, { children: [_jsx(BackgroundImage, {}), _jsx(Box, { sx: { textAlign: "center", p: 4 }, children: _jsx(Typography, { variant: "h1", children: "Entrez votre email pour recevoir un nouveau code." }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: _jsx(TextInput, { id: "email", name: "email", type: "email", label: "Email", value: formData.email, onChange: handleChange, error: !!errors.email, helperText: errors.email }) }), _jsx(SubmitButton, { label: "Valider", disabled: isSubmitting })] })] }));
}
