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
import { AlertContext } from "../contexts/alert-context";

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
  const { accessToken, setAccessToken, setRefreshToken, setIsAuthenticated } =
    useContext(TokenContext);
  const { handleErrorAlert } = useContext(AlertContext);
  // const { setAlertMessage, setSeverity, setOpenAlert } =
  //   useContext(AlertContext);

  // const handleError = useCallback(
  //   async (response: Response): Promise<Response> => {
  //     // allow to read the error message severall times
  //     const clonedResponse = response.clone();
  //     const error = await clonedResponse.json().catch(() => null);
  //       if (response.status === 401) {
  //         console.error("Echec refresh token");
  //         throw new Error("UNAUTHORIZED");
  //       }

  //       if (response.status === 404) {
  //         if (
  //           error.message === "No message available" &&
  //           error.error === "Not Found"
  //         ) {
  //           throw new Error("ENDPOINT_DOES_NOT_EXISTS");
  //         } else {
  //           console.info("404 : no ressource");
  //           // Nothing to do: 404 with error message means endpoint exists
  //           // but resource does not in db. So needs to be handle at component level
  //         }
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.log("handleError", error.message);
  //         setOpenAlert(true);
  //         setAlertMessage(getErrorMessage(error.message));
  //         setSeverity("error");
  //       }
  //       throw error;
  //     }
  //   },
  //   [setAlertMessage, setOpenAlert, setSeverity]
  // );

  const handleRetryWithRefreshToken = useCallback(
    async (
      response: Response,
      finalUrl: RequestInfo,
      headers: Headers,
      options: RequestInit
    ): Promise<Response> => {
      if (response.status === 401) {
        try {
          const response = await fetch(apiEndpoints.REFRESH_TOKEN, {
            method: "POST",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to refresh token");
          }

          const { accessToken, refreshToken } = await response.json();
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
          setAccessToken(undefined);
          setRefreshToken(undefined);
          setIsAuthenticated(false);

          console.log("erreor refresh", error);
          throw new Error("Failed to refresh access token");
        }
      }

      throw response;
    },
    [setAccessToken, setIsAuthenticated, setRefreshToken]
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

          if (response.status === 401) {
            const newResponse = handleRetryWithRefreshToken(
              response,
              finalUrl,
              headers,
              options
            );
            return newResponse;
          }

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
          }

          return response;
        } catch (error) {
          console.error("Erreur lors de la requête POST", error);
          handleErrorAlert(error);
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

          if (response.status === 401) {
            const newResponse = await handleRetryWithRefreshToken(
              response,
              finalUrl,
              headers,
              options
            );

            return newResponse;
          }

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
          }

          return response;
        } catch (error) {
          console.log("erreur lors de la requete PUT", error);
          handleErrorAlert(error);
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

          if (response.status === 401) {
            const newResponse = await handleRetryWithRefreshToken(
              response,
              finalUrl,
              headers,
              options
            );

            return newResponse;
          }

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
          }

          return response;
        } catch (error) {
          console.log("error DELETE method", error);
          handleErrorAlert(error);
          throw error;
        }
      },
    }),
    [accessToken, handleErrorAlert, handleRetryWithRefreshToken]
  );
}
