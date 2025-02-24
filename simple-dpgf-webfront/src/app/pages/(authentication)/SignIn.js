import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import SubmitButton from "../../components/buttons/SubmitButton";
import { UserContext } from "../../core/contexts/user-context";
import { TokenContext } from "../../core/contexts/token-context";
import { setTokensInCookies, setUserInLocalStorage, } from "../../core/services/authentication-service";
import { AlertContext } from "../../core/contexts/alert-context";
import { useForm } from "../../core/hooks/use-form";
import BackgroundImage from "../../components/cards/BackgroundImage";
import PageContainerSpace from "../../components/containers/PageContaineSpace";
export default function SignIn() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { setIsAuthenticated, setAccessToken, setRefreshToken } = useContext(TokenContext);
    const { handleErrorAlert } = useContext(AlertContext);
    const initialFormValues = {
        email: "",
        password: "",
    };
    const validate = (formData) => {
        const errors = {};
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
            const response = await fetch(apiEndpoints.SIGN_IN, {
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
            const { accessToken, refreshToken, user } = await response.json();
            if (user) {
                setUserInLocalStorage(user);
                setTokensInCookies(accessToken, refreshToken);
                setIsAuthenticated(true);
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setUser(user);
            }
            navigate(pagesUrl.DASHBOARD_PAGE);
        }
        catch (error) {
            if (error instanceof Error) {
                handleErrorAlert(error);
            }
        }
    };
    const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm({ initialFormValues, validate, onSubmit });
    return (_jsxs(PageContainerSpace, { children: [_jsx(BackgroundImage, {}), _jsx(Box, { sx: { textAlign: "center", p: 4 }, children: _jsx(Typography, { variant: "h1", children: "Se connecter" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 2,
                            p: 1,
                        }, children: [_jsx(TextInput, { id: "email", name: "email", type: "email", label: "Email", value: formData.email, onChange: handleChange, error: !!errors.email, helperText: errors.email }), _jsx(TextInput, { id: "password", name: "password", type: "password", label: "Mot de passe", value: formData.password, onChange: handleChange, error: !!errors.password, helperText: errors.password })] }), _jsxs(Box, { sx: {
                            display: "flex",
                            alignItems: "end",
                            justifyContent: "end",
                            gap: 2,
                        }, children: [_jsx(Link, { to: pagesUrl.FORGOT_PASSWORD, children: "Mot de passe oubli\u00E9" }), _jsx(SubmitButton, { label: "Se connecter", disabled: isSubmitting })] })] })] }));
}
