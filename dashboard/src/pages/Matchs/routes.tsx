import { Navigate, Route } from "react-router";
import Create from "./Create";
import Details from "./Details";
import Show from "./Show";

export const matchRoutes = (
  <>
    <Route path="/match" element={<Navigate to="/matches" replace />} />
    <Route path="/matchs" element={<Navigate to="/matches" replace />} />
    <Route path="/matches" element={<Show />} />
    <Route path="/matches/:id" element={<Details />} />
    <Route path="/matches/create" element={<Create />} />
    <Route path="/matches/edit/:id" element={<Create />} />
  </>
);
