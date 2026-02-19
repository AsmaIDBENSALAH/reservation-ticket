import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({
  title,
  image,
  buttonText = "Tout voir",
  to,
}) => {
  return (
    <Link
      to={to}
      className="relative h-64 rounded-lg overflow-hidden group cursor-pointer block"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-white font-bold text-xl mb-3">{title}</h3>

        <span className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors inline-block">
          {buttonText}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
