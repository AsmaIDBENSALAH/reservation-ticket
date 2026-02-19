import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
