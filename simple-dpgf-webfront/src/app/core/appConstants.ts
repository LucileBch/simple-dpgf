export const pagesUrl = {
  HOME_PAGE: "/",
  SIGN_UP_PAGE: "/signup",
  SIGN_IN_PAGE: "/signin",
  ACCOUNT_VALIDATION_PAGE: "/account-activation",
  NEW_CODE_REQUEST: "/code-request",
  FORGOT_PASSWORD: "/forgot-password",

  // user url
  DASHBOARD_PAGE: "/user-dashboard",
  USER_PROFILE_PAGE: "/user-profile",

  // admin url
  ADMIN: "/admin",
  ADMIN_ORGANIZATIONS_PAGE: "/admin/organizations",
  ADMIN_ORGANIZATION_PAGE: "/admin/organization/:organizationId",

  // TODO : à revoir
  ADMIN_DASHBOARD_PAGE: "/admin-dashboard",
  MOA_MANAGER_DASHBOARD_PAGE: "/moa-manager-dashboard",
  MOA_MANAGER_TEAM_PAGE: "/moa-manager-dashboard/team",

  MOA_MANAGER_INVITE_PAGE: "/moa-manager/invitation",
  MOA_DASHBOARD_PAGE: "/moa-dashboard",
  ERROR_404: "*",
};

const BASE_URL = "http://localhost:8080/api";
export const apiEndpoints = {
  // auth
  // let as it is because I don't use use-http because user is not authenticated
  SIGN_UP: `${BASE_URL}/auth/signup`,
  USER_ACCOUNT_VALIDATION: `${BASE_URL}/auth/activate-account`,
  USER_REQUEST_NEW_CODE: `${BASE_URL}/auth/code-request`,
  SIGN_IN: `${BASE_URL}/auth/signin`,
  REQUEST_NEW_PASSWORD_CODE: `${BASE_URL}/auth/update-password-request`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/generate-new-password`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,

  // authenticated endpoints (use-http)
  SIGN_OUT: "/auth/signout",

  // user
  USER: "/user",

  // adminUser
  GET_ALL_ORGANIZATIONS: "/admin/organizations",
  ORGANIZATION: "/admin/organization",
  GET_MEMBERS: "/organization",

  // organization manager
  SEND_PROJECT_OWNER_INVITATION: "http://localhost:8080/api/invitation",
  GET_ORGANIZATION_MEMBERS:
    "http://localhost:8080/api/organization/:organizationId/team",
};
