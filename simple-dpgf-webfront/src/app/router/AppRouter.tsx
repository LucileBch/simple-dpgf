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
        <Route path={pagesUrl.SIGN_IN_PAGE} element={<SignIn />} />

        {/* Authenticated */}
        <Route path={pagesUrl.MOA_DASHBOARD_PAGE} element={<MoaDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}
