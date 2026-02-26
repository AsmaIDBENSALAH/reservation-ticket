import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import {
  fetchCompetitions,
  selectCompetitionsList,
  selectCompetitionsLoading,
} from "@/store/slices/competitionsSlice";

import "swiper/css";
import "swiper/css/navigation";

export function BestChampionships() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const competitionsList = useSelector(selectCompetitionsList);
  const competitionsLoading = useSelector(selectCompetitionsLoading);
  const championships = (competitionsLoading?.list
    ? []
    : competitionsList?.content || []
  ).map((competition) => ({
    id: competition.id,
    name: competition.name || "",
    logo: competition.logoUrl || "",
    country: competition.continent || "",
  }));

  useEffect(() => {
    dispatch(fetchCompetitions({ page: 0, size: 10 }));
  }, [dispatch]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-5 bg-gray-50">
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("bestChampionships.title")}
            </h2>
            <p className="text-gray-600 text-sm">
              {t("bestChampionships.subtitle")}
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
                  <div
                    onClick={() => navigate(`/championship/${championship.id}`)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  >
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
