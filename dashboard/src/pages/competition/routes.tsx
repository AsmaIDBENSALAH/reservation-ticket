import { Navigate, Route } from "react-router";
import CompetitionCreate from "./CompetitionCreate";
import CompetitionList from "./CompetitionList";

export const competitionRoutes = (
  <>
    <Route path="/competition" element={<Navigate to="/competitions" replace />} />
    <Route path="/competitions" element={<CompetitionList />} />
    <Route path="/competitions/create" element={<CompetitionCreate />} />
  </>
);
