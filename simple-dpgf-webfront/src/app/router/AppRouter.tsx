// ---------- APP Routing Logic ----------
// Packages imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Utils imports
import { pagesUrl } from "../core/appConstants";

// Pages imports
import Home from "../pages/Home";
import SignIn from "../pages/(authentication)/SignIn";
import SignUp from "../pages/(authentication)/SignUp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccountValidation from "../pages/(authentication)/AccountValidation";
import MoaDashboard from "../pages/(authenticated)/MoaDashboard";
import RequestCode from "../pages/(authentication)/RequestCode";
import Error from "../pages/Error";
import ForgotPassord from "../pages/(authentication)/ForgotPassword";
import MoaManagerDashboard from "../pages/(authenticated)/(moamanager)/MoaManagerDashboard";
import MoaManagerTeam from "../pages/(authenticated)/(moamanager)/MoaManagerTeam";

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Authentication */}
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
        <Route
          path={pagesUrl.MOA_MANAGER_DASHBOARD_PAGE}
          element={<MoaManagerDashboard />}
        />
        <Route
          path={pagesUrl.MOA_MANAGER_TEAM_PAGE}
          element={<MoaManagerTeam />}
        />

        <Route path={pagesUrl.MOA_DASHBOARD_PAGE} element={<MoaDashboard />} />

        {/* 404 */}
        <Route path={pagesUrl.ERROR_404} element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}
