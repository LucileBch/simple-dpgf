export function getErrorMessage(errorMessage: string): string {
  switch (errorMessage) {
    // Global Errors
    case "ENDPOINT_DOES_NOT_EXISTS":
      return "L'url demandée n'existe pas.";
    case "UNAUTHORIZED":
      return "Vous n'avez pas l'autorisation.";
    case "FORBIDDEN":
      return "Vous n'avez pas l'accès.";
    case "EMAIL_OR_PASSWORD_INCORRECT":
      return "Utilisateur non reconnu.";

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
    case "USER_OLD_PASSWORD_REQUIRED":
      return "Votre mot de passe est requis";
    case "USER_WRONG_PASSWORD":
      return "Mot de passe incorrect, veuillez re-essayer";
    case "USER_NEW_PASSWORD_EQUALS_OLD":
      return "Le nouveau mot de passe doit être différent de l'ancien";

    // validation rules
    case "EMAIL_FIELD_TOO_LONG":
      return "L'email est trop long";
    case "LAST_NAME_FIELD_TOO_LONG":
      return "Le prénom est trop long";
    case "NAME_FIELD_TOO_LONG":
      return "Le nom est trop long";
    case "INVALID_EMAIL_FORMAT":
      return "Le format de l'email est invalide";
    case "EMAIL_REQUIRED":
      return "Email requis";
    case "PASSWORD_REQUIRED":
      return "Le mot de passe est requis";
    case "ACTIVATION_CODE_REQUIRED":
      return "Le code d'activation est requis";
    case "PASSWORD_BETWEEN_8_AND_20":
      return "Le mot de passe doit contenir entre 8 et 20 caractères";
    case "PASSWORD_ONE_UPPERCASE":
      return "Le mot de passe doit contenir au moins une majuscule";
    case "PASSWORD_ONE_LOWERCASE":
      return "Le mot de passe doit contenir au moins une minuscule";
    case "PASSWORD_ONE_NUMBER":
      return "Le mot de passe doit contenir au moins un chiffre";
    case "PASSWORD_ONE_SPECIAL_CHAR":
      return "Le mot de passe doit contenir au moins un charactère spécial";
    case "MUST_BE_POSITIV_NUMBER":
      return "Le chiffre doit être supérieur à zéro";
    case "SOME_ERROR":
      return "Une erreur s'est produite";

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

    // Organization Errors
    case "NO_MORE_USER_LICENSE":
      return "Vous avez atteint le nombre maximum de collaborateurs";
    case "NO_MORE_PROJECT_LICENSE":
      return "Vous avez atteint le nombre maximum de projets";
    case "USER_NOT_IN_ORGANIZATION":
      return "Vous ne faites pas partie de l'organisation";

    // Dpgf Errors
    case "DPGF_NOT_FOUND":
      return "Le Dpgf n'existe pas";
    case "DPGF_ALREADY_DELETED":
      return "Le Dpgf a déjà été supprimé";
    case "DPGF_SHOULD_BE_ARCHIVED":
      return "Le Dpgf doit être archivé avant de pouvoir être supprimé";
    case "DPGF_ARCHIVED":
      return "Le Dpgf est archivé";
    case "LOT_ALREADY_EXISTS":
      return "Ce lot existe déjà dans votre DPGF";
    case "PRODUCT_NOT_FOUND":
      return "Ce poste n'existe pas dans votre DPGF";
    case "DPGF_TOTAL_NEGATIV":
      return "Le total ne peut être négatif";

    default:
      return "Une erreur est survenue";
  }
}
