import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useState, } from "react";
import { getAccessTokenFromCookies, getRefreshTokenFromCookies, removeCookies, removeUserFromLocalStorage, } from "../services/authentication-service";
export const TokenContext = React.createContext({});
export function TokenContextProvider({ children, }) {
    const initialAccessToken = useMemo(() => getAccessTokenFromCookies(), []);
    const initialRefreshToken = useMemo(() => getRefreshTokenFromCookies(), []);
    const initialIsAuthenticated = useMemo(() => {
        return !!initialAccessToken;
    }, [initialAccessToken]);
    const [accessToken, setAccessToken] = useState(initialAccessToken);
    const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
    const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
    useEffect(() => {
        if (!isAuthenticated) {
            removeCookies();
            removeUserFromLocalStorage();
        }
    }, [isAuthenticated]);
    const tokenStore = useMemo(() => ({
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isAuthenticated,
        setIsAuthenticated,
    }), [
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isAuthenticated,
        setIsAuthenticated,
    ]);
    return (_jsx(TokenContext.Provider, { value: tokenStore, children: children }));
}
