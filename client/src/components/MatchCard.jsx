import React from "react";

const MatchCard = ({ teams, league, date, image, price, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={teams}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-base mb-1">{teams}</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-300 text-xs font-medium">{league}</p>
              <p className="text-gray-300 text-xs">{date}</p>
            </div>

            <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
