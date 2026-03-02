import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { useAppDispatch } from "../../store/hooks";
import { deleteClub, fetchClubById, type Club } from "./Create";

const formatDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

export default function ClubDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Club ID is missing");
      setLoading(false);
      return;
    }

    const loadClub = async () => {
      setLoading(true);
      setError(null);

      const resultAction = await dispatch(fetchClubById(id));

      if (fetchClubById.fulfilled.match(resultAction)) {
        setClub(resultAction.payload);
      } else {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load club");
      }

      setLoading(false);
    };

    void loadClub();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!club?.id) {
      return;
    }

    if (!window.confirm("Are you sure you want to delete this club?")) {
      return;
    }

    setIsDeleting(true);
    const resultAction = await dispatch(deleteClub(club.id));
    setIsDeleting(false);

    if (deleteClub.fulfilled.match(resultAction)) {
      navigate("/clubs");
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to delete club");
  };

  const columns = [
    { header: "Name", render: (row: Club) => row.name ?? "-" },
    { header: "Abbreviation", render: (row: Club) => row.abbreviation ?? "-" },
    { header: "Country", render: (row: Club) => row.country?.name ?? "-" },
    { header: "Type", render: (row: Club) => row.type ?? "-" },
    { header: "Founding Year", render: (row: Club) => row.foundingYear ?? "-" },
    { header: "Description", render: (row: Club) => row.description ?? "-" },
    { header: "Created At", render: (row: Club) => formatDate(row.createdAt) },
    {
      header: "Actions",
      render: (row: Club) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/clubs/edit/${row.id}`)}>
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
      <PageMeta title="Club Details | chritickets" description="Club details" />
      <PageBreadcrumb pageTitle="Club Details" />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/clubs")}>
            Back
          </Button>
        </div>

        <ComponentCard title="Club Details">
          {loading && <p className="mb-4 text-sm text-gray-500">Loading club...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          {!loading && !error && club && (
            <PaginatedTable
              columns={columns}
              data={[club]}
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
