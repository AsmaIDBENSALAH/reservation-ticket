import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { deleteCompetition, fetchCompetitions } from "../../features/competitions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ITEMS_PER_PAGE = 10;

const CompetitionList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading, error, pagination } = useAppSelector((state) => state.competitions);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchCompetitions({ page: 0, size: ITEMS_PER_PAGE }));
  }, [dispatch]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void dispatch(fetchCompetitions({ page: nextPage, size: pagination.size || ITEMS_PER_PAGE }));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this competition?")) {
      return;
    }

    setDeletingId(id);
    await dispatch(deleteCompetition(id));
    setDeletingId(null);
  };

  const columns = [
    { header: "Name", render: (row: (typeof list)[number]) => row.name },
    { header: "Abbreviation", render: (row: (typeof list)[number]) => row.abbreviation },
    { header: "Team Type", render: (row: (typeof list)[number]) => row.teamType },
    { header: "Scope", render: (row: (typeof list)[number]) => row.scope },
    { header: "Continent", render: (row: (typeof list)[number]) => row.continent },
    { header: "Country", render: (row: (typeof list)[number]) => row.country?.name ?? "-" },
    {
      header: "Actions",
      render: (row: (typeof list)[number]) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/competitions/edit/${row.id}`)}>
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
      <PageMeta title="Competitions | chritickets" description="All competitions" />
      <PageBreadcrumb pageTitle="Competitions" />

      <div className="space-y-6">
        <ComponentCard
          title="All Competitions"
          addButton={{
            label: "Add Competition +",
            onClick: () => navigate("/competitions/create"),
          }}
        >
          {loading && <p className="mb-4 text-sm text-gray-500">Loading competitions...</p>}
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
};

export default CompetitionList;
