// ---------- APP Routing Logic ----------
// Packages imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Utils imports
import { pagesUrl } from "../core/appConstants";

// Pages imports
import Home from "../pages/Home";
import SignIn from "../pages/(authentication)/SignIn";
import SignUp from "../pages/(authentication)/SignUp";

import Footer from "../components/Footer";
import AccountValidation from "../pages/(authentication)/AccountValidation";
import MoeProjects from "../pages/(authenticated)/(projectowner)/MoeProjects";
import RequestCode from "../pages/(authentication)/RequestCode";
import Error from "../pages/Error";
import ForgotPassord from "../pages/(authentication)/ForgotPassword";
import ManagerTeam from "../pages/(authenticated)/(moemanager)/ManagerTeam";
import ManagerInvitation from "../pages/(authenticated)/(moemanager)/ManagerInvitation";
import UserDashboard from "../pages/(authenticated)/UserDashboard";
import { AdminOrganizationContextProvider } from "../core/contexts/admin-organization-context";
import AdminOrganizations from "../pages/(authenticated)/(admin)/AdminOrganizations";
import AdminOrganizationId from "../pages/(authenticated)/(admin)/AdminOrganizationId";
import UserProfile from "../pages/(authenticated)/UserProfile";
import { DialogContextProvider } from "../core/contexts/dialog-context";
import RequireAuth from "../components/rights/RequireAuth";
import RequireRole from "../components/rights/RequireRole";
import { RoleEnum } from "../core/enums/RoleEnum";
import ManagerProjects from "../pages/(authenticated)/(moemanager)/ManagerProjects";
import { OrganizationContextProvider } from "../core/contexts/organization-context";
import AcceptInvitation from "../pages/(authentication)/AcceptInvitation";
import Project from "../pages/(authenticated)/(projectowner)/Project";
import { DpgfContextProvider } from "../core/contexts/dpgf-context";
import ProjectSummary from "../pages/(authenticated)/(moemanager)/ProjectSummary";
import Header from "../components/headers/Header";
import React from "react";

export default function AppRouter(): React.JSX.Element {
  return (
    <Router>
      <Header />
      <OrganizationContextProvider>
        <DialogContextProvider>
          <Routes>
            {/* Not Authenticated */}
            <Route path={pagesUrl.HOME_PAGE} element={<Home />} />
            <Route path={pagesUrl.SIGN_UP_PAGE} element={<SignUp />} />
            <Route
              path={pagesUrl.ACCOUNT_VALIDATION_PAGE}
              element={<AccountValidation />}
            />
            <Route path={pagesUrl.NEW_CODE_REQUEST} element={<RequestCode />} />
            <Route path={pagesUrl.SIGN_IN_PAGE} element={<SignIn />} />
            <Route
              path={pagesUrl.FORGOT_PASSWORD}
              element={<ForgotPassord />}
            />
            <Route
              path={pagesUrl.INVITATION_LINK}
              element={<AcceptInvitation />}
            />

            {/* Authenticated */}
            {/* redirection after signin according to user role */}
            <Route
              path={pagesUrl.DASHBOARD_PAGE}
              element={
                <RequireAuth>
                  <UserDashboard />
                </RequireAuth>
              }
            />
            <Route
              path={pagesUrl.USER_PROFILE_PAGE}
              element={
                <RequireAuth>
                  <UserProfile />
                </RequireAuth>
              }
            />

            {/* Role : Admin */}
            <Route
              path={pagesUrl.ADMIN}
              element={
                <RequireAuth>
                  <RequireRole allowedRole={RoleEnum.ADMIN}>
                    <AdminOrganizationContextProvider>
                      <Outlet />
                    </AdminOrganizationContextProvider>
                  </RequireRole>
                </RequireAuth>
              }
            >
              <Route
                path={pagesUrl.ADMIN_ORGANIZATIONS_PAGE}
                element={<AdminOrganizations />}
              />
              <Route
                path={pagesUrl.ADMIN_ORGANIZATION_PAGE}
                element={
                  //<DialogContextProvider>
                  <AdminOrganizationId />
                  //</DialogContextProvider>
                }
              />
            </Route>

            {/* Role : MOE Manager */}
            <Route
              path={pagesUrl.MOE_MANAGER}
              element={
                <RequireAuth>
                  <RequireRole allowedRole={RoleEnum.ORGANIZATION_MANAGER}>
                    <DpgfContextProvider>
                      <Outlet />
                    </DpgfContextProvider>
                  </RequireRole>
                </RequireAuth>
              }
            >
              <Route
                path={pagesUrl.MOE_MANAGER_PROJECTS_PAGE}
                element={<ManagerProjects />}
              />
              <Route
                path={pagesUrl.MOE_MANAGER_PROJECT_SUMMARY}
                element={<ProjectSummary />}
              />
              <Route
                path={pagesUrl.MOE_MANAGER_TEAM_PAGE}
                element={<ManagerTeam />}
              />
              <Route
                path={pagesUrl.MOE_MANAGER_INVITE_PAGE}
                element={<ManagerInvitation />}
              />
            </Route>

            {/* Role : MOE Project Owner */}
            <Route
              path={pagesUrl.MOE_PROJECT_OWNER}
              element={
                <RequireAuth>
                  <RequireRole allowedRole={RoleEnum.PROJECT_OWNER}>
                    <DpgfContextProvider>
                      <Outlet />
                    </DpgfContextProvider>
                  </RequireRole>
                </RequireAuth>
              }
            >
              <Route
                path={pagesUrl.MOE_PROJECTS_PAGE}
                element={<MoeProjects />}
              />
              <Route path={pagesUrl.MOE_PROJECT} element={<Project />} />
            </Route>

            {/* 404 */}
            <Route path={pagesUrl.ERROR_404} element={<Error />} />
          </Routes>
        </DialogContextProvider>
      </OrganizationContextProvider>
      <Footer />
    </Router>
  );
}
