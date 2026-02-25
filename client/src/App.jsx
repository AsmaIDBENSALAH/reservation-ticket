import { Route, Routes } from "react-router-dom";
import "./App.css";
import { homeRoutes } from "./pages/home/routes";
import { matchDetailRoutes } from "./pages/matchDetail/routes";
import ScrollToTop from "./utils/ScrollToTop";
import { championshipRoutes } from "./pages/championship/routes";
import { checkoutRoutes } from "./pages/checkout/routes";
import { matchesRoutes } from "./pages/matches/routes";
import Layout from "@/components/sections/Layout";
import CompetitionShow from "@/pages/competition/show.jsx";
import TicketsPage from "@/pages/tickets/index.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {homeRoutes}
        {matchDetailRoutes}
        {championshipRoutes}
        {checkoutRoutes}
        {matchesRoutes}
        <Route path="/competition" element={<Layout />}>
          <Route index element={<CompetitionShow />} />
        </Route>
        <Route path="/tickets" element={<Layout />}>
          <Route index element={<TicketsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
