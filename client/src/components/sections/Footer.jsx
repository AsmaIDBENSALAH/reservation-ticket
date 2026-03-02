import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompetitions,
  selectCompetitionsList,
} from "@/store/slices/competitionsSlice";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const competitionsList = useSelector(selectCompetitionsList);
  const competitions = competitionsList?.content || [];

  React.useEffect(() => {
    dispatch(fetchCompetitions({ page: 0, size: 8 }));
  }, [dispatch]);

  const companyLinks = [
    { label: t("header.home"), to: "/" },
    { label: t("matches.title"), to: "/matches" },
    { label: t("competition.listTitle"), to: "/competition" },
    { label: "FAQ", to: "/#faq" },
    { label: `🎫 ${t("header.trackTickets")}`, to: "/tickets" },
  ];

  const topCategoriesLinks = [
    { label: "Premier League tickets", to: "/matches" },
    { label: "FA Cup tickets", to: "/matches" },
    { label: "EFL Cup tickets", to: "/matches" },
    { label: "Champions League tickets", to: "/matches" },
    { label: "Europa League tickets", to: "/matches" },
    { label: "Euro Cup tickets", to: "/matches" },
    { label: "FA Cup Final tickets", to: "/matches" },
    { label: "Community Shield tickets", to: "/matches" },
  ];

  const languageLinks = [
    { label: "GB English", lang: "en" },
    { label: "FR Francais", lang: "fr" },
    { label: "AR العربية", lang: "ar" },
  ];

  return (
    <footer className="bg-footerbackground text-white">
      <div className="max-w-[1024px] mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Entreprise / Company */}
          <div className="min-w-0">
            <h4 className="font-bold mb-3 sm:mb-4">{t("footer.company")}</h4>

            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={`company-${link.to}`}>
                  <Link
                    to={link.to}
                    className="text-white/90 hover:text-white hover:underline break-words transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top categories */}
          <div className="min-w-0">
            {competitions.length > 0 ? (
              <>
                <h4 className="font-bold mb-3 sm:mb-4">
                  {t("competition.listTitle")}
                </h4>
                <ul className="space-y-2 text-sm">
                  {competitions.slice(0, 6).map((competition) => (
                    <li key={`competition-${competition?.id}`}>
                      <Link
                        to={`/championship/${competition?.id}`}
                        className="text-white/90 hover:text-white hover:underline break-words transition-colors"
                      >
                        {competition?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {/* Languages */}
          <div className="min-w-0">
            <h4 className="font-bold mb-3 sm:mb-4">{t("footer.homepages")}</h4>
            <ul className="space-y-2 text-sm">
              {languageLinks.map((link) => (
                <li key={`lang-${link.lang}`}>
                  <button
                    type="button"
                    onClick={() => i18n.changeLanguage(link.lang)}
                    className="text-white/90 hover:text-white hover:underline break-words transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/20 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/80">
          <p className="text-center sm:text-left">
            Copyright 2026 Chritickets. All rights reserved.
          </p>
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
