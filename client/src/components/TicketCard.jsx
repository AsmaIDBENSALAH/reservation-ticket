import React from "react";
import { useNavigate } from "react-router-dom";

const TicketCard = ({ id, category, subcategory, available, price }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-[var(--border)] rounded-lg p-4 mb-3">
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <div className="grid grid-cols-4 gap-4">
          
          {/* Category */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">Catégorie</div>
            <div className="text-sm font-medium">{category}</div>
            <div className="text-xs text-[var(--muted-foreground)]">{subcategory}</div>
          </div>

          {/* Available */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">Disponible</div>
            <div className="text-sm font-medium mb-2">{available}</div>       
          </div>

          {/* Price */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">Prix/billet</div>
            <div className="text-sm font-medium">{price}</div>
          </div>

          {/* Quantity */}
          <div>
            <div className="text-xs text-[var(--muted-foreground)] mb-1">Quantité</div>
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
            Réservez
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
