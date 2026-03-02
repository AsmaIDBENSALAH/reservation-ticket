import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { useAppDispatch } from "../../store/hooks";
import { deleteNationalTeam, fetchNationalTeamById, type NationalTeam } from "./Create";

const formatDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

export default function NationalTeamDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [team, setTeam] = useState<NationalTeam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("National Team ID is missing");
      setLoading(false);
      return;
    }

    const loadNationalTeam = async () => {
      setLoading(true);
      setError(null);

      const resultAction = await dispatch(fetchNationalTeamById(id));

      if (fetchNationalTeamById.fulfilled.match(resultAction)) {
        setTeam(resultAction.payload);
      } else {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load national team");
      }

      setLoading(false);
    };

    void loadNationalTeam();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!team?.id) {
      return;
    }

    if (!window.confirm("Are you sure you want to delete this national team?")) {
      return;
    }

    setIsDeleting(true);
    const resultAction = await dispatch(deleteNationalTeam(team.id));
    setIsDeleting(false);

    if (deleteNationalTeam.fulfilled.match(resultAction)) {
      navigate("/national-teams");
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to delete national team");
  };

  const columns = [
    { header: "Name", render: (row: NationalTeam) => row.name ?? "-" },
    { header: "Abbreviation", render: (row: NationalTeam) => row.abbreviation ?? "-" },
    { header: "Country", render: (row: NationalTeam) => row.country?.name ?? "-" },
    { header: "Type", render: (row: NationalTeam) => row.type ?? "-" },
    { header: "Founding Year", render: (row: NationalTeam) => row.foundingYear ?? "-" },
    { header: "Description", render: (row: NationalTeam) => row.description ?? "-" },
    { header: "Created At", render: (row: NationalTeam) => formatDate(row.createdAt) },
    {
      header: "Actions",
      render: (row: NationalTeam) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/national-teams/edit/${row.id}`)}>
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
      <PageMeta title="National Team Details | chritickets" description="National team details" />
      <PageBreadcrumb pageTitle="National Team Details" />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/national-teams")}>
            Back
          </Button>
        </div>

        <ComponentCard title="National Team Details">
          {loading && <p className="mb-4 text-sm text-gray-500">Loading national team...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          {!loading && !error && team && (
            <PaginatedTable
              columns={columns}
              data={[team]}
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
