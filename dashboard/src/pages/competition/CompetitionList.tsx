import { useEffect } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { fetchCompetitions } from "../../features/competitions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ITEMS_PER_PAGE = 10;

const CompetitionList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading, error, pagination } = useAppSelector((state) => state.competitions);

  useEffect(() => {
    void dispatch(fetchCompetitions({ page: 0, size: ITEMS_PER_PAGE }));
  }, [dispatch]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void dispatch(fetchCompetitions({ page: nextPage, size: pagination.size || ITEMS_PER_PAGE }));
  };

  const columns = [
    { header: "Name", render: (row: (typeof list)[number]) => row.name },
    { header: "Abbreviation", render: (row: (typeof list)[number]) => row.abbreviation },
    { header: "Team Type", render: (row: (typeof list)[number]) => row.teamType },
    { header: "Scope", render: (row: (typeof list)[number]) => row.scope },
    { header: "Continent", render: (row: (typeof list)[number]) => row.continent },
    { header: "Country", render: (row: (typeof list)[number]) => row.country?.name ?? "-" },
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
