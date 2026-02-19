import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useAppDispatch } from "../../store/hooks";
import { type Club, fetchClubs } from "./Create";

const ITEMS_PER_PAGE = 10;

export default function Show() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [list, setList] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: ITEMS_PER_PAGE,
    totalPages: 0,
    totalElements: 0,
  });

  const loadClubs = async (page: number, size: number) => {
    setLoading(true);
    setError(null);

    const resultAction = await dispatch(fetchClubs({ page, size }));

    setLoading(false);

    if (fetchClubs.fulfilled.match(resultAction)) {
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

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to fetch clubs");
  };

  useEffect(() => {
    void loadClubs(0, ITEMS_PER_PAGE);
  }, []);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void loadClubs(nextPage, pagination.size || ITEMS_PER_PAGE);
  };

  const columns = [
    { header: "Name", render: (row: Club) => row.name },
    { header: "Abbreviation", render: (row: Club) => row.abbreviation },
    { header: "Country", render: (row: Club) => row.country?.name ?? "-" },
    { header: "Founding Year", render: (row: Club) => row.foundingYear },
  ];

  return (
    <>
      <PageMeta title="Clubs | chritickets" description="All clubs" />
      <PageBreadcrumb pageTitle="Clubs" />

      <div className="space-y-6">
        <ComponentCard
          title="All Clubs"
          addButton={{
            label: "Add Club +",
            onClick: () => navigate("/clubs/create"),
          }}
        >
          {loading && <p className="mb-4 text-sm text-gray-500">Loading clubs...</p>}
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
