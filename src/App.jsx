import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import { Navigate } from "react-router-dom";
import OrderTable from "./components/Pages/Orders/Table";
import OrderCreate from "./components/Pages/Orders/Form/OrderCreate";
import ProductCreate from "./components/Pages/Products/Form/ProductCreate";
import ProductTable from "./components/Pages/Products/Table";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/orders" element={<OrderTable />} />
        <Route path="/orders/:id" element={<OrderCreate />} />
        <Route path="/orders/create" element={<OrderCreate />} />
        
        <Route path="/products" element={<ProductTable />} />
        <Route path="/products/:id" element={<ProductCreate />} />
        <Route path="/products/create" element={<ProductCreate />} />




        <Route path="/not-found" element={<div>404 page</div>} />

        <Route path="*" element={<Navigate to="/not-found" />} />
      </Route>
    </Routes>
  );
}
