import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import SubmitButton from "../../components/buttons/SubmitButton";
import { TextInput } from "../../components/inputs/TextInput";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../core/contexts/alert-context";
import { useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PageContainerSpace from "../../components/containers/PageContaineSpace";
export default function ForgotPassord() {
    const navigate = useNavigate();
    const { handleErrorAlert } = useContext(AlertContext);
    const [isEmailSent, setIsEmailSent] = useState(false);
    // useForm confirm email before enable reset password
    const initialFormValuesEmail = {
        email: "",
    };
    const validateEmail = (formData) => {
        const errors = {};
        if (!formData.email) {
            errors.email = "L'email est requis";
        }
        return errors;
    };
    const onSubmitEmail = async (formData) => {
        try {
            const response = await fetch(apiEndpoints.REQUEST_NEW_PASSWORD_CODE, {
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
            setIsEmailSent(!isEmailSent);
        }
        catch (error) {
            console.log("requestCode error", error);
            if (error instanceof Error) {
                handleErrorAlert(error);
            }
        }
    };
    const { formData: formDataEmail, errors: errorsEmail, isSubmitting: isSubmittingEmail, handleChange: handleChangeEmail, handleSubmit: handleSubmitEmail, } = useForm({
        initialFormValues: initialFormValuesEmail,
        validate: validateEmail,
        onSubmit: onSubmitEmail,
    });
    // useForm for reset password
    const initialFormValuesReset = {
        email: "",
        activationCode: "",
        password: "",
    };
    const validateReset = (formData) => {
        const errors = {};
        if (!formData.email) {
            errors.email = "L'email est requis";
        }
        if (!formData.activationCode) {
            errors.activationCode = "Le code est requis";
        }
        if (!formData.password) {
            errors.password = "Le nouveau mot de passe est requis";
        }
        return errors;
    };
    const onSubmitReset = async (formData) => {
        try {
            const response = await fetch(apiEndpoints.FORGOT_PASSWORD, {
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
            console.log("requestCode error", error);
            if (error instanceof Error) {
                handleErrorAlert(error);
            }
        }
    };
    const { formData: formDataReset, errors: errorsReset, isSubmitting: isSubmittingReset, handleChange: handleChangeReset, handleSubmit: handleSubmitReset, } = useForm({
        initialFormValues: initialFormValuesReset,
        validate: validateReset,
        onSubmit: onSubmitReset,
    });
    return (_jsxs(PageContainerSpace, { children: [_jsx(BackgroundImage, {}), _jsx(Box, { sx: { textAlign: "center", p: 4 }, children: _jsx(Typography, { variant: "h1", children: !isEmailSent
                        ? "Un code va vous être envoyé."
                        : "Réinitialisez votre mot de passe" }) }), !isEmailSent ? (_jsxs("form", { onSubmit: handleSubmitEmail, children: [_jsx(Box, { sx: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            p: 1,
                        }, children: _jsx(TextInput, { id: "email", name: "email", type: "email", label: "Email", value: formDataEmail.email, onChange: handleChangeEmail, error: !!errorsEmail.email, helperText: errorsEmail.email }) }), _jsx(SubmitButton, { label: "Valider", disabled: isSubmittingEmail })] })) : (_jsxs("form", { onSubmit: handleSubmitReset, children: [_jsxs(Box, { sx: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            p: 1,
                        }, children: [_jsx(TextInput, { id: "email", name: "email", type: "email", label: "Email", value: formDataReset.email, onChange: handleChangeReset, error: !!errorsReset.email, helperText: errorsReset.email }), _jsx(TextInput, { id: "activationCode", name: "activationCode", type: "text", label: "Code d'activation", value: formDataReset.activationCode, onChange: handleChangeReset, error: !!errorsReset.activationCode, helperText: errorsReset.activationCode }), _jsx(TextInput, { id: "password", name: "password", type: "password", label: "Mot de passe", value: formDataReset.password, onChange: handleChangeReset, error: !!errorsReset.password, helperText: errorsReset.password })] }), _jsx(SubmitButton, { label: "Valider", disabled: isSubmittingReset })] }))] }));
}
