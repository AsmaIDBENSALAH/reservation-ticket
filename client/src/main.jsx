import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import keycloak from "./keycloak";
import "./i18n";

keycloak
  .init({ onLoad: "check-sso", checkLoginIframe: false })
  .then(() => {
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </StrictMode>,
    );
  })
  .catch((err) => {
    console.error("Keycloak init failed", err);
  });
