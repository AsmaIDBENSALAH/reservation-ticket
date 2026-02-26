import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MatchRow from "../MatchRow";
import {
  fetchMostPopularMatches,
  selectMatchesLoading,
  selectMostPopularMatches,
} from "@/store/slices/matchesSlice";
import { useTranslation } from "react-i18next";

const MostPopularMatchesSection = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const mostPopularMatches = useSelector(selectMostPopularMatches) || [];
  const matchesLoading = useSelector(selectMatchesLoading);

  useEffect(() => {
    dispatch(fetchMostPopularMatches({ page: 0, size: 10 }));
  }, [dispatch]);

  const formatDateParts = (dateTime) => {
    if (!dateTime) return { day: "", month: "", time: "" };
    const parsed = new Date(dateTime);
    if (Number.isNaN(parsed.getTime())) return { day: "", month: "", time: "" };
    return {
      day: parsed.toLocaleDateString("en-US", { day: "2-digit" }),
      month: parsed.toLocaleDateString(i18n?.language === "ar" ? "ar" : i18n?.language || "en", { month: "short" }).toUpperCase(),
      time: parsed.toLocaleTimeString(i18n?.language === "ar" ? "ar" : i18n?.language || "en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
  };

  const popularMatches = (matchesLoading?.mostPopular
    ? []
    : mostPopularMatches || []
  ).map((match) => {
    const { day, month, time } = formatDateParts(match.dateTime);
    return {
      id: match.id,
      image: match.matchImageUrl || "",
      title: match.matchNumber || "",
      date: match.dateTime || "",
      status: match.status || "",
      seats: match.zonePricings?.[0]?.availableSeats,
      attendance: match.attendance,
      day,
      month,
      time,
      teamHome: match.homeTeam?.abbreviation
        ? `${match.homeTeam?.name || ""} (${match.homeTeam?.abbreviation})`
        : match.homeTeam?.name || "",
      teamAway: match.awayTeam?.abbreviation
        ? `${match.awayTeam?.name || ""} (${match.awayTeam?.abbreviation})`
        : match.awayTeam?.name || "",
      competition: match.status || "",
      venue: match.stadium?.name || "",
      location: match.stadium?.address || "",
      price:
        match.zonePricings?.[0]?.price !== undefined &&
        match.zonePricings?.[0]?.price !== null
          ? `€${match.zonePricings[0].price}`
          : "",
    };
  });
  return (
    <section className="py-5">
      <div className="max-w-[1024px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("popular.mostPopular")}
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {popularMatches.map((m, index) => (
            <MatchRow
              key={`${m.teamHome}-${m.teamAway}-${m.day}-${m.month}-${m.time}`}
              id={m.id}
              day={m.day}
              month={m.month}
              time={m.time}
              teamHome={m.teamHome}
              teamAway={m.teamAway}
              competition={m.competition}
              venue={m.venue}
              location={m.location}
              price={m.price}
              isLast={index === popularMatches.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopularMatchesSection;
