//import { ApiErrorMessage } from "../types/ApiErrorMessage";

export function getErrorMessage(errorMessage: string): string {
  switch (errorMessage) {
    case "USER_NOT_FOUND":
      return "Utilisateur non reconnu.";
    case "USER_ALREADY_EXISTS":
      return "Adresse email déjà utilisée.";
    case "CODE_EXPIRED":
      return "Le code a expiré.";
    case "INVALID_CODE":
      return "Le code est invalide.";
    case "USER_ACCOUNT_ALREADY_ACTIVATED":
      return "Le compte a déjà été activé.";
    case "USER_ACCOUNT_NOT_ACTIVATED":
      return "Vous n'avez pas encore activez votre compte.";
    default:
      return "Une erreur est survenue";
  }
}
