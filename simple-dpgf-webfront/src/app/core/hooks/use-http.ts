import { useCallback, useContext, useMemo } from "react";
import { addRequestParams, RequestParam } from "../services/http-service";
import { TokenContext } from "../contexts/token-context";
import { useNavigate } from "react-router-dom";
import { apiEndpoints, pagesUrl } from "../appConstants";
import {
  setTokensInCookies,
  removeCookies,
  removeUserFromLocalStorage,
} from "../services/authentication-service";

type HttpHook = {
  get(url: string, requestParams?: RequestParam[]): Promise<Response>;
};

export function useHttp(): HttpHook {
  const { accessToken, setAccessToken, setRefreshToken } =
    useContext(TokenContext);

  const navigate = useNavigate();

  const handleRetryWithRefreshToken = useCallback(
    async (
      response: Response,
      finalUrl: RequestInfo,
      headers: Headers,
      options: RequestInit
    ): Promise<Response> => {
      if (response.status === 401) {
        try {
          const resfreshTokenResponse = await fetch(
            apiEndpoints.REFRESH_TOKEN,
            {
              method: "POST",
              credentials: "include",
            }
          );

          if (!resfreshTokenResponse) {
            throw new Error("Failed to refresh token");
          }

          const { accessToken, refreshToken } =
            await resfreshTokenResponse.json();
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          removeCookies();
          setTokensInCookies(accessToken, refreshToken);

          headers.set("Authorization", `Bearer ${accessToken}`);
          const newResponse = await fetch(finalUrl, { ...options, headers });
          return newResponse;
        } catch (error) {
          removeCookies();
          removeUserFromLocalStorage();

          navigate(pagesUrl.SIGN_IN_PAGE);
          console.log("erreor refresh", error);
          throw new Error("Failed to refresh access token");
        }
      }
      throw response;
    },
    [setAccessToken, setRefreshToken, navigate]
  );

  return useMemo<HttpHook>(
    () => ({
      async get(
        url: string,
        requestParams?: RequestParam[]
      ): Promise<Response> {
        const { finalUrl, headers } = addRequestParams(
          url,
          accessToken,
          requestParams
        );
        const options: RequestInit = {
          method: "GET",
          headers,
        };

        try {
          const response = await fetch(finalUrl, options);

          if (response.ok) {
            return response;
          }

          return handleRetryWithRefreshToken(
            response,
            finalUrl,
            headers,
            options
          );
        } catch (error) {
          console.error("Erreur lors de la requête GET", error);
          throw error;
        }
      },
    }),
    [accessToken, handleRetryWithRefreshToken]
  );
}
