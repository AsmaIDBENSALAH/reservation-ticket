import Layout from "@/components/sections/Layout";
import { Route } from "react-router-dom";
import Show from "./Show";

export const matchesRoutes = (
  <Route path="/matches" element={<Layout />}>
    <Route index element={<Show />} />
  </Route>
);
