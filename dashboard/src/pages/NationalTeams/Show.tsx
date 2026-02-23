import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { useAppDispatch } from "../../store/hooks";
import { deleteNationalTeam, fetchNationalTeams, type NationalTeam } from "./Create";

const ITEMS_PER_PAGE = 10;

export default function Show() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [list, setList] = useState<NationalTeam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: ITEMS_PER_PAGE,
    totalPages: 0,
    totalElements: 0,
  });

  const loadNationalTeams = async (page: number, size: number) => {
    setLoading(true);
    setError(null);

    const resultAction = await dispatch(fetchNationalTeams({ page, size }));

    setLoading(false);

    if (fetchNationalTeams.fulfilled.match(resultAction)) {
      const safeContent = Array.isArray(resultAction.payload?.content) ? resultAction.payload.content : [];
      setList(safeContent);
      setPagination({
        page,
        size,
        totalPages: Number.isFinite(resultAction.payload?.totalPages) ? resultAction.payload.totalPages : 0,
        totalElements: Number.isFinite(resultAction.payload?.totalElements) ? resultAction.payload.totalElements : 0,
      });
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to fetch national teams");
  };

  useEffect(() => {
    void loadNationalTeams(0, ITEMS_PER_PAGE);
  }, []);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void loadNationalTeams(nextPage, pagination.size || ITEMS_PER_PAGE);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this national team?")) {
      return;
    }

    setDeletingId(id);
    const resultAction = await dispatch(deleteNationalTeam(id));
    setDeletingId(null);

    if (!deleteNationalTeam.fulfilled.match(resultAction)) {
      setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to delete national team");
      return;
    }

    await loadNationalTeams(pagination.page, pagination.size || ITEMS_PER_PAGE);
  };

  const columns = [
    { header: "Name", render: (row: NationalTeam) => row.name },
    { header: "Abbreviation", render: (row: NationalTeam) => row.abbreviation },
    { header: "Country", render: (row: NationalTeam) => row.country?.name ?? "-" },
    { header: "Founding Year", render: (row: NationalTeam) => row.foundingYear },
    {
      header: "Actions",
      render: (row: NationalTeam) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/national-teams/edit/${row.id}`)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => void handleDelete(row.id)}
            disabled={loading || deletingId === row.id}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageMeta title="National Teams | chritickets" description="All national teams" />
      <PageBreadcrumb pageTitle="National Teams" />

      <div className="space-y-6">
        <ComponentCard
          title="All National Teams"
          addButton={{
            label: "Add Team +",
            onClick: () => navigate("/national-teams/create"),
          }}
        >
          {loading && <p className="mb-4 text-sm text-gray-500">Loading national teams...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          <PaginatedTable
            columns={columns}
            data={list}
            page={pagination.page}
            totalPages={Math.max(pagination.totalPages, 1)}
            onPageChange={handlePageChange}
          />
        </ComponentCard>
      </div>
    </>
  );
}
