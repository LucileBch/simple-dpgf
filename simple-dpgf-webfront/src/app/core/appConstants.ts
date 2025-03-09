export const pagesUrl = {
  // main url
  HOME_PAGE: "/",
  SIGN_UP_PAGE: "/signup",
  SIGN_IN_PAGE: "/signin",
  ACCOUNT_VALIDATION_PAGE: "/account-activation",
  NEW_CODE_REQUEST: "/code-request",
  FORGOT_PASSWORD: "/forgot-password",
  INVITATION_LINK: "/invitation-link",

  // user url
  DASHBOARD_PAGE: "/user-dashboard",
  USER_PROFILE_PAGE: "/user-profile/:userId",

  // admin url
  ADMIN: "/admin",
  ADMIN_ORGANIZATIONS_PAGE: "/admin/organizations",
  ADMIN_ORGANIZATION_PAGE: "/admin/organization/:organizationId",

  // moe manager url
  MOE_MANAGER: "/moe/manager",
  MOE_MANAGER_PROJECTS_PAGE: "/moe/manager/projects",
  MOE_MANAGER_PROJECT_SUMMARY: "/moe/manager/projet/:dpgfId",
  MOE_MANAGER_TEAM_PAGE: "/moe/manager/:organizationId/team",
  MOE_MANAGER_INVITE_PAGE: "/moe/manager/invitation",

  // moe project owner url
  MOE_PROJECT_OWNER: "/moe",
  MOE_PROJECTS_PAGE: "/moe/projects",
  MOE_PROJECT: "/moe/projet/:dpgfId",

  // error url
  ERROR_404: "*",
};

//const BASE_URL = "http://localhost:8080/api";
const BASE_URL = "https://site--simple-dpgf-api--mrqlhtl4f2zp.code.run/api";
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
  ACCEPT_INVITATION: `${BASE_URL}/invitation/accept`,

  // authenticated endpoints (use-http)
  SIGN_OUT: "/auth/signout",

  // user
  USER_UPDATE_PROFILE: "/user",
  ORGANIZATION: "/organization",

  // adminUser
  ORGANIZATION_GELL_ALL: "/admin/organizations",
  ORGANIZATION_BY_ID: "/admin/organization",
  ORGANIZATION_GET_MEMBERS: "/organization",
  ORGANIZATION_UPDATE_LICENSE: "/organization",
  ORGANIZATION_DELETE_BY_ID: "/organization",

  // moe manager
  SEND_PROJECT_OWNER_INVITATION: "/invitation",
  GET_ORGANIZATION_INVITED_MEMBERS:
    "/organization/:organizationId/invitation-list",
  DELETE_ORGANIZATION_INVITATION: "/invitation/:invitationId",
  DELETE_ORGANIZATION_MEMBER:
    "/organization/:organizationId/invitation/:invitationId",
  GET_ALL_DPGF_BY_ORGANIZATION_ID: "/dpgf/:organizationId/list",

  // moe project owner
  CREATE_DPGF: "/dpgf",
  GET_ALL_DPGF: "/dpgf/list",
  GET_DPGF_BY_ID: "/dpgf/:dpgfId",
  UPDATE_DPGF_STATUS: "/dpgf/:dpgfId",
  DELETE_DPGF_BY_ID: "/dpgf/:dpgfId",
  CREATE_LOT: "/dpgf/:dpgfId/lot",
  DELETE_LOT: "/dpgf/:dpgfId/lot/:lotId",
  GET_ALL_LOT: "/dpgf/:dpgfId/lot-list",
  CREATE_PRODUCT: "/dpgf/:dpgfId/lot/:lotId/product",
  GET_ALL_PRODUCT: "/dpgf/:dpgfId/product-list",
  PUT_PRODUCT_BY_ID: "/dpgf/:dpgfId/product/:productId",
  DELETE_PRODUCT_BY_ID: "/dpgf/:dpgfId/product/:productId",
};
