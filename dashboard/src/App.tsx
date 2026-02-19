import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { competitionRoutes } from "./pages/competition/routes";
import { nationalTeamroutes } from "./pages/NationalTeams/routes";
import { clubroutes } from "./pages/Clubs/routes";
import { matchRoutes } from "./pages/Matchs/routes";
import { cityRoutes } from "./pages/City/routes";
import { countryRoutes } from "./pages/Country/routes";
import { stadiumRoutes } from "./pages/stadium/routes";
import { studiumRoutes } from "./pages/Studium/routes";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import ShowMatches from "./pages/Matchs/Show";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/matches" element={<ShowMatches />} />
          {competitionRoutes}
          {nationalTeamroutes}
          {clubroutes}
          {matchRoutes}
          {cityRoutes}
          {countryRoutes}
          {stadiumRoutes}
          {studiumRoutes}
        </Route>
      </Routes>
    </Router>
  );
}
