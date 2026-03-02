import { Navigate, Route } from "react-router";
import StadiumCreate from "./StadiumCreate";
import StadiumDetails from "./Details";
import StadiumList from "./StadiumList";

export const stadiumRoutes = (
  <>
    <Route path="/stadium" element={<Navigate to="/stadiums" replace />} />
    <Route path="/stadiums" element={<StadiumList />} />
    <Route path="/stadiums/:id" element={<StadiumDetails />} />
    <Route path="/stadiums/create" element={<StadiumCreate />} />
    <Route path="/stadiums/edit/:id" element={<StadiumCreate />} />
  </>
);
