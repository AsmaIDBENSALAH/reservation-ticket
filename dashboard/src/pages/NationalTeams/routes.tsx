import { Navigate, Route } from "react-router";
import Create from "./Create";
import Details from "./Details";
import Show from "./Show";

export const nationalTeamroutes = (
  <>
    <Route path="/national-team" element={<Navigate to="/national-teams" replace />} />
    <Route path="/national-teams" element={<Show />} />
    <Route path="/national-teams/:id" element={<Details />} />
    <Route path="/national-teams/create" element={<Create />} />
    <Route path="/national-teams/edit/:id" element={<Create />} />
  </>
);
