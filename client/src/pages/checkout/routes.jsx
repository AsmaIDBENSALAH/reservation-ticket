import Layout from "@/components/sections/Layout";
import { Route } from "react-router-dom";
import Show from "./Show";

export const checkoutRoutes = (
  <Route path="/checkout" element={<Layout />}>
    <Route index element={<Show />} />
    <Route path=":id" element={<Show />} />
  </Route>
);
