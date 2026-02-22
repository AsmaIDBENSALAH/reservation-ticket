import Layout from "@/components/sections/Layout";
import { Route } from "react-router-dom";
import Show from "./Show";

export const matchDetailRoutes = (
  <Route path="/match/:id" element={<Layout />}>
    <Route index element={<Show />} />
  </Route>
);
