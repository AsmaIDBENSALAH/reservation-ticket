import React from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";

const MatchHeaderSection = ({ match, homeTeam, awayTeam, stadium }) => {
  const formatDate = (dateTime) => {
    if (!dateTime) return "";
    return new Date(dateTime).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRemainingTime = (dateTime) => {
    if (!dateTime) return "N/A";

    const target = new Date(dateTime).getTime();
    const now = Date.now();
    const diff = target - now;

    if (Number.isNaN(target)) return "N/A";
    if (diff <= 0) return "Started";

    const hours = Math.ceil(diff / (1000 * 60 * 60));

    if (hours >= 24) {
      const days = Math.ceil(hours / 24);
      return `${days} ${days === 1 ? "day" : "days"}`;
    }

    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  };

  return (
    <div className="max-w-[1024px] mx-auto px-4 py-6">
      {/* Header with logos and title */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* BVB Logo */}
        <img
          src={homeTeam?.logoUrl}
          alt={homeTeam?.name}
          className="w-16 h-16 flex-shrink-0"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-center">
          {homeTeam?.name} vs {awayTeam?.name}
        </h1>

        {/* Bayern Logo */}
        <img
          src={awayTeam?.logoUrl}
          alt={awayTeam?.name}
          className="w-16 h-16 flex-shrink-0"
        />
      </div>

      {/* Date */}
      <div className="flex items-center justify-center gap-2 mb-6 text-sm text-[var(--muted-foreground)]">
        <CalendarIcon className="w-4 h-4" />
        <span>
          {formatDate(match?.dateTime)} - {stadium?.name}, {stadium?.cityName},{" "}
          {stadium?.countryName}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center">
        <div
          className="inline-flex rounded-full border-2 overflow-hidden"
          style={{ borderColor: "#ff6b7a" }}
        >
          <button
            className="px-6 py-2 text-white font-medium rounded-full"
            style={{ backgroundColor: "#ff6b7a" }}
          >
            Time left
          </button>
          <button
            className="px-6 py-2 font-medium bg-white"
            style={{ color: "#ff6b7a" }}
          >
            {getRemainingTime(match?.dateTime)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchHeaderSection;
