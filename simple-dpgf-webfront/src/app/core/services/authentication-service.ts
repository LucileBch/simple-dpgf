import { UserDetailsDto } from "../dtos/user/UserDetailsDto";
import Cookies from "js-cookie";

// variables name
const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER = "user";

export function setUserInLocalStorage(user: UserDetailsDto) {
  localStorage.setItem(USER, JSON.stringify(user));
}

export function getUserFromLocalStorage(): UserDetailsDto | undefined {
  const user = getFromLocalStorage(USER);
  return user ? JSON.parse(user) : undefined;
}

export function getFromLocalStorage(key: string): string | undefined {
  const elementFromStorage: string | null = localStorage.getItem(key);
  return elementFromStorage ?? undefined;
}

export function removeUserFromLocalStorage(): void {
  localStorage.removeItem(USER);
}

export function setTokensInCookies(accessToken: string, refreshToken: string) {
  Cookies.set(ACCESS_TOKEN, accessToken, { expires: 0.2 });
  Cookies.set(REFRESH_TOKEN, refreshToken, { expires: 7 });
}

export function getAccessTokenFromCookies() {
  return Cookies.get(ACCESS_TOKEN);
}

export function getRefreshTokenFromCookies() {
  return Cookies.get(REFRESH_TOKEN);
}

export function removeCookies() {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
}

// delete cookies au logout
//export function deleteCookies() {}
