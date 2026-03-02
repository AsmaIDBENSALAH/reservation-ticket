import { Navigate, Route } from "react-router";
import Create from "./Create";
import Details from "./Details";
import Show from "./Show";

export const clubroutes = (
  <>
    <Route path="/club" element={<Navigate to="/clubs" replace />} />
    <Route path="/clubs" element={<Show />} />
    <Route path="/clubs/:id" element={<Details />} />
    <Route path="/clubs/create" element={<Create />} />
    <Route path="/clubs/edit/:id" element={<Create />} />
  </>
);
