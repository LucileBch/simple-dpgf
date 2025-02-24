import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { getUserFromLocalStorage, removeCookies, removeUserFromLocalStorage, } from "../services/authentication-service";
import { useHttp } from "../hooks/use-http";
import { apiEndpoints } from "../appConstants";
import { TokenContext } from "./token-context";
export const UserContext = React.createContext({});
export function UserContextProvider({ children, }) {
    const { post } = useHttp();
    const { isAuthenticated, setIsAuthenticated, setAccessToken, setRefreshToken, } = useContext(TokenContext);
    const initialUser = useMemo(() => getUserFromLocalStorage(), []);
    const [user, setUser] = useState(initialUser);
    useEffect(() => {
        if (!isAuthenticated) {
            setUser(undefined);
        }
    }, [isAuthenticated, setUser]);
    const logoutUser = useCallback(async () => {
        try {
            await post(apiEndpoints.SIGN_OUT, [], undefined, {
                credentials: "include",
            });
            removeCookies();
            removeUserFromLocalStorage();
            setAccessToken(undefined);
            setRefreshToken(undefined);
            setIsAuthenticated(false);
            setUser(undefined);
        }
        catch (error) {
            console.log("logout problème", error);
        }
    }, [post, setAccessToken, setIsAuthenticated, setRefreshToken]);
    const userStore = useMemo(() => ({
        user,
        setUser,
        logoutUser,
    }), [user, setUser, logoutUser]);
    return (_jsx(UserContext.Provider, { value: userStore, children: children }));
}
