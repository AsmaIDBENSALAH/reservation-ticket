import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../CategoryCard";
import {
  fetchCompetitions,
  selectCompetitionsList,
  selectCompetitionsLoading,
} from "@/store/slices/competitionsSlice";
import { useTranslation } from "react-i18next";

const PopularCategoriesSection = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const competitionsList = useSelector(selectCompetitionsList);
  const competitionsLoading = useSelector(selectCompetitionsLoading);

  useEffect(() => {
    dispatch(fetchCompetitions({ page: 0, size: 10 }));
  }, [dispatch]);

  const categoriesCards = (competitionsLoading?.list
    ? []
    : competitionsList?.content || []
  )
    .slice(0, 2)
    .map((competition) => ({
    title: competition.name || "",
    image: competition.logoUrl || "",
    buttonText: t("categories.seeAll"),
    to: `/championship/${competition.id}`,
    }));

  return (
    <section className="bg-gray-50 py-5">
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {categoriesCards.map((c) => (
            <CategoryCard
              key={c.title}
              title={c.title}
              image={c.image}
              buttonText={c.buttonText}
              to={c.to}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategoriesSection;
