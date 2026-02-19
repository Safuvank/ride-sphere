import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProviderComp } from "./Common/Context/ProviderComp.jsx";
import { AuthProvider } from "./Pages/Authantication/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProviderComp>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="custom-toast"
        />
        <App />
      </ProviderComp>
    </AuthProvider>
  </StrictMode>,
);
