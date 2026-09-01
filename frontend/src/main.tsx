import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { StatesProvider } from "./context/StatesContext.tsx";
import { I18nProvider } from "./i18n/I18nContext.tsx";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <StatesProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </StatesProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>
);