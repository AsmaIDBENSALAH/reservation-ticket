import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { deleteCountry, fetchCountries } from "../../features/countries";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ITEMS_PER_PAGE = 10;

type CountryRow = {
  id: string;
  name?: string;
  code?: string;
  capital?: string;
  population?: number;
  continentName?: string;
};

function Show() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading, error, pagination } = useAppSelector((state) => state.countries);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchCountries({ page: 0, size: ITEMS_PER_PAGE }));
  }, [dispatch]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void dispatch(fetchCountries({ page: nextPage, size: pagination.size || ITEMS_PER_PAGE }));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this country?")) {
      return;
    }

    setDeletingId(id);
    await dispatch(deleteCountry(id));
    setDeletingId(null);
  };

  const columns = [
    { header: "Name", render: (row: CountryRow) => row.name ?? "-" },
    { header: "Region", render: (row: CountryRow) => row.continentName ?? "-" },
    {
      header: "Actions",
      render: (row: CountryRow) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/country/edit/${row.id}`)}>
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
      <PageMeta title="Country | chritickets" description="All Country" />
      <PageBreadcrumb pageTitle="Country" />

      <div className="space-y-6">
        <ComponentCard
          title="All Countries"
          addButton={{
            label: "Add Country +",
            onClick: () => navigate("/country/create"),
          }}
        >
          {loading && <p className="mb-4 text-sm text-gray-500">Loading countries...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          <PaginatedTable
            columns={columns}
            data={list as CountryRow[]}
            page={pagination.page}
            totalPages={Math.max(pagination.totalPages, 1)}
            onPageChange={handlePageChange}
          />
        </ComponentCard>
      </div>
    </>
  );
}

export default Show;
