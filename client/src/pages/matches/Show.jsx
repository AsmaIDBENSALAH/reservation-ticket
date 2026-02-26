import MatchRow from "@/components/MatchRow";
import PageReload from "@/components/ui/PageReload";
import { fetchMatches } from "@/store/slices/matchesSlice";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 10;

const Show = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const formatDateParts = useCallback(
    (dateTime) => {
      if (!dateTime) return { day: "", month: "", time: "" };

      const parsed = new Date(dateTime);
      if (Number.isNaN(parsed.getTime())) return { day: "", month: "", time: "" };

      const locale = i18n?.language === "ar" ? "ar" : i18n?.language || "en";

      return {
        day: parsed.toLocaleDateString(locale, { day: "2-digit" }),
        month: parsed.toLocaleDateString(locale, { month: "short" }).toUpperCase(),
        time: parsed.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
    },
    [i18n?.language],
  );

  const loadPage = useCallback(
    async (page, append = false) => {
      setError("");

      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsInitialLoading(true);
      }

      try {
        const payload = await dispatch(fetchMatches({ page, size: PAGE_SIZE })).unwrap();
        const nextContent = Array.isArray(payload)
          ? payload
          : payload?.content || [];
        const nextPage = payload?.number ?? page;
        const nextTotalPages = payload?.totalPages ?? 0;

        setMatches((prev) => (append ? [...prev, ...nextContent] : nextContent));
        setCurrentPage(nextPage);
        setTotalPages(nextTotalPages);
      } catch (err) {
        setError(err?.message || t("matches.loadError"));
      } finally {
        setIsInitialLoading(false);
        setIsLoadingMore(false);
      }
    },
    [dispatch, t],
  );

  useEffect(() => {
    loadPage(0, false);
  }, [loadPage]);

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    if (currentPage + 1 >= totalPages) return;
    loadPage(currentPage + 1, true);
  };

  if (isInitialLoading) {
    return <PageReload message={t("matches.loading")} />;
  }

  return (
    <section className="py-10 min-h-screen bg-gray-50">
      <div className="max-w-[1024px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900">{t("matches.title")}</h1>
        <p className="mt-2 text-gray-600">{t("matches.subtitle")}</p>
        <p className="mt-4 text-sm text-gray-500">
          {matches.length} {t("championship.matchesAvailable")}
        </p>

        {error ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
          {matches.length > 0 ? (
            matches.map((match, index) => {
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
                  competition={match?.status || ""}
                  venue={match?.stadium?.name || ""}
                  location={match?.stadium?.address || ""}
                  price={
                    match?.zonePricings?.[0]?.price !== undefined &&
                    match?.zonePricings?.[0]?.price !== null
                      ? `€${match?.zonePricings?.[0]?.price}`
                      : ""
                  }
                  isLast={index === matches.length - 1}
                />
              );
            })
          ) : (
            <p className="px-4 py-8 text-center text-sm text-gray-500">
              {t("matches.empty")}
            </p>
          )}
        </div>

        {currentPage + 1 < totalPages && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {isLoadingMore ? t("championship.loadingMore") : t("matches.loadMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Show;
