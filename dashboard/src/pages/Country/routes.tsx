import { Navigate, Route } from "react-router";
import Create from "./Create";
import Details from "./Details";
import Show from "./Show";

export const countryRoutes = (
  <>
    <Route path="/country" element={<Navigate to="/country/show" replace />} />
    <Route path="/country/show" element={<Show />} />
    <Route path="/country/:id" element={<Details />} />
    <Route path="/country/show/:id" element={<Details />} />
    <Route path="/country/create" element={<Create />} />
    <Route path="/country/edit/:id" element={<Create />} />
  </>
);
