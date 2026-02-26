import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navLinks = [
    {
      to: "/",
      label: t("header.home"),
    },
    {
      to: "/matches",
      label: t("matches.title"),
    },
    {
      to: "/competition",
      label: t("competition.listTitle"),
    },
    {
      to: "/#faq",
      label: "FAQ",
    },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Trust bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-2">
        <div className="max-w-[1024px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span>{t("header.trust1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{t("header.trust2")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{t("header.trust3")}</span>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-emerald-600 sticky top-0 z-50 shadow-sm">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1024px] mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Logo */}
              <Link to="/" className="flex items-center min-w-0" aria-label="Go to home">
                <div className="min-w-0">
                  <h1 className="text-xl font-bold text-gray-900">
                    <span className="text-emerald-600">Chri</span>
                    tickets
                  </h1>
                  <p className="hidden sm:block text-xs text-gray-500 uppercase tracking-wide truncate">
                    {t("header.tagline")}
                  </p>
                </div>
              </Link>

              {/* Right Side */}
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <button
                  type="button"
                  aria-label="Open menu"
                  className="md:hidden text-gray-700 hover:text-emerald-600 text-xl"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  ☰
                </button>
                <Link
                  to="/tickets"
                  className="hidden sm:flex text-sm text-gray-700 hover:text-emerald-600 items-center gap-1"
                >
                  🎫 {t("header.trackTickets")}
                </Link>
                <div className="flex">
                  <select
                    value={i18n?.language || "en"}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    className="px-2 sm:px-3 py-1 border border-gray-300 text-xs sm:text-sm text-gray-700 hover:border-emerald-600 bg-white focus:outline-none"
                  >
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                    <option value="ar">AR</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-[1024px] mx-auto relative">
          <nav className="hidden md:flex gap-1 py-3">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-white px-4 py-2 hover:bg-emerald-700 rounded text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-black/50"
            onClick={closeSidebar}
          />
          <aside className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                type="button"
                aria-label="Close menu"
                className="text-gray-600 hover:text-emerald-600 text-xl"
                onClick={closeSidebar}
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={`sidebar-${item.to}`}
                  to={item.to}
                  onClick={closeSidebar}
                  className="text-gray-800 px-3 py-2 rounded text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
