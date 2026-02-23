import { Navigate, Route } from "react-router";
import Show from "./Show";
import Create from "./Create";
 
export const matchRoutes = (
  <>
    <Route path="/match" element={<Navigate to="/matches" replace />} />
    <Route path="/matchs" element={<Navigate to="/matches" replace />} />
    <Route path="/matches" element={<Show />} />
    <Route path="/matches/create" element={<Create />} />
    <Route path="/matches/edit/:id" element={<Create />} />
  </>
);
