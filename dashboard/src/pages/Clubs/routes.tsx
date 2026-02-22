import { Navigate, Route } from "react-router";
import Show from "./Show";
import Create from "./Create";
 
export const clubroutes = (
  <>
    <Route path="/club" element={<Navigate to="/clubs" replace />} />
    <Route path="/clubs" element={<Show />} />
    <Route path="/clubs/create" element={<Create />} />
  </>
)
