/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useMemo } from "react";
import { addRequestParams, RequestParam } from "../services/http-service";
import { TokenContext } from "../contexts/token-context";
import { apiEndpoints } from "../appConstants";
import {
  setTokensInCookies,
  removeCookies,
  removeUserFromLocalStorage,
} from "../services/authentication-service";

type HttpHook = {
  get(url: string, requestParams?: RequestParam[]): Promise<Response>;
  post(
    url: string,
    payload: any,
    requestParams?: RequestParam[],
    customOptions?: RequestInit
  ): Promise<Response>;
  put(
    url: string,
    payload: any,
    requestParams?: RequestParam[]
  ): Promise<Response>;
  deleteRequest(url: string, requestParams?: RequestParam[]): Promise<Response>;
};

export function useHttp(): HttpHook {
  const { accessToken, setAccessToken, setRefreshToken } =
    useContext(TokenContext);

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

          console.log("erreor refresh", error);
          throw new Error("Failed to refresh access token");
        }
      }
      throw response;
    },
    [setAccessToken, setRefreshToken]
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
      async post(
        url: string,
        payload: any,
        requestParams?: RequestParam[],
        customOptions?: RequestInit
      ): Promise<Response> {
        const { finalUrl, headers } = addRequestParams(
          url,
          accessToken,
          requestParams
        );
        headers.set("Content-Type", "application/json");
        const options: RequestInit = {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
          ...customOptions,
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
          console.error("Erreur lors de la requête POST", error);
          throw error;
        }
      },
      async put(
        url: string,
        payload: any,
        requestParams?: RequestParam[]
      ): Promise<Response> {
        const { finalUrl, headers } = addRequestParams(
          url,
          accessToken,
          requestParams
        );
        headers.set("Content-Type", "application/json");
        const options: RequestInit = {
          method: "PUT",
          headers,
          body: JSON.stringify(payload),
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
          console.log("erreur lors de la requete PUT", error);
          throw error;
        }
      },
      async deleteRequest(
        url: string,
        requestParams?: RequestParam[]
      ): Promise<Response> {
        const { finalUrl, headers } = addRequestParams(
          url,
          accessToken,
          requestParams
        );
        headers.set("Content-Type", "application/json");
        const options: RequestInit = {
          method: "DELETE",
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
          console.log("error DELETE method", error);
          throw error;
        }
      },
    }),
    [accessToken, handleRetryWithRefreshToken]
  );
}
