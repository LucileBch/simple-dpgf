import Cookies from "js-cookie";
// variables names
const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER = "user";
export function setUserInLocalStorage(user) {
    localStorage.setItem(USER, JSON.stringify(user));
}
export function getUserFromLocalStorage() {
    const user = getFromLocalStorage(USER);
    return user ? JSON.parse(user) : undefined;
}
export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}
export function removeUserFromLocalStorage() {
    localStorage.removeItem(USER);
}
export function setTokensInCookies(accessToken, refreshToken) {
    Cookies.set(ACCESS_TOKEN, accessToken, { expires: 1 / 24 });
    Cookies.set(REFRESH_TOKEN, refreshToken, { expires: 7 });
}
export function getAccessTokenFromCookies() {
    return Cookies.get(ACCESS_TOKEN);
}
export function getRefreshTokenFromCookies() {
    return Cookies.get(REFRESH_TOKEN);
}
export function removeCookies() {
    Cookies.remove(ACCESS_TOKEN, { path: "/" });
    Cookies.remove(REFRESH_TOKEN, { path: "/" });
}
