import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { deleteStadium, fetchStadiums } from "../../features/stadiums";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ITEMS_PER_PAGE = 10;

const StadiumList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading, error, pagination } = useAppSelector((state) => state.stadiums);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(
      fetchStadiums({
        page: pagination.page,
        size: pagination.size || ITEMS_PER_PAGE,
      }),
    );
  }, [dispatch, pagination.page, pagination.size]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void dispatch(fetchStadiums({ page: nextPage, size: pagination.size || ITEMS_PER_PAGE }));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this stadium?")) {
      return;
    }

    setDeletingId(id);
    await dispatch(deleteStadium(id));
    setDeletingId(null);
  };

  const columns = [
    { header: "Name", render: (row: (typeof list)[number]) => row.name },
    { header: "Address", render: (row: (typeof list)[number]) => row.address },
    { header: "Capacity", render: (row: (typeof list)[number]) => row.capacity },
    { header: "City", render: (row: (typeof list)[number]) => row.cityName ?? "-" },
    { header: "Country", render: (row: (typeof list)[number]) => row.countryName ?? "-" },
    { header: "Zones", render: (row: (typeof list)[number]) => row.zones.length },
    {
      header: "Actions",
      render: (row: (typeof list)[number]) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/stadiums/edit/${row.id}`)}>
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
      <PageMeta title="Stadiums | chritickets" description="All stadiums" />
      <PageBreadcrumb pageTitle="Stadiums" />

      <div className="space-y-6">
        <ComponentCard
          title="All Stadiums"
          addButton={{
            label: "Add Stadium +",
            onClick: () => navigate("/stadiums/create"),
          }}
        >
          {loading && <p className="mb-4 text-sm text-gray-500">Loading stadiums...</p>}
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

export default StadiumList;
