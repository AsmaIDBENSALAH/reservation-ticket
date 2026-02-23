import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { deleteCountry, fetchCountries } from "../../features/countries";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ITEMS_PER_PAGE = 4;

function Show() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading, error, pagination } = useAppSelector((state) => state.countries);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchCountries({ page: 0, size: ITEMS_PER_PAGE }));
  }, [dispatch]);

  const continentColor = (continent: string) => {
    switch (continent) {
      case "AFRICA":
        return "success";
      case "EUROPE":
        return "primary";
      case "ASIA":
        return "warning";
      case "AMERICAS":
        return "info";
      case "OCEANIA":
        return "error";
      case "ARAB_WORLD":
        return "dark";
      default:
        return "light";
    }
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void dispatch(fetchCountries({ page: nextPage, size: pagination.size || ITEMS_PER_PAGE }));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this country?")) {
      return;
    }

    setDeletingId(id);
    await dispatch(deleteCountry(id));
    setDeletingId(null);
  };

  return (
    <>
      <PageMeta title="Country | chritickets" description="All Country" />
      <PageBreadcrumb pageTitle="Country" />

      <div className="space-y-6">
        <ComponentCard
          title="All Studuims"
          addButton={{
            label: "Add Transaction +",
            onClick: () => navigate("/country/create"),
          }}
        >
          <div className="p-6">
            {loading && <p className="text-sm text-gray-500">Loading countries...</p>}
            {error && <p className="text-sm text-error-500">{error}</p>}

            {!loading && !error && (
              <div className="grid grid-cols-5 gap-6">
                {list.map((country) => (
                  <div
                    key={country.id}
                    className="rounded-xl p-6 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1
        bg-gradient-to-br from-white dark:from-gray-800 to-gray-50 dark:to-gray-900 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{country.name}</h3>
                    <Badge variant="solid" size="sm" color={continentColor(country.continentName)}>
                      {country.continentName}
                    </Badge>
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/country/edit/${country.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => void handleDelete(country.id)}
                        disabled={loading || deletingId === country.id}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                size="sm"
                variant="outline"
                disabled={loading || pagination.first}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                ← Previous
              </Button>

              {Array.from({ length: pagination.totalPages }).map((_, i) => {
                const isActive = pagination.page === i;
                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium border transition
                ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
                }`}
                  >
                    {i + 1}
                  </button>
                );
              })}

              <Button
                size="sm"
                variant="outline"
                disabled={loading || pagination.last || pagination.totalPages === 0}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next →
              </Button>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}

export default Show;
