import { Navigate, Route } from "react-router";
import Show from "./Show";
import Create from "./Create";
 
export const nationalTeamroutes = (
  <>
    <Route path="/national-team" element={<Navigate to="/national-teams" replace />} />
    <Route path="/national-teams" element={<Show />} />
    <Route path="/national-teams/create" element={<Create />} />
  </>
)
