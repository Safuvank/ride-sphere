import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProviderComp } from "./Common/Context/ProviderComp.jsx";
import { AuthProvider } from "./Pages/Authantication/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProviderComp>
        <App />
      </ProviderComp>
    </AuthProvider>
  </StrictMode>
);
