//import { ApiErrorMessage } from "../types/ApiErrorMessage";

export function getErrorMessage(errorMessage: string): string {
  switch (errorMessage) {
    case "USER_NOT_FOUND":
      return "L'adresse email ou le mot de passe est incorrect";
    case "USER_ACCOUNT_NOT_ACTIVATED":
      return "Vous n'avez pas encore activez votre compte";
    default:
      return "Une erreur est survenue";
  }
}
