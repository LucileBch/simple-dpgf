import { UserDetailsDto } from "../dtos/user/UserDetailsDto";
import Cookies from "js-cookie";

export function setUserInLocalStorage(user: UserDetailsDto) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(): UserDetailsDto | undefined {
  const user = getFromLocalStorage("user");
  return user ? JSON.parse(user) : undefined;
}

export function getFromLocalStorage(key: string): string | undefined {
  const elementFromStorage: string | null = localStorage.getItem(key);
  return elementFromStorage ?? undefined;
}

export function removeUserFromLocalStorage(): void {
  localStorage.removeItem("user");
}

export function setTokensInCookies(accessToken: string, refreshToken: string) {
  Cookies.set("accessToken", accessToken, { expires: 0.2 });
  Cookies.set("accessToken", refreshToken, { expires: 7 });
}

export function getAccessTokenFromCookies() {
  return Cookies.get("accessToken");
}

export function getRefreshTokenFromCookies() {
  return Cookies.get("refreshToken");
}

export function removeCookies() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}

// delete cookies au logout
export function deleteCookies() {}
