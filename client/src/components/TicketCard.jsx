import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TicketCard = ({ id, category, subcategory, available, price }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-white border border-[var(--border)] rounded-lg p-4 mb-3">
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <div className="grid grid-cols-4 gap-4">
          
          {/* Category */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">{t("ticketCard.category")}</div>
            <div className="text-sm font-medium">{category}</div>
            <div className="text-xs text-[var(--muted-foreground)]">{subcategory}</div>
          </div>

          {/* Available */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">{t("ticketCard.available")}</div>
            <div className="text-sm font-medium mb-2">{available}</div>       
          </div>

          {/* Price */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">{t("ticketCard.pricePerTicket")}</div>
            <div className="text-sm font-medium">{price}</div>
          </div>

          {/* Quantity */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">{t("ticketCard.quantity")}</div>
            <select className="w-full border border-[var(--border)] rounded px-2 py-1 text-sm bg-white">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>

        {/* Reserve Button */}
        <div className="flex items-center">
          <button
            onClick={() => navigate(`/checkout/${id}`)}
            className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ backgroundColor: "#4caf50" }}
          >
            {t("ticketCard.reserve")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
