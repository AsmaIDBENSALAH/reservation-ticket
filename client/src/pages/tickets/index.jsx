import React, { useEffect, useState } from "react";
import keycloak from "@/keycloak";
import { useTranslation } from "react-i18next";
import { getAuthHeader } from "@/services/authHeader";

const TicketsPage = () => {
  const { t, i18n } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/reservations/my-history", {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch ticket history");
        }
        setTickets(Array.isArray(data?.content) ? data.content : []);
      } catch (error) {
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    if (!keycloak?.authenticated) {
      keycloak?.login();
      return;
    }

    fetchMyHistory();
  }, []);

  const formatDate = (dateTime) => {
    if (!dateTime) return "";
    return new Date(dateTime).toLocaleString(i18n?.language === "ar" ? "ar" : i18n?.language || "fr", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClassName = (status) => {
    if (status === "CONFIRMED") {
      return "bg-green-100 text-green-700";
    }
    if (status === "PENDING") {
      return "bg-yellow-100 text-yellow-700";
    }
    if (status === "CANCELLED") {
      return "bg-red-100 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-900 py-16">
        <div className="max-w-[1024px] mx-auto px-4 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">🎫 {t("tickets.title")}</h1>
          <p className="text-emerald-100">
            {t("tickets.welcome", { name: keycloak?.tokenParsed?.given_name || "Supporter" })}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1024px] mx-auto px-4">
          {tickets?.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-4xl mb-4">🎫</p>
              <p className="text-gray-600">{loading ? "Loading..." : t("tickets.empty")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets?.map((ticket) => (
                <div
                  key={ticket?.reservationId || ticket?.matchId}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                      {ticket?.reservationId}
                    </p>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClassName(ticket?.status)}`}
                    >
                      {ticket?.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src=""
                        alt={ticket?.homeTeam || "Home Team"}
                        className="w-8 h-8 rounded object-cover bg-gray-100"
                      />
                      <p className="font-semibold text-gray-900 text-sm">
                        {ticket?.homeTeam}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">vs</p>
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src=""
                        alt={ticket?.awayTeam || "Away Team"}
                        className="w-8 h-8 rounded object-cover bg-gray-100"
                      />
                      <p className="font-semibold text-gray-900 text-sm">
                        {ticket?.awayTeam}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{formatDate(ticket?.reservationDate)}</p>
                    <p>{ticket?.stadeName}</p>
                    <p>{t("tickets.zone")}: {ticket?.stadiumZone} - {ticket?.porte}</p>
                    <p>Quantity: {ticket?.quantity}</p>
                    <p>{t("tickets.price")}: {ticket?.totalPrice} {ticket?.currency}</p>
                  </div>

                  <div className="mt-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {ticket?.matchId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TicketsPage;
