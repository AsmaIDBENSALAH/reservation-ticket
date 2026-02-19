import { Navigate, Route } from "react-router";
import CityCreate from "./CityCreate";
import CityList from "./CityList";

export const cityRoutes = (
  <>
    <Route path="/city" element={<Navigate to="/cities" replace />} />
    <Route path="/cities" element={<CityList />} />
    <Route path="/cities/create" element={<CityCreate />} />
  </>
);
