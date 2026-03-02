import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import {
  deleteCompetition,
  fetchCompetitionById,
  type Competition,
  type CompetitionCountry,
} from "../../features/competitions";
import { useAppDispatch } from "../../store/hooks";

const formatDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

const formatCountries = (countries?: CompetitionCountry[]): string => {
  if (!countries || countries.length === 0) {
    return "-";
  }

  return countries.map((country) => country.name).join(", ");
};

export default function CompetitionDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Competition ID is missing");
      setLoading(false);
      return;
    }

    const loadCompetition = async () => {
      setLoading(true);
      setError(null);

      const resultAction = await dispatch(fetchCompetitionById(id));

      if (fetchCompetitionById.fulfilled.match(resultAction)) {
        setCompetition(resultAction.payload);
      } else {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load competition");
      }

      setLoading(false);
    };

    void loadCompetition();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!competition?.id) {
      return;
    }

    if (!window.confirm("Are you sure you want to delete this competition?")) {
      return;
    }

    setIsDeleting(true);
    const resultAction = await dispatch(deleteCompetition(competition.id));
    setIsDeleting(false);

    if (deleteCompetition.fulfilled.match(resultAction)) {
      navigate("/competitions");
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to delete competition");
  };

  const columns = [
    { header: "Name", render: (row: Competition) => row.name ?? "-" },
    { header: "Abbreviation", render: (row: Competition) => row.abbreviation ?? "-" },
    { header: "Team Type", render: (row: Competition) => row.teamType ?? "-" },
    { header: "Scope", render: (row: Competition) => row.scope ?? "-" },
    { header: "Continent", render: (row: Competition) => row.continent ?? "-" },
    { header: "Country", render: (row: Competition) => row.country?.name ?? "-" },
    { header: "Countries", render: (row: Competition) => formatCountries(row.countries) },
    { header: "Created At", render: (row: Competition) => formatDate(row.createdAt) },
    {
      header: "Actions",
      render: (row: Competition) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/competitions/edit/${row.id}`)}>
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
      <PageMeta title="Competition Details | chritickets" description="Competition details" />
      <PageBreadcrumb pageTitle="Competition Details" />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/competitions")}>
            Back
          </Button>
        </div>

        <ComponentCard title="Competition Details">
          {loading && <p className="mb-4 text-sm text-gray-500">Loading competition...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          {!loading && !error && competition && (
            <PaginatedTable
              columns={columns}
              data={[competition]}
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
