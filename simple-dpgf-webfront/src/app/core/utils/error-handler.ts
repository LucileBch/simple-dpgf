export function getErrorMessage(errorMessage: string): string {
  switch (errorMessage) {
    // Global Errors
    case "ENDPOINT_DOES_NOT_EXISTS":
      return "L'url demandée n'existe pas.";
    case "UNAUTHORIZED":
      return "Vous n'avez pas l'autorisation.";
    // User Errors
    case "USER_NOT_FOUND":
      return "Utilisateur non reconnu.";
    case "USER_ALREADY_EXISTS":
      return "Adresse email déjà utilisée.";

    // Account Validation Errors
    case "CODE_EXPIRED":
      return "Le code a expiré.";
    case "INVALID_CODE":
      return "Le code est invalide.";
    case "USER_ACCOUNT_ALREADY_ACTIVATED":
      return "Le compte a déjà été activé.";
    case "USER_ACCOUNT_NOT_ACTIVATED":
      return "Vous n'avez pas encore activez votre compte.";

    // Token Errors
    case "REFRESH_TOKEN_EXPIRED":
      return "Votre session a expiré. Veuillez vous reconnecter.";
    case "REFRESH_TOKEN_NOT_FOUND":
      return "Authentification échouée. Veuillez vous reconnecter.";
    case "REFRESH_TOKEN_REVOKED":
      return "Authentification révoquée. Veuillez vous reconnecter.";

    // Invitation Errors
    case "INVITATION_NOT_FOUND":
      return "Il n'y a pas d'invitation valide.";
    case "INVITATION_CANCELLED":
      return "L'invitation a été annulée";
    case "INVITATION_CONSUMED":
      return "L'invitation a été acceptée. Vous ne pouvez la renvoyer ou la supprimer";
    case "INVITATION_ALREADY_ACCEPTED":
      return "Vous avez déjà accepté l'invitation. Veuillez vous connecter.";

    default:
      return "Une erreur est survenue";
  }
}
