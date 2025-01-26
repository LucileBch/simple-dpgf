export const pagesUrl = {
  HOME_PAGE: "/",
  SIGN_UP_PAGE: "/signup",
  SIGN_IN_PAGE: "/signin",
  ACCOUNT_VALIDATION_PAGE: "/account-activation",
  NEW_CODE_REQUEST: "/code-request",
  FORGOT_PASSWORD: "/forgot-password",
  MOA_MANAGER_DASHBOARD_PAGE: "/moa-manager-dashboard",
  MOA_MANAGER_TEAM_PAGE: "/moa-manager-dashboard/team",
  MOA_MANAGER_INVITE_PAGE: "/moa-manager/invitation",
  MOA_DASHBOARD_PAGE: "/moa-dashboard",
  ERROR_404: "*",
};

const BASE_API_URL = "http://localhost:8080/api";
export const apiEndpoints = {
  // auth
  SIGN_UP: "http://localhost:8080/api/auth/signup",
  USER_ACCOUNT_VALIDATION: "http://localhost:8080/api/auth/activate-account",
  USER_REQUEST_NEW_CODE: "http://localhost:8080/api/auth/code-request",
  SIGN_IN: "http://localhost:8080/api/auth/signin",
  REQUEST_NEW_PASSWORD_CODE:
    "http://localhost:8080/api/auth/update-password-request",
  FORGOT_PASSWORD: "http://localhost:8080/api/auth/generate-new-password",

  // refres token
  REFRESH_TOKEN: "http://localhost:8080/api/auth/refresh-token",

  // user
  getCurrentUser: `${BASE_API_URL}/user-details`,

  // organization manager
  SEND_PROJECT_OWNER_INVITATION: "http://localhost:8080/api/invitation",
  GET_ORGANIZATION_MEMBERS:
    "http://localhost:8080/api/organization/:organizationId/team",
};
