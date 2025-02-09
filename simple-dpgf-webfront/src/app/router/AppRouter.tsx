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
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccountValidation from "../pages/(authentication)/AccountValidation";
import MoaDashboard from "../pages/(authenticated)/(projectowner)/MoaDashboard";
import RequestCode from "../pages/(authentication)/RequestCode";
import Error from "../pages/Error";
import ForgotPassord from "../pages/(authentication)/ForgotPassword";
import ManagerDashboard from "../pages/(authenticated)/(moamanager)/ManagerDashboard";
import ManagerTeam from "../pages/(authenticated)/(moamanager)/ManagerTeam";
import InviteProjectOwner from "../pages/(authenticated)/(moamanager)/InviteProjectOwner";
import UserDashboard from "../pages/(authenticated)/UserDashboard";
import { OrganizationContextProvider } from "../core/contexts/organization-context";
import AdminOrganizations from "../pages/(authenticated)/(admin)/AdminOrganizations";
import AdminOrganizationId from "../pages/(authenticated)/(admin)/AdminOrganizationId";
import UserProfile from "../pages/(authenticated)/UserProfile";
import { DialogContextProvider } from "../core/contexts/dialog-context";
import RequireAuth from "../components/rights/RequireAuth";
import RequireRole from "../components/rights/RequireRole";
import { RoleEnum } from "../core/enums/RoleEnum";

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Header />
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
        <Route path={pagesUrl.FORGOT_PASSWORD} element={<ForgotPassord />} />

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
                <OrganizationContextProvider>
                  <Outlet />
                </OrganizationContextProvider>
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
              <DialogContextProvider>
                <AdminOrganizationId />
              </DialogContextProvider>
            }
          />
        </Route>

        {/* Role : MOA Manager */}
        <Route
          path={pagesUrl.MOA_MANAGER}
          element={
            <RequireAuth>
              <RequireRole allowedRole={RoleEnum.ORGANIZATION_MANAGER}>
                <Outlet />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route
            path={pagesUrl.MOA_MANAGER_DASHBOARD_PAGE}
            element={<ManagerDashboard />}
          />
          <Route
            path={pagesUrl.MOA_MANAGER_TEAM_PAGE}
            element={<ManagerTeam />}
          />
          <Route
            path={pagesUrl.MOA_MANAGER_INVITE_PAGE}
            element={<InviteProjectOwner />}
          />
        </Route>

        {/* Role : MOA Project Owner */}
        <Route
          path={pagesUrl.MOA_PROJECT_OWNER}
          element={
            <RequireAuth>
              <RequireRole allowedRole={RoleEnum.PROJECT_OWNER}>
                <Outlet />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route
            path={pagesUrl.MOA_DASHBOARD_PAGE}
            element={<MoaDashboard />}
          />
        </Route>

        {/* 404 */}
        <Route path={pagesUrl.ERROR_404} element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}
