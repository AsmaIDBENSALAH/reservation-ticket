import Layout from "@/components/sections/Layout";
import { Route } from "react-router-dom";
import Show from "./Show";

export const championshipRoutes = (
  <Route path="/championship/:championshipName" element={<Layout />}>
    <Route index element={<Show />} />
  </Route>
);
