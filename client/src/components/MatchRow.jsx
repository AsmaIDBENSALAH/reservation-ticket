import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MatchRow = ({
  id,
  day,
  month,
  time,
  teamHome,
  teamAway,
  competition,
  venue,
  location,
  price,
  isLast,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={[
        "flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors",
        !isLast ? "border-b border-gray-200" : "",
      ].join(" ")}
    >
      {/* Date */}
      <div className="flex flex-col items-center w-16 flex-shrink-0">
        <div className="text-3xl font-bold text-gray-900">{day}</div>
        <div className="text-xs text-gray-500 uppercase">{month}</div>
      </div>

      {/* Match Details */}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500 mb-1">{time}</div>

        <div className="text-base font-semibold text-gray-900 mb-1">
          <span className="text-emerald-600">{teamHome}</span>
          {" vs "}
          <span>{teamAway}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
          <span>{competition}</span>
          <span>•</span>
          <span>{venue}</span>
          <span>•</span>
          <span>{location}</span>
        </div>
      </div>

      {/* Price + View */}
      <div className="flex items-center gap-3">
        {price && (
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">{t("matchRow.from")}</div>
            <div className="text-xl font-bold text-emerald-600">{price}</div>
          </div>
        )}

        <Link
          to={`/match/${id}`}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex-shrink-0 transition-all hover:shadow-lg text-center"
        >
          {t("matchRow.viewDetails")}
        </Link>
      </div>
    </div>
  );
};

export default MatchRow;
