import { Navigate, Route } from "react-router";
import Show from "./Show";
import Create from "./Create";

export const countryRoutes = (
  <>
    <Route path="/country" element={<Navigate to="/country/show" replace />} />
    <Route path="/country/show" element={<Show />} />
    <Route path="/country/create" element={<Create />} />
    <Route path="/country/edit/:id" element={<Create />} />
  </>
);
