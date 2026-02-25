import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches, selectMatchesList } from "@/store/slices/matchesSlice";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const matchesList = useSelector(selectMatchesList);
  const featuredMatch = matchesList?.content?.[0];

  useEffect(() => {
    dispatch(fetchMatches({ page: 0, size: 1 }));
  }, [dispatch]);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const parsed = new Date(dateTime);
    if (Number.isNaN(parsed.getTime())) return dateTime;
    return parsed.toLocaleString(i18n?.language === "ar" ? "ar" : i18n?.language || "en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={
            featuredMatch?.matchImageUrl ||
            "https://images.unsplash.com/photo-1651043421470-88b023bb9636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBncmVlbiUyMHBpdGNofGVufDF8fHx8MTc2ODY5MDUwMHww&ixlib=rb-4.1.0&q=80&w=1080"
          }
          alt="Football Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-green-900/85 to-emerald-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-[1024px] mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
          {featuredMatch?.homeTeam?.name && featuredMatch?.awayTeam?.name
            ? `${featuredMatch?.homeTeam?.name} vs ${featuredMatch?.awayTeam?.name}`
            : featuredMatch?.matchNumber || t("hero.defaultTitle")}
        </h2>
        <p className="text-xl md:text-2xl text-center mb-12 text-emerald-100">
          {featuredMatch
            ? `${featuredMatch.status || ""} ${formatDateTime(
                featuredMatch.dateTime,
              )}`
            : t("hero.defaultSubtitle")}
        </p>

        {/* Search bar */}
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
              <input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                className="bg-transparent border-none outline-none text-gray-800 w-full placeholder:text-gray-500 text-sm"
              />
            </div>
            <button className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-6 py-2 rounded-md font-semibold hover:shadow-xl hover:from-emerald-700 hover:to-green-800 transition-all text-sm">
              {t("hero.searchTickets")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
