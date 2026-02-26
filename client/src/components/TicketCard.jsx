import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TicketCard = ({
  matchData,
  category,
  categoryData,
  subcategory,
  price,
  ticketPrice = 0,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const total = useMemo(() => Number(ticketPrice || 0) * quantity, [ticketPrice, quantity]);

  const handleReserve = () => {
    navigate("/checkout", {
      state: {
        matchId: matchData?.id,
        matchZonePricingId: categoryData?.matchZonePricingId,
        match: matchData,
        category: categoryData,
        quantity,
        total,
      },
    });
  };

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

          {/* Price */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">{t("ticketCard.pricePerTicket")}</div>
            <div className="text-sm font-medium">{price}</div>
          </div>

          {/* Quantity */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">{t("ticketCard.quantity")}</div>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border border-[var(--border)] rounded px-2 py-1 text-sm bg-white"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        </div>

        {/* Reserve Button */}
        <div className="flex items-center">
          <button
            onClick={handleReserve}
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
