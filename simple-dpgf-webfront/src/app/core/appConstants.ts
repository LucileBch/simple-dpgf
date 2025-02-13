export const pagesUrl = {
  // main url
  HOME_PAGE: "/",
  SIGN_UP_PAGE: "/signup",
  SIGN_IN_PAGE: "/signin",
  ACCOUNT_VALIDATION_PAGE: "/account-activation",
  NEW_CODE_REQUEST: "/code-request",
  FORGOT_PASSWORD: "/forgot-password",

  // user url
  DASHBOARD_PAGE: "/user-dashboard",
  USER_PROFILE_PAGE: "/user-profile/:userId",

  // admin url
  ADMIN: "/admin",
  ADMIN_ORGANIZATIONS_PAGE: "/admin/organizations",
  ADMIN_ORGANIZATION_PAGE: "/admin/organization/:organizationId",

  // moa manager url
  MOA_MANAGER: "/moa/manager",
  MOA_MANAGER_PROJECTS_PAGE: "/moa/manager/:organizationId/projects",
  MOA_MANAGER_TEAM_PAGE: "/moa/manager/team",
  MOA_MANAGER_INVITE_PAGE: "/moa/manager/invitation",

  // moa project owner url
  MOA_PROJECT_OWNER: "/moa",
  MOA_DASHBOARD_PAGE: "/moa/dashboard",

  // error url
  ERROR_404: "*",
};

const BASE_URL = "http://localhost:8080/api";
export const apiEndpoints = {
  // not authenticated
  // let as it is because I don't use use-http because user is not authenticated
  SIGN_UP: `${BASE_URL}/auth/signup`,
  USER_ACCOUNT_VALIDATION: `${BASE_URL}/auth/activate-account`,
  USER_REQUEST_NEW_CODE: `${BASE_URL}/auth/new-code-request`,
  SIGN_IN: `${BASE_URL}/auth/signin`,
  REQUEST_NEW_PASSWORD_CODE: `${BASE_URL}/auth/forgot-password-request`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/create-new-password`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,

  // authenticated endpoints (use-http)
  SIGN_OUT: "/auth/signout",

  // user
  USER_UPDATE_PROFILE: "/user",

  // adminUser
  ORGANIZATION_GELL_ALL: "/admin/organizations",
  ORGANIZATION_BY_ID: "/admin/organization",
  ORGANIZATION_GET_MEMBERS: "/organization",
  ORGANIZATION_UPDATE_LICENSE: "/organization",
  ORGANIZATION_DELETE_BY_ID: "/organization",

  // moa manager
  SEND_PROJECT_OWNER_INVITATION: "/invitation",
  GET_ORGANIZATION_MEMBERS: "/organization/:organizationId/team",

  // moa project owner
};
