import { Navigate, Route } from "react-router";
import CompetitionCreate from "./CompetitionCreate";
import CompetitionDetails from "./Details";
import CompetitionList from "./CompetitionList";

export const competitionRoutes = (
  <>
    <Route path="/competition" element={<Navigate to="/competitions" replace />} />
    <Route path="/competitions" element={<CompetitionList />} />
    <Route path="/competitions/:id" element={<CompetitionDetails />} />
    <Route path="/competitions/create" element={<CompetitionCreate />} />
    <Route path="/competitions/edit/:id" element={<CompetitionCreate />} />
  </>
);
