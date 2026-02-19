import CategoryCard from "../CategoryCard";

const PopularCategoriesSection = () => {
  const categoriesCards = [
    {
      title: "Champions League 2025-2026",
      image:
        "https://images.unsplash.com/photo-1651043421470-88b023bb9636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBncmVlbiUyMHBpdGNofGVufDF8fHx8MTc2ODY5MDUwMHww&ixlib=rb-4.1.0&q=80&w=1080",
      buttonText: "Tout voir",
      to: "/championship/premier-league-2",
    },
    {
      title: "Europa League 2025-2026",
      image:
        "https://images.unsplash.com/photo-1764438300230-f1eb26b918cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMG1hdGNoJTIwYWN0aW9ufGVufDF8fHx8MTc2ODY5MDE5OHww&ixlib=rb-4.1.0&q=80&w=1080",
      buttonText: "Tout voir",
      to: "/championship/premier-league-2",
    },
  ];

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
