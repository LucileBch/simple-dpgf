import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import SubmitButton from "../../components/buttons/SubmitButton";
import PageContainer from "../../components/containers/PageContainer";
import { TextInput } from "../../components/inputs/TextInput";
import NavBar from "../../components/navbar/NavBar";
import { Box, Typography } from "@mui/material";
import { useCallback, useContext } from "react";
import { useForm } from "../../core/hooks/use-form";
import { UserContext } from "../../core/contexts/user-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { useUser } from "../../core/hooks/use-user";
import { removeCookies, removeUserFromLocalStorage, setTokensInCookies, setUserInLocalStorage, } from "../../core/services/authentication-service";
import { TokenContext } from "../../core/contexts/token-context";
import PasswordRules from "../../components/rules/passwordRules";
export default function UserProfile() {
    const { user, setUser } = useContext(UserContext);
    const { handleErrorAlert, handleSuccessAlert } = useContext(AlertContext);
    const { setAccessToken, setRefreshToken } = useContext(TokenContext);
    const { updateUserProfile } = useUser();
    const initialFormValues = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        oldPassword: "",
        newPassword: "",
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
        if (!formData.oldPassword) {
            errors.oldPassword = "L'ancien mot de passe est requis";
        }
        return errors;
    };
    const onSubmit = useCallback(async (userUpdateProfileDto) => {
        if (!user) {
            handleErrorAlert("Identifiant utilisateur invalide");
            return;
        }
        const updatedUser = await updateUserProfile(user.id, userUpdateProfileDto);
        const userDetailsDto = {
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
        };
        setUser(userDetailsDto);
        removeUserFromLocalStorage();
        setUserInLocalStorage(userDetailsDto);
        if (updatedUser.accessToken && updatedUser.refreshToken) {
            removeCookies();
            setAccessToken(updatedUser.accessToken);
            setRefreshToken(updatedUser.refreshToken);
            setTokensInCookies(updatedUser.accessToken, updatedUser.refreshToken);
        }
        handleSuccessAlert("Vos informations ont bien été mises à jour.");
    }, [
        handleErrorAlert,
        handleSuccessAlert,
        setAccessToken,
        setRefreshToken,
        setUser,
        updateUserProfile,
        user,
    ]);
    const { formData, errors, isSubmitting, handleChange, handleSubmit } = useForm({ initialFormValues, validate, onSubmit });
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsxs(PageContainer, { children: [_jsx(Box, { sx: { textAlign: "center", p: 2 }, children: _jsx(Typography, { variant: "h1", children: "Modifier mes informations :" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(Box, { sx: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 2,
                                    pb: 3,
                                }, children: [_jsx(TextInput, { id: "firstName", name: "firstName", type: "text", label: "Modifier mon pr\u00E9nom", value: formData.firstName, onChange: handleChange, error: !!errors.firstName, helperText: errors.firstName }), _jsx(TextInput, { id: "lastName", name: "lastName", type: "text", label: "Modifier mon nom", value: formData.lastName, onChange: handleChange, error: !!errors.lastName, helperText: errors.lastName }), _jsx(TextInput, { id: "email", name: "email", type: "email", label: "Modifier mon email", value: formData.email, onChange: handleChange, error: !!errors.email, helperText: errors.email }), _jsx(TextInput, { id: "oldPassword", name: "oldPassword", type: "password", label: "Ancien mot de passe", value: formData.oldPassword, onChange: handleChange, error: !!errors.oldPassword, helperText: errors.oldPassword }), _jsx(TextInput, { id: "newPassword", name: "newPassword", type: "password", label: "Nouveau mot de passe", value: formData.newPassword, onChange: handleChange, error: !!errors.password, helperText: errors.password })] }), _jsx(PasswordRules, {}), _jsx(SubmitButton, { label: "Valider", disabled: isSubmitting })] })] })] }));
}
