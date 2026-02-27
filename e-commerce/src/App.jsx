import { BrowserRouter as Router } from "react-router-dom";
import LayoutWrapper from "./routes/LayoutWrapper";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./Pages/Authantication/ScroltoBottom";

export default function App() {
  return (
    <Router>
      <LayoutWrapper>
        <AppRoutes />
        <ScrollToTop />
      </LayoutWrapper>
    </Router>
  );
}
