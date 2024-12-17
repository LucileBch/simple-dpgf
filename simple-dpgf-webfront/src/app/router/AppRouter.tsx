// ---------- APP Routing Logic ----------
// Packages imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Utils imports
import { pagesUrl } from "../utils/appConstants";

// Pages imports
import Home from "../pages/Home";
import SignIn from "../pages/(authentication)/SignIn";
import SignUp from "../pages/(authentication)/SignUp";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={pagesUrl.HOME_PAGE} element={<Home />} />
        <Route path={pagesUrl.SIGN_IN_PAGE} element={<SignIn />} />
        <Route path={pagesUrl.SIGN_UP_PAGE} element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}
