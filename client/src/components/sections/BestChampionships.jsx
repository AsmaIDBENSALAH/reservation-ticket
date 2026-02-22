import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import "swiper/css";
import "swiper/css/navigation";

export function BestChampionships() {
  const championships = [
    {
      name: "La Liga",
      logo: "https://images.unsplash.com/photo-1766756467595-fd3f1f62d562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      country: "Spain",
    },
    {
      name: "Serie A",
      logo: "https://images.unsplash.com/photo-1585582439639-da24975664a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      country: "Italy",
    },
    {
      name: "Ligue 1",
      logo: "https://images.unsplash.com/photo-1715591263944-e35bf44e7f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      country: "France",
    },
    {
      name: "Premier League",
      logo: "https://images.unsplash.com/photo-1695713503375-e8458c3e1d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      country: "England",
    },
    {
      name: "Bundesliga",
      logo: "https://images.unsplash.com/photo-1474899452492-5eea44100ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      country: "Germany",
    },
    {
      name: "Champions League",
      logo: "https://images.unsplash.com/photo-1643796903573-68834ffadcb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      country: "Europe",
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-5 bg-gray-50">
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Les meilleurs championnats de football
            </h2>
            <p className="text-gray-600 text-sm">
              Vous cherchez un match de football ? Alors vous êtes au bon
              endroit !
            </p>
          </div>

          <div className="relative px-12">
            {/* Left Arrow */}
            <button
              ref={prevRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded bg-white shadow-md flex items-center justify-center hover:bg-gray-50 border border-gray-200"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Right Arrow */}
            <button
              ref={nextRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded bg-white shadow-md flex items-center justify-center hover:bg-gray-50 border border-gray-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-700" />
            </button>

            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={4}
              loop
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {championships.map((championship, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={championship.logo}
                        alt={championship.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {championship.name}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
