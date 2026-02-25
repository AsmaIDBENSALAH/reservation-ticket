import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import MatchCard from "../MatchCard";
import {
  fetchMatches,
  fetchMatchesByCompetition,
  selectMatchesByComp,
  selectMatchesList,
  selectMatchesLoading,
} from "@/store/slices/matchesSlice";
import { useTranslation } from "react-i18next";

const PopularMatchSection = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const matchesList = useSelector(selectMatchesList);
  const matchesByCompetition = useSelector(selectMatchesByComp);
  const matchesLoading = useSelector(selectMatchesLoading);

  useEffect(() => {
    dispatch(fetchMatches({ page: 0, size: 10 }));
  }, [dispatch]);

  useEffect(() => {
    const competitionId = matchesList?.content?.[0]?.competitionId;
    if (competitionId) {
      dispatch(fetchMatchesByCompetition(competitionId));
    }
  }, [dispatch, matchesList?.content]);

  const formatDate = (dateTime) => {
    if (!dateTime) return "";
    const parsed = new Date(dateTime);
    if (Number.isNaN(parsed.getTime())) return dateTime;
    return parsed.toLocaleDateString(i18n?.language === "ar" ? "ar" : i18n?.language || "en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const sourceMatches =
    (matchesByCompetition || []).length > 0
      ? matchesByCompetition || []
      : matchesList?.content || [];

  const popularMatches = (matchesLoading?.list ? [] : sourceMatches).map(
    (match) => ({
      id: match.id,
      teams:
        match.homeTeam?.name && match.awayTeam?.name
          ? `${match.homeTeam?.abbreviation || match.homeTeam?.name} vs ${
              match.awayTeam?.abbreviation || match.awayTeam?.name
            }`
          : match.matchNumber || "",
      league: match.status || "",
      date: formatDate(match.dateTime),
      image: match.matchImageUrl || "",
      price:
        match.zonePricings?.[0]?.price !== undefined &&
        match.zonePricings?.[0]?.price !== null
          ? `€${match.zonePricings[0].price}`
          : "",
    }),
  );
  return (
    <section className="py-5">
      <div className="max-w-[1024px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("popular.now")}</h2>
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
            <SwiperSlide key={m.id || `${m.teams}-${m.date}`}>
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
