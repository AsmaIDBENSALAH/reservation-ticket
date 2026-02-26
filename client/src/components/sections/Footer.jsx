import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: t("footer.company"),
      links: [
        { label: "About us", to: "/" },
        { label: "Contact Us", to: "/" },
        { label: "Privacy policy", to: "/" },
        { label: "Information", to: "/" },
        { label: "FAQ", to: "/" },
        { label: "Disclaimer", to: "/" },
        { label: "Returning", to: "/" },
        { label: "News", to: "/" },
        { label: "Cookie Policy", to: "/" },
      ],
    },
    {
      title: t("footer.topCategories"),
      links: [
        { label: "Premier League tickets", to: "/matches" },
        { label: "FA Cup tickets", to: "/matches" },
        { label: "EFL Cup tickets", to: "/matches" },
        { label: "Champions League tickets", to: "/matches" },
        { label: "Europa League tickets", to: "/matches" },
        { label: "Euro Cup tickets", to: "/matches" },
        { label: "Europa League tickets", to: "/matches" },
        { label: "FA Cup Final tickets", to: "/matches" },
        { label: "Community Shield tickets", to: "/matches" },
      ],
    },
    {
      title: t("footer.bestSellers"),
      links: [
        { label: "Arsenal tickets", to: "/matches" },
        { label: "Manchester United tickets", to: "/matches" },
        { label: "Liverpool tickets", to: "/matches" },
        { label: "Chelsea tickets", to: "/matches" },
        { label: "Tottenham tickets", to: "/matches" },
        { label: "Barcelona tickets", to: "/matches" },
        { label: "Champions League final tickets", to: "/matches" },
        { label: "England Football tickets", to: "/matches" },
        { label: "Europa League final tickets", to: "/matches" },
        { label: "World Cup 2026 final tickets", to: "/matches" },
      ],
    },
    {
      title: t("footer.homepages"),
      links: [
        { label: "GB English", lang: "en" },
        { label: "FR Francais", lang: "fr" },
        { label: "AR العربية", lang: "ar" },
      ],
    },
  ];

  return (
    <footer className="bg-footerbackground text-white">
      <div className="max-w-[1024px] mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {columns.map((column) => (
            <div key={column.title} className="min-w-0">
              <h4 className="font-bold mb-3 sm:mb-4">{column.title}</h4>
              <ul className="space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-white/90 hover:text-white hover:underline break-words transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => i18n.changeLanguage(link.lang)}
                        className="text-white/90 hover:text-white hover:underline break-words transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-5 border-t border-white/20 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/80">
          <p className="text-center sm:text-left">Copyright 2026 Chritickets. All rights reserved.</p>
          <div className="flex items-center justify-center sm:justify-end gap-4">
            <Link to="/" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
