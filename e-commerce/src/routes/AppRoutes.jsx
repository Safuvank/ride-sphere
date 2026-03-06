import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import Landing from "../Pages/Authantication/Non Authantication/Landing/Landing";
import Product from "../Pages/Authantication/Non Authantication/Products/Product";
import AboutPage from "../Pages/Authantication/Non Authantication/Landing/About";
import Login from "../Pages/Authantication/Login";
import SignUpPage from "../Pages/Authantication/SignUp";
import ProductDetails from "../Pages/Authantication/Non Authantication/Products/ProductDetails";
import Cart from "../Pages/Authantication/Non Authantication/Cart/Cart";
import WishList from "../Pages/Authantication/Non Authantication/WishList/WishList";
import Payment from "../Pages/Authantication/Non Authantication/Payment/Payment";
import OrderSuccess from "../Pages/Authantication/Non Authantication/Payment/OrderSuccess";
import OrderHistory from "../Pages/Authantication/Non Authantication/Payment/OrderHistory";
import ErrorResponse from "../Pages/Authantication/Non Authantication/404/ErrorResponse";
import AdminLayout from "../Admin/components/AdminLayout";
import Dashboard from "../Admin/pages/Dashboard";
import Users from "../Admin/pages/Users";
import Orders from "../Admin/pages/Orders";
import Products from "../Admin/pages/Products";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<Product />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* User Protected */}
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        }
      />
      <Route
        path="/ordersuccess"
        element={
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        }
      />
      <Route
        path="/orderhistory"
        element={
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Route>

      <Route path="*" element={<ErrorResponse />} />
    </Routes>
  );
}
