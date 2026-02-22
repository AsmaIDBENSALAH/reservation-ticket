import { useEffect } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { fetchCities } from "../../features/cities";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ITEMS_PER_PAGE = 10;

const CityList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading, error, pagination } = useAppSelector((state) => state.cities);

  useEffect(() => {
    void dispatch(fetchCities({ page: 0, size: ITEMS_PER_PAGE }));
  }, [dispatch]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void dispatch(fetchCities({ page: nextPage, size: pagination.size || ITEMS_PER_PAGE }));
  };

  const columns = [
    { header: "Name", render: (row: (typeof list)[number]) => row.name },
    { header: "Country", render: (row: (typeof list)[number]) => row.countryName },
  ];

  return (
    <>
      <PageMeta title="Cities | chritickets" description="All cities" />
      <PageBreadcrumb pageTitle="Cities" />

      <div className="space-y-6">
        <ComponentCard
          title="All Cities"
          addButton={{
            label: "Add City +",
            onClick: () => navigate("/cities/create"),
          }}
        >
          {loading && <p className="mb-4 text-sm text-gray-500">Loading cities...</p>}
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

export default CityList;
