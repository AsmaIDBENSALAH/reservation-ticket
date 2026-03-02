import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { deleteCity, fetchCityById, type City } from "../../features/cities";
import { useAppDispatch } from "../../store/hooks";

const formatDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

export default function CityDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("City ID is missing");
      setLoading(false);
      return;
    }

    const loadCity = async () => {
      setLoading(true);
      setError(null);

      const resultAction = await dispatch(fetchCityById(id));

      if (fetchCityById.fulfilled.match(resultAction)) {
        setCity(resultAction.payload);
      } else {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load city");
      }

      setLoading(false);
    };

    void loadCity();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!city?.id) {
      return;
    }

    if (!window.confirm("Are you sure you want to delete this city?")) {
      return;
    }

    setIsDeleting(true);
    const resultAction = await dispatch(deleteCity(city.id));
    setIsDeleting(false);

    if (deleteCity.fulfilled.match(resultAction)) {
      navigate("/cities");
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to delete city");
  };

  const columns = [
    { header: "Name", render: (row: City) => row.name ?? "-" },
    { header: "Country", render: (row: City) => row.countryName ?? row.country?.name ?? "-" },
    { header: "Active", render: (row: City) => (row.active ? "Yes" : "No") },
    { header: "Created At", render: (row: City) => formatDate(row.createdAt) },
    { header: "Updated At", render: (row: City) => formatDate(row.updatedAt) },
    {
      header: "Actions",
      render: (row: City) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/cities/edit/${row.id}`)}>
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => void handleDelete()} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageMeta title="City Details | chritickets" description="City details" />
      <PageBreadcrumb pageTitle="City Details" />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/cities")}>
            Back
          </Button>
        </div>

        <ComponentCard title="City Details">
          {loading && <p className="mb-4 text-sm text-gray-500">Loading city...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          {!loading && !error && city && (
            <PaginatedTable
              columns={columns}
              data={[city]}
              page={0}
              totalPages={1}
              onPageChange={() => undefined}
            />
          )}
        </ComponentCard>
      </div>
    </>
  );
}
