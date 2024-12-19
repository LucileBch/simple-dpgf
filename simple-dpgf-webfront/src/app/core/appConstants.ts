export const pagesUrl = {
  HOME_PAGE: "/",
  SIGN_UP_PAGE: "/signup",
  SIGN_IN_PAGE: "/signin",
  ACCOUNT_VALIDATION_PAGE: "/account-activation",
  NEW_CODE_REQUEST: "/code-request",
  FORGOT_PASSWORD: "/forgot-password",
  MOA_DASHBOARD_PAGE: "/moa-dashboard",
  ERROR_404: "*",
};

export const apiEndpoints = {
  SIGN_UP: "http://localhost:8080/user/signup",
  USER_ACCOUNT_VALIDATION: "http://localhost:8080/user/activate-account",
  USER_REQUEST_NEW_CODE: "http://localhost:8080/user/code-request",
  SIGN_IN: "http://localhost:8080/user/signin",
  REQUEST_NEW_PASSWORD_CODE:
    "http://localhost:8080/user/update-password-request",
  FORGOT_PASSWORD: "http://localhost:8080/user/generate-new-password",
};
