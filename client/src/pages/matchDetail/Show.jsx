import MatchHeaderSection from "@/components/sections/MatchHeaderSection";
import TicketCard from "@/components/TicketCard";
import PageReload from "@/components/ui/PageReload";
import React, { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  clearSelectedMatch,
  fetchMatchById,
  fetchStadiumById,
  fetchTeamById,
  selectAwayTeam,
  selectHomeTeam,
  selectMatchesLoading,
  selectSelectedMatch,
  selectStadium,
} from "@/store/slices/matchesSlice";

const Show = () => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const match = useSelector(selectSelectedMatch);
  const homeTeam = useSelector(selectHomeTeam);
  const awayTeam = useSelector(selectAwayTeam);
  const stadium = useSelector(selectStadium);
  const loading = useSelector(selectMatchesLoading);

  useEffect(() => {
    if (id) {
      dispatch(clearSelectedMatch());
      dispatch(fetchMatchById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (match?.homeTeam?.id) {
      dispatch(fetchTeamById({ id: match?.homeTeam?.id, role: "home" }));
    }
    if (match?.awayTeam?.id) {
      dispatch(fetchTeamById({ id: match?.awayTeam?.id, role: "away" }));
    }
    if (match?.stadium?.id) {
      dispatch(fetchStadiumById(match?.stadium?.id));
    }
  }, [dispatch, match]);

  const stadiumZones = stadium?.zones || [];
  const formatDate = (dateTime) => {
    if (!dateTime) return '';
    return new Date(dateTime).toLocaleDateString(i18n?.language === "ar" ? "ar" : i18n?.language || "fr", {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (
    (loading?.selected || loading?.homeTeam || loading?.awayTeam || loading?.stadium) &&
    (!match || !homeTeam || !awayTeam || !stadium)
  ) {
    return <PageReload message="Reloading match details..." />;
  }

  return (
    <>
      <MatchHeaderSection
        match={match}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        stadium={stadium}
      />

      <div className="max-w-[1024px] mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">{t("matchDetail.about")}</h2>

          <div className="text-sm text-[var(--foreground)] mb-4">
            <p className="mb-2">
              {t("matchDetail.reserveIntro", {
                home: homeTeam?.name || "",
                homeAbbr: homeTeam?.abbreviation || "",
                away: awayTeam?.name || "",
                awayAbbr: awayTeam?.abbreviation || "",
                stadium: stadium?.name || "",
                city: stadium?.cityName || "",
                country: stadium?.countryName || "",
                status: match?.status || "",
                date: formatDate(match?.dateTime),
              })}
            </p>

            {showMore && (
              <p className="mb-2 text-[var(--muted-foreground)]">
                Ce match opposera {homeTeam?.name} ({homeTeam?.type}, fondé en{" "}
                {homeTeam?.foundingYear}, {homeTeam?.country?.name}) à{" "}
                {awayTeam?.name} ({awayTeam?.type}, fondé en{" "}
                {awayTeam?.foundingYear}, {awayTeam?.country?.name}). Le stade{" "}
                {stadium?.name} ({stadium?.address}) peut accueillir{" "}
                {stadium?.capacity} supporters.
              </p>
            )}

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[var(--primary)] font-medium text-sm hover:underline"
            >
              {t("matchDetail.more")}
            </button>

            <div className="flex items-start gap-3 py-8">
              <MapPinIcon className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold">
                  {stadium?.name}, {stadium?.address}
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">
                  {stadium?.cityName}, {stadium?.countryName} - {stadium?.capacity}
                </div>
              </div>
            </div>

            <div>
              {stadiumZones?.map((zone) => (
                <TicketCard
                  key={zone?.id}
                  id={zone?.id}
                  category={zone?.name}
                  subcategory={zone?.description}
                  available={`${zone?.capacity} Billet(s)`}
                  price={`${
                    match?.zonePricings?.find(
                      (pricing) => pricing?.zoneId === zone?.id,
                    )?.price
                  } $`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
