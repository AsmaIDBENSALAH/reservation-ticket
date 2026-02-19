import React from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";

const MatchHeaderSection = () => {
  return (
    <div className="max-w-[1024px] mx-auto px-4 py-6">
      {/* Header with logos and title */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* BVB Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/960px-Borussia_Dortmund_logo.svg.png"
          alt="BVB"
          className="w-16 h-16 flex-shrink-0"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-center">
          Borussia Dortmund vs Bayern Munich Billets
        </h1>

        {/* Bayern Logo */}
        <img
          src="https://brandlogos.net/wp-content/uploads/2025/03/fc_bayern_munich-logo_brandlogos.net_kqzlr.png"
          alt="Bayern Munich"
          className="w-16 h-16 flex-shrink-0"
        />
      </div>

      {/* Date */}
      <div className="flex items-center justify-center gap-2 mb-6 text-sm text-[var(--muted-foreground)]">
        <CalendarIcon  className="w-4 h-4" />
        <span>28 Février 2026, 18:30</span>
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
            27 jours
          </button>
          <button
            className="px-6 py-2 font-medium bg-white"
            style={{ color: "#ff6b7a" }}
          >
            Avant l'événement
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchHeaderSection;
