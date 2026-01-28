// import React, { useContext } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { AuthContext } from "./Pages/Authantication/AuthContext";
// import Navbar from "./Common/Layout/Navbar/Navbar";
// import Footer from "./Common/Layout/Navbar/Footer";
// import Landing from "./Pages/Authantication/Non Authantication/Landing/Landing";
// import Product from "./Pages/Authantication/Non Authantication/Products/Product";
// import AboutPage from "./Pages/Authantication/Non Authantication/Landing/About";
// import Login from "./Pages/Authantication/Login";
// import SignUpPage from "./Pages/Authantication/SignUp";
// import ProductDetails from "./Pages/Authantication/Non Authantication/Products/ProductDetails";
// import ErrorResponse from "./Pages/Authantication/Non Authantication/404/ErrorResponse";
// import Cart from "./Pages/Authantication/Non Authantication/Cart/Cart";
// import WishList from "./Pages/Authantication/Non Authantication/WishList/WishList";
// import Payment from "./Pages/Authantication/Non Authantication/Payment/Payment";
// import OrderSuccess from "./Pages/Authantication/Non Authantication/Payment/OrderSuccess";
// import OrderHistory from "./Pages/Authantication/Non Authantication/Payment/OrderHistory";
// import ScrollToTop from "./Pages/Authantication/ScroltoBottom";
// import AdminLayout from "./Admin/AdminLayout";
// import Overview from "./Admin/Overview";
// import Users from "./Admin/Users";
// import { Settings } from "lucide-react";
// import Products from "./Admin/Products";
// import ManageOrders from "./Admin/ManageOrders";

// // Admin imports

// function PrivateRoute({ element }) {
//   const { user } = useContext(AuthContext);
//   return user ? element : <Login />;
// }

// function LayoutWrapper({ children }) {
//   const location = useLocation();
//   const hideLayoutPaths = ["/login", "/signup", "/admin"];
//   const shouldHideLayout = hideLayoutPaths.some((path) =>
//     location.pathname.startsWith(path)
//   );

//   return (
//     <>
//       {!shouldHideLayout && <Navbar />}
//       {children}
//       {!shouldHideLayout && <Footer />}
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <LayoutWrapper>
//         <Routes>
//           {/* User Side */}
//           <Route path="/" element={<Landing />} />
//           <Route path="/products" element={<Product />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
//           <Route
//             path="/wishlist"
//             element={<PrivateRoute element={<WishList />} />}
//           />
//           <Route
//             path="/payment"
//             element={<PrivateRoute element={<Payment />} />}
//           />
//           <Route
//             path="/ordersuccess"
//             element={<PrivateRoute element={<OrderSuccess />} />}
//           />
//           <Route
//             path="/orderhistory"
//             element={<PrivateRoute element={<OrderHistory />} />}
//           />

//           {/* Admin Dashboard Routes */}

//           <Route
//             path="/admin"
//             element={<PrivateRoute element={<AdminLayout />} />}
//           >
//             <Route index element={<Navigate to="/admin/overview" />} />
//             <Route path="overview" element={<Overview />} />
//             <Route path="users" element={<Users />} />
//             <Route path="manageorders" element={<ManageOrders />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="products" element={<Products />} />
//           </Route>

//           <Route path="*" element={<ErrorResponse />} />
//         </Routes>
//         <ScrollToTop />
//       </LayoutWrapper>
//     </Router>
//   );
// }































import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./Pages/Authantication/AuthContext";
import Navbar from "./Common/Layout/Navbar/Navbar";
import Footer from "./Common/Layout/Navbar/Footer";
import Landing from "./Pages/Authantication/Non Authantication/Landing/Landing";
import Product from "./Pages/Authantication/Non Authantication/Products/Product";
import AboutPage from "./Pages/Authantication/Non Authantication/Landing/About";
import Login from "./Pages/Authantication/Login";
import SignUpPage from "./Pages/Authantication/SignUp";
import ProductDetails from "./Pages/Authantication/Non Authantication/Products/ProductDetails";
import ErrorResponse from "./Pages/Authantication/Non Authantication/404/ErrorResponse";
import Cart from "./Pages/Authantication/Non Authantication/Cart/Cart";
import WishList from "./Pages/Authantication/Non Authantication/WishList/WishList";
import Payment from "./Pages/Authantication/Non Authantication/Payment/Payment";
import OrderSuccess from "./Pages/Authantication/Non Authantication/Payment/OrderSuccess";
import OrderHistory from "./Pages/Authantication/Non Authantication/Payment/OrderHistory";
import ScrollToTop from "./Pages/Authantication/ScroltoBottom";
import AdminLayout from "./Admin/AdminLayout";
import Overview from "./Admin/Overview";
import Users from "./Admin/Users";
import { Settings } from "lucide-react";
import Products from "./Admin/Products";
import ManageOrders from "./Admin/ManageOrders";


// ✅ Private Route for logged-in users
function PrivateRoute({ element }) {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
}

// ✅ Admin-only Route Protection
function AdminRoute({ element }) {
  const { user } = useContext(AuthContext);
  const isAdmin =
    user && user.email === "admin@ridesphere.com" && user.password === "123456";

  return isAdmin ? element : <Navigate to="/login" />;
}

// ✅ Layout Wrapper (Navbar + Footer)
function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideLayoutPaths = ["/login", "/signup", "/admin"];
  const shouldHideLayout = hideLayoutPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* 🛒 User Protected Routes */}
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route
            path="/wishlist"
            element={<PrivateRoute element={<WishList />} />}
          />
          <Route
            path="/payment"
            element={<PrivateRoute element={<Payment />} />}
          />
          <Route
            path="/ordersuccess"
            element={<PrivateRoute element={<OrderSuccess />} />}
          />
          <Route
            path="/orderhistory"
            element={<PrivateRoute element={<OrderHistory />} />}
          />

          {/* 🧑‍💻 Admin Protected Routes */}
          <Route path="/admin" element={<AdminRoute element={<AdminLayout />} />}>
            <Route index element={<Navigate to="/admin/overview" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<Users />} />
            <Route path="manageorders" element={<ManageOrders />} />
            <Route path="settings" element={<Settings />} />
            <Route path="products" element={<Products />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<ErrorResponse />} />
        </Routes>
        <ScrollToTop />
      </LayoutWrapper>
    </Router>
  );
}
