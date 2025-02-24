import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ---------- APP Routing Logic ----------
// Packages imports
import { BrowserRouter as Router, Routes, Route, Outlet, } from "react-router-dom";
// Utils imports
import { pagesUrl } from "../core/appConstants";
// Pages imports
import Home from "../pages/Home";
import SignIn from "../pages/(authentication)/SignIn";
import SignUp from "../pages/(authentication)/SignUp";
import Footer from "../components/Footer";
import AccountValidation from "../pages/(authentication)/AccountValidation";
import MoaProjects from "../pages/(authenticated)/(projectowner)/MoaProjects";
import RequestCode from "../pages/(authentication)/RequestCode";
import Error from "../pages/Error";
import ForgotPassord from "../pages/(authentication)/ForgotPassword";
import ManagerTeam from "../pages/(authenticated)/(moamanager)/ManagerTeam";
import ManagerInvitation from "../pages/(authenticated)/(moamanager)/ManagerInvitation";
import UserDashboard from "../pages/(authenticated)/UserDashboard";
import { AdminOrganizationContextProvider } from "../core/contexts/admin-organization-context";
import AdminOrganizations from "../pages/(authenticated)/(admin)/AdminOrganizations";
import AdminOrganizationId from "../pages/(authenticated)/(admin)/AdminOrganizationId";
import UserProfile from "../pages/(authenticated)/UserProfile";
import { DialogContextProvider } from "../core/contexts/dialog-context";
import RequireAuth from "../components/rights/RequireAuth";
import RequireRole from "../components/rights/RequireRole";
import { RoleEnum } from "../core/enums/RoleEnum";
import ManagerProjects from "../pages/(authenticated)/(moamanager)/ManagerProjects";
import { OrganizationContextProvider } from "../core/contexts/organization-context";
import AcceptInvitation from "../pages/(authentication)/AcceptInvitation";
import Project from "../pages/(authenticated)/(projectowner)/Project";
import { DpgfContextProvider } from "../core/contexts/dpgf-context";
import ProjectSummary from "../pages/(authenticated)/(moamanager)/ProjectSummary";
import Header from "../components/headers/Header";
export default function AppRouter() {
    return (_jsxs(Router, { children: [_jsx(Header, {}), _jsx(OrganizationContextProvider, { children: _jsx(DialogContextProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: pagesUrl.HOME_PAGE, element: _jsx(Home, {}) }), _jsx(Route, { path: pagesUrl.SIGN_UP_PAGE, element: _jsx(SignUp, {}) }), _jsx(Route, { path: pagesUrl.ACCOUNT_VALIDATION_PAGE, element: _jsx(AccountValidation, {}) }), _jsx(Route, { path: pagesUrl.NEW_CODE_REQUEST, element: _jsx(RequestCode, {}) }), _jsx(Route, { path: pagesUrl.SIGN_IN_PAGE, element: _jsx(SignIn, {}) }), _jsx(Route, { path: pagesUrl.FORGOT_PASSWORD, element: _jsx(ForgotPassord, {}) }), _jsx(Route, { path: pagesUrl.INVITATION_LINK, element: _jsx(AcceptInvitation, {}) }), _jsx(Route, { path: pagesUrl.DASHBOARD_PAGE, element: _jsx(RequireAuth, { children: _jsx(UserDashboard, {}) }) }), _jsx(Route, { path: pagesUrl.USER_PROFILE_PAGE, element: _jsx(RequireAuth, { children: _jsx(UserProfile, {}) }) }), _jsxs(Route, { path: pagesUrl.ADMIN, element: _jsx(RequireAuth, { children: _jsx(RequireRole, { allowedRole: RoleEnum.ADMIN, children: _jsx(AdminOrganizationContextProvider, { children: _jsx(Outlet, {}) }) }) }), children: [_jsx(Route, { path: pagesUrl.ADMIN_ORGANIZATIONS_PAGE, element: _jsx(AdminOrganizations, {}) }), _jsx(Route, { path: pagesUrl.ADMIN_ORGANIZATION_PAGE, element: 
                                        //<DialogContextProvider>
                                        _jsx(AdminOrganizationId, {}) })] }), _jsxs(Route, { path: pagesUrl.MOA_MANAGER, element: _jsx(RequireAuth, { children: _jsx(RequireRole, { allowedRole: RoleEnum.ORGANIZATION_MANAGER, children: _jsx(DpgfContextProvider, { children: _jsx(Outlet, {}) }) }) }), children: [_jsx(Route, { path: pagesUrl.MOA_MANAGER_PROJECTS_PAGE, element: _jsx(ManagerProjects, {}) }), _jsx(Route, { path: pagesUrl.MOA_MANAGER_PROJECT_SUMMARY, element: _jsx(ProjectSummary, {}) }), _jsx(Route, { path: pagesUrl.MOA_MANAGER_TEAM_PAGE, element: _jsx(ManagerTeam, {}) }), _jsx(Route, { path: pagesUrl.MOA_MANAGER_INVITE_PAGE, element: _jsx(ManagerInvitation, {}) })] }), _jsxs(Route, { path: pagesUrl.MOA_PROJECT_OWNER, element: _jsx(RequireAuth, { children: _jsx(RequireRole, { allowedRole: RoleEnum.PROJECT_OWNER, children: _jsx(DpgfContextProvider, { children: _jsx(Outlet, {}) }) }) }), children: [_jsx(Route, { path: pagesUrl.MOA_PROJECTS_PAGE, element: _jsx(MoaProjects, {}) }), _jsx(Route, { path: pagesUrl.MOA_PROJECT, element: _jsx(Project, {}) })] }), _jsx(Route, { path: pagesUrl.ERROR_404, element: _jsx(Error, {}) })] }) }) }), _jsx(Footer, {})] }));
}
