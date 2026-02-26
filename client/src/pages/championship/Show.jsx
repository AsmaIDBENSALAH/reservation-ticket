import MatchRow from "@/components/MatchRow";
import PageReload from "@/components/ui/PageReload";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  clearSelectedCompetition,
  fetchCompetitionById,
  selectCompetitionsLoading,
  selectSelectedCompetition,
} from "@/store/slices/competitionsSlice";
import {
  clearMatchesByCompetition,
  fetchMatchesByCompetition,
  selectMatchesByComp,
  selectMatchesByCompPage,
  selectMatchesByCompTotalPages,
  selectMatchesLoading,
} from "@/store/slices/matchesSlice";

const Show = () => {
  const { championshipName: id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const competition = useSelector(selectSelectedCompetition);
  const competitionLoading = useSelector(selectCompetitionsLoading);
  const matches = useSelector(selectMatchesByComp);
  const currentPage = useSelector(selectMatchesByCompPage);
  const totalPages = useSelector(selectMatchesByCompTotalPages);
  const loading = useSelector(selectMatchesLoading);

  useEffect(() => {
    if (id) {
      dispatch(clearSelectedCompetition());
      dispatch(clearMatchesByCompetition());
      dispatch(fetchCompetitionById(id));
      dispatch(fetchMatchesByCompetition({ competitionId: id, page: 0, size: 10 }));
    }
  }, [dispatch, id]);

  if ((competitionLoading?.selected || loading?.byCompetition) && !competition) {
    return <PageReload message="Reloading competition matches..." />;
  }

  const handleLoadMore = () => {
    if (currentPage + 1 < totalPages) {
      dispatch(
        fetchMatchesByCompetition({
          competitionId: id,
          page: currentPage + 1,
          size: 10,
        }),
      );
    }
  };

  const formatDateParts = (dateTime) => {
    if (!dateTime) return { day: "", month: "", time: "" };

    const parsed = new Date(dateTime);
    if (Number.isNaN(parsed.getTime())) return { day: "", month: "", time: "" };

    return {
      day: parsed.toLocaleDateString("en-US", { day: "2-digit" }),
      month: parsed.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      time: parsed.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Championship Header */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={competition?.logoUrl}
            alt={competition?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-green-900/85 to-emerald-900/90" />
        </div>

        <div className="relative max-w-[1024px] mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold text-center mb-4">
            {competition?.name} 
          </h1>
          <p className="text-xl text-emerald-100">
            {competition?.description} - {competition?.scope} - {competition?.continent} 
          </p>
          <div className="mt-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="text-white font-semibold">
              {(matches || []).length} {t("championship.matchesAvailable")}
            </span>
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-12">
        <div className="max-w-[1024px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t("championship.upcoming")}
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {(matches || []).map((match, index) => {
              const { day, month, time } = formatDateParts(match?.dateTime);
              return (
                <MatchRow
                  key={match?.id}
                  id={match?.id}
                  day={day}
                  month={month}
                  time={time}
                  teamHome={`${match?.homeTeam?.name || ""} ${
                    match?.homeTeam?.abbreviation
                      ? `(${match?.homeTeam?.abbreviation})`
                      : ""
                  }`.trim()}
                  teamAway={`${match?.awayTeam?.name || ""} ${
                    match?.awayTeam?.abbreviation
                      ? `(${match?.awayTeam?.abbreviation})`
                      : ""
                  }`.trim()}
                  competition={match?.status}
                  venue={match?.stadium?.name}
                  location={match?.stadium?.address}
                  price={
                    match?.zonePricings?.[0]?.price !== undefined &&
                    match?.zonePricings?.[0]?.price !== null
                      ? `€${match?.zonePricings?.[0]?.price}`
                      : ""
                  }
                  isLast={index === (matches || []).length - 1}
                />
              );
            })}
          </div>

          {currentPage + 1 < totalPages && (
            <button
              onClick={handleLoadMore}
              disabled={loading?.byCompetition}
              className="mt-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              {loading?.byCompetition ? t("championship.loadingMore") : t("championship.loadMore")}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Show;
