import { Routes } from "react-router-dom";
import "./App.css";
import { homeRoutes } from "./pages/home/routes";
import { matchDetailRoutes } from "./pages/matchDetail/routes";
import ScrollToTop from "./utils/ScrollToTop";
import { championshipRoutes } from "./pages/championship/routes";
import { checkoutRoutes } from "./pages/checkout/routes";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {homeRoutes}
        {matchDetailRoutes}
        {championshipRoutes}
        {checkoutRoutes}
      </Routes>
    </>
  );
}

export default App;
