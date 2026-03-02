import { Navigate, Route } from "react-router";
import CityCreate from "./CityCreate";
import CityDetails from "./Details";
import CityList from "./CityList";

export const cityRoutes = (
  <>
    <Route path="/city" element={<Navigate to="/cities" replace />} />
    <Route path="/cities" element={<CityList />} />
    <Route path="/cities/:id" element={<CityDetails />} />
    <Route path="/cities/create" element={<CityCreate />} />
    <Route path="/cities/edit/:id" element={<CityCreate />} />
  </>
);
