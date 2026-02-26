import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageReload from "@/components/ui/PageReload";
import { useTranslation } from "react-i18next";
import {
  fetchCompetitions,
  selectCompetitionsError,
  selectCompetitionsList,
  selectCompetitionsLoading,
} from "@/store/slices/competitionsSlice";

const Show = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const competitionsList = useSelector(selectCompetitionsList);
  const competitionsLoading = useSelector(selectCompetitionsLoading);
  const competitionsError = useSelector(selectCompetitionsError);
  const competitions = competitionsList?.content || [];

  useEffect(() => {
    dispatch(fetchCompetitions({ page: 0, size: 100 }));
  }, [dispatch]);

  if (competitionsLoading?.list && competitions.length === 0) {
    return <PageReload message="Reloading competitions..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-900 py-16">
        <div className="max-w-[1024px] mx-auto px-4 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t("competition.title")}</h1>
          <p className="text-emerald-100">
            {t("competition.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1024px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t("competition.listTitle")} ({competitionsList?.totalElements || competitions.length})
          </h2>

          {competitionsLoading?.list && (
            <p className="text-gray-600">{t("competition.loading")}</p>
          )}

          {!competitionsLoading?.list && competitionsError && (
            <p className="text-red-600">{competitionsError}</p>
          )}

          {!competitionsLoading?.list && !competitionsError && competitions.length === 0 && (
            <p className="text-gray-600">{t("competition.empty")}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitions.map((competition) => (
              <Link
                key={competition?.id}
                to={`/championship/${competition?.id}`}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:border-emerald-500 hover:shadow-sm transition"
              >
                <img
                  src={competition?.logoUrl}
                  alt={competition?.name || "Competition"}
                  className="w-12 h-12 rounded object-cover bg-gray-100"
                />
                <div>
                  <p className="font-semibold text-gray-900">{competition?.name}</p>
                  <p className="text-sm text-gray-600">
                    {competition?.continent || "Unknown continent"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Show;
