import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import MatchCard from "../MatchCard";

const PopularMatchSection = () => {
  const popularMatches = [
    {
      teams: "Man United vs Liverpool",
      league: "Premier League",
      date: "Feb 15, 2026",
      image:
        "https://images.unsplash.com/photo-1764438300230-f1eb26b918cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMG1hdGNoJTIwYWN0aW9ufGVufDF8fHx8MTc2ODY5MDE5OHww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "€89",
    },
    {
      teams: "Real Madrid vs Barcelona",
      league: "La Liga",
      date: "Mar 20, 2026",
      image:
        "https://images.unsplash.com/photo-1551384732-fb4f003640e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmYW5zJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY4NTk0ODA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "€145",
    },
    {
      teams: "Bayern vs Dortmund",
      league: "Bundesliga",
      date: "Apr 19, 2026",
      image:
        "https://images.unsplash.com/photo-1651043421470-88b023bb9636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBncmVlbiUyMHBpdGNofGVufDF8fHx8MTc2ODY5MDUwMHww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "€88",
    },
    {
      teams: "PSG vs Marseille",
      league: "Ligue 1",
      date: "May 3, 2026",
      image:
        "https://images.unsplash.com/photo-1600250395178-40fe752e5189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMG1hdGNoJTIwZ29hbHxlbnwxfHx8fDE3Njg2MTg4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "€95",
    },
    {
      teams: "PSG vs Marseille",
      league: "Ligue 1",
      date: "May 3, 2026",
      image:
        "https://images.unsplash.com/photo-1600250395178-40fe752e5189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMG1hdGNoJTIwZ29hbHxlbnwxfHx8fDE3Njg2MTg4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "€95",
    },
    {
      teams: "PSG vs Marseille",
      league: "Ligue 1",
      date: "May 3, 2026",
      image:
        "https://images.unsplash.com/photo-1600250395178-40fe752e5189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMG1hdGNoJTIwZ29hbHxlbnwxfHx8fDE3Njg2MTg4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "€95",
    },
    {
      teams: "PSG vs Marseille",
      league: "Ligue 1",
      date: "May 3, 2026",
      image:
        "https://images.unsplash.com/photo-1600250395178-40fe752e5189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMG1hdGNoJTIwZ29hbHxlbnwxfHx8fDE3Njg2MTg4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "€95",
    },
  ];
  return (
    <section className="py-5">
      <div className="max-w-[1024px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Now</h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={4}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {popularMatches.map((m) => (
            <SwiperSlide key={`${m.teams}-${m.date}`}>
              <MatchCard
                teams={m.teams}
                league={m.league}
                date={m.date}
                image={m.image}
                price={m.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularMatchSection;
