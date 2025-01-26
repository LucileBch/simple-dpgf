import axios from "axios";
import { apiEndpoints } from "../appConstants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Création de l'instance axios avec des cookies
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// Intercepteur pour ajouter l'Access Token depuis la réponse du backend
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log("API Client : No accessToken in cookies");
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
    console.log("apiClient error", error);
  }
);

// Intercepteur pour gérer les erreurs 401 et rafraîchir le token
apiClient.interceptors.response.use(
  (response) => {
    // Si la réponse est réussie, simplement la retourner
    console.log("response", response);
    return response;
  },
  async (error) => {
    const navigate = useNavigate();
    const originalRequest = error.config;
    console.log("originalrequest", error.config);

    if (error.response?.status === 401) {
      // Si l'erreur est 401, cela signifie que le token est expiré
      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token not found in cookies");
        }
        const response = await axios.post(
          apiEndpoints.REFRESH_TOKEN,
          {},
          { withCredentials: true }
        );

        // Stockage des nouveaux tokens dans les cookies
        Cookies.set("accessToken", response.data.accessToken, {
          expires: 0.02,
          path: "/",
        }); // 30 minutes
        Cookies.set("refreshToken", response.data.resfreshToken, {
          expires: 7,
          path: "/",
        }); // 7 jours

        // Mettre à jour le header Authorization global
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        // Réessayer la requête d'origine avec le nouveau accessToken
        return apiClient(originalRequest);
      } catch (err) {
        console.error("Error refreshing token:", err);

        navigate(apiEndpoints.SIGN_IN);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error); // Si ce n'est pas une erreur 401, retourner l'erreur
  }
);

export default apiClient;
