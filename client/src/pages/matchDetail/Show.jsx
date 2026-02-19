import MatchHeaderSection from "@/components/sections/MatchHeaderSection";
import TicketCard from "@/components/TicketCard";
import React, { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";

const Show = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <MatchHeaderSection />

      <div className="max-w-[1024px] mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">À propos de l'événement</h2>

          <div className="text-sm text-[var(--foreground)] mb-4">
            <p className="mb-2">
              Réservez vos billets dès maintenant pour le prochain match entre
              Borussia Dortmund et Bayern Munich au Parc Signal Iduna, Dortmund,
              Allemagne où ils participent au Bundesliga Allemagne le
              28/02/2026. Sécurisez votre place en sélectionnant votre catégorie
              de billet préférée et en complétant le processus de commande via
              notre système de réservation online sûr et convivial.
            </p>

            {showMore && (
              <p className="mb-2 text-[var(--muted-foreground)]">
                Ce match opposera deux des plus grandes équipes d'Allemagne dans
                un affrontement historique. L'atmosphère au Parc Signal Iduna
                sera électrique avec des milliers de supporters passionnés.
              </p>
            )}

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[var(--primary)] font-medium text-sm hover:underline"
            >
              Plus +
            </button>

            <div className="flex items-start gap-3 py-8">
              <MapPinIcon className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold">
                  Parc Signal Iduna, Dortmund, Allemagne
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">
                  Dortmund, Allemagne
                </div>
              </div>
            </div>

            <div>
              <TicketCard
                id="ticket-1"
                category="Block Sitzplatz Kurve"
                subcategory="Osttribüne, Row -"
                available="2 Billet(s)"
                price="458.46 $"
              />

              <TicketCard
                id="ticket-2"
                category="Block Sitzplatz Kurve"
                subcategory="Osttribüne, Row -"
                available="2 Billet(s)"
                price="458.46 $"
              />

              <TicketCard
                id="ticket-3"
                category="Block Südtribüne,"
                subcategory="Row -"
                available="1 Billet(s)"
                price="519.80 $"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
