import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    const lang = i18n?.language || "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [i18n?.language]);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
