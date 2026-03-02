import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { deleteCountry, fetchCountryById, type Country } from "../../features/countries";
import { useAppDispatch } from "../../store/hooks";

type CountryDetails = Country & {
  code?: string;
  capital?: string;
  population?: number;
};

const formatDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

export default function CountryDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [country, setCountry] = useState<CountryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Country ID is missing");
      setLoading(false);
      return;
    }

    const loadCountry = async () => {
      setLoading(true);
      setError(null);

      const resultAction = await dispatch(fetchCountryById(id));

      if (fetchCountryById.fulfilled.match(resultAction)) {
        setCountry(resultAction.payload as CountryDetails);
      } else {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load country");
      }

      setLoading(false);
    };

    void loadCountry();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!country?.id) {
      return;
    }

    if (!window.confirm("Are you sure you want to delete this country?")) {
      return;
    }

    setIsDeleting(true);
    const resultAction = await dispatch(deleteCountry(country.id));
    setIsDeleting(false);

    if (deleteCountry.fulfilled.match(resultAction)) {
      navigate("/country/show");
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to delete country");
  };

  const columns = [
    { header: "Name", render: (row: CountryDetails) => row.name ?? "-" },
    { header: "Code", render: (row: CountryDetails) => row.code ?? "-" },
    { header: "Capital", render: (row: CountryDetails) => row.capital ?? "-" },
    {
      header: "Population",
      render: (row: CountryDetails) =>
        typeof row.population === "number" ? row.population.toLocaleString() : "-",
    },
    { header: "Region", render: (row: CountryDetails) => row.continentName ?? "-" },
    { header: "Active", render: (row: CountryDetails) => (row.active ? "Yes" : "No") },
    { header: "Created At", render: (row: CountryDetails) => formatDate(row.createdAt) },
    {
      header: "Actions",
      render: (row: CountryDetails) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/country/edit/${row.id}`)}>
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
      <PageMeta title="Country Details | chritickets" description="Country details" />
      <PageBreadcrumb pageTitle="Country Details" />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/country/show")}>
            Back
          </Button>
        </div>

        <ComponentCard title="Country Details">
          {loading && <p className="mb-4 text-sm text-gray-500">Loading country...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          {!loading && !error && country && (
            <PaginatedTable
              columns={columns}
              data={[country]}
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
