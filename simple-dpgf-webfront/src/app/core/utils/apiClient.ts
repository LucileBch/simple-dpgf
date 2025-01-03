import axios from "axios";
import { apiEndpoints } from "../appConstants";

// conserver temporairement accessToken
let accesToken: string | null;

const apiClient = axios.create({
  withCredentials: true,
});

// ajouter l'accessToken dans les requêtes
apiClient.interceptors.request.use((config) => {
  if (accesToken && config.headers) {
    config.headers.Authorization = `Bearer ${accesToken}`;
  }
  console.log("accessToken header", accesToken);
  console.log("authorization header", config.headers.Authorization);
  console.log("config", config);

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config
      //&&
      //!error.config._retry // Éviter une boucle infinie
    ) {
      //error.config._retry = true;

      try {
        const response = await axios.post(
          apiEndpoints.REFRESH_TOKEN,
          {},
          { withCredentials: true }
        );
        const newAccesToken = response.headers["Authorization"]?.split(" ")[1];

        if (newAccesToken) {
          accesToken = newAccesToken;

          console.log("header refreshToken", newAccesToken);

          // Réessayer la requête avec le nouvel Access Token
          error.config.headers.Authorization = `Bearer ${newAccesToken}`;
          return apiClient.request(error.config);
        } else {
          console.log("aucun acecs token dans le header");
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);

        // NAVIGUER TO LOGIN PAGE
      }
    }
  }
);

export default apiClient;
