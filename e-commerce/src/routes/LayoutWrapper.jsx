import { useLocation } from "react-router-dom";
import Navbar from "../Common/Layout/Navbar/Navbar";
import Footer from "../Common/Layout/Navbar/Footer";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideLayoutPaths = ["/login", "/signup", "/admin"];

  const shouldHideLayout = hideLayoutPaths.some((path) =>
    location.pathname.startsWith(path),
  );
  return <>
  {!shouldHideLayout && <Navbar/>}
  {children}
  {!shouldHideLayout && <Footer/>}
  </>;
}

export default LayoutWrapper;
