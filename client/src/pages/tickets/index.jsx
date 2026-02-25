import React, { useEffect } from "react";
import keycloak from "@/keycloak";
import { useTranslation } from "react-i18next";

const TicketsPage = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (!keycloak?.authenticated) {
      keycloak?.login();
    }
  }, []);

  // TODO: replace with real API call when backend is ready
  const mockTickets = [
    {
      id: "1",
      matchNumber: "MATCH-001",
      homeTeam: { name: "Real Madrid", logoUrl: "", abbreviation: "RMA" },
      awayTeam: { name: "Barcelona", logoUrl: "", abbreviation: "BAR" },
      stadium: { name: "Santiago Bernabeu", cityName: "Madrid" },
      dateTime: "2026-03-15T20:00:00",
      zone: "VIP",
      price: 150,
      status: "CONFIRMED",
      ticketCode: "TKT-2026-001",
    },
    {
      id: "2",
      matchNumber: "MATCH-002",
      homeTeam: { name: "PSG", logoUrl: "", abbreviation: "PSG" },
      awayTeam: { name: "Bayern Munich", logoUrl: "", abbreviation: "FCB" },
      stadium: { name: "Parc des Princes", cityName: "Paris" },
      dateTime: "2026-04-04T21:00:00",
      zone: "Standard",
      price: 90,
      status: "PENDING",
      ticketCode: "TKT-2026-002",
    },
    {
      id: "3",
      matchNumber: "MATCH-003",
      homeTeam: { name: "AC Milan", logoUrl: "", abbreviation: "MIL" },
      awayTeam: { name: "Inter", logoUrl: "", abbreviation: "INT" },
      stadium: { name: "San Siro", cityName: "Milan" },
      dateTime: "2026-05-01T18:30:00",
      zone: "Premium",
      price: 120,
      status: "CANCELLED",
      ticketCode: "TKT-2026-003",
    },
  ];

  const formatDate = (dateTime) => {
    if (!dateTime) return "";
    return new Date(dateTime).toLocaleDateString(i18n?.language === "ar" ? "ar" : i18n?.language || "fr", {
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
          {mockTickets?.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-4xl mb-4">🎫</p>
              <p className="text-gray-600">{t("tickets.empty")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockTickets?.map((ticket) => (
                <div
                  key={ticket?.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                      {ticket?.matchNumber}
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
                        src={ticket?.homeTeam?.logoUrl || ""}
                        alt={ticket?.homeTeam?.name || "Home Team"}
                        className="w-8 h-8 rounded object-cover bg-gray-100"
                      />
                      <p className="font-semibold text-gray-900 text-sm">
                        {ticket?.homeTeam?.name} ({ticket?.homeTeam?.abbreviation})
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">vs</p>
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={ticket?.awayTeam?.logoUrl || ""}
                        alt={ticket?.awayTeam?.name || "Away Team"}
                        className="w-8 h-8 rounded object-cover bg-gray-100"
                      />
                      <p className="font-semibold text-gray-900 text-sm">
                        {ticket?.awayTeam?.name} ({ticket?.awayTeam?.abbreviation})
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{formatDate(ticket?.dateTime)}</p>
                    <p>
                      {ticket?.stadium?.name}, {ticket?.stadium?.cityName}
                    </p>
                    <p>{t("tickets.zone")}: {ticket?.zone}</p>
                    <p>{t("tickets.price")}: €{ticket?.price}</p>
                  </div>

                  <div className="mt-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {ticket?.ticketCode}
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
