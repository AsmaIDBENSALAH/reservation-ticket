import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { deleteStadium, fetchStadiumById, type Stadium, type StadiumZone } from "../../features/stadiums";
import { useAppDispatch } from "../../store/hooks";

const NESTED_PAGE_SIZE = 5;

const formatDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

export default function StadiumDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [stadium, setStadium] = useState<Stadium | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [zonesPage, setZonesPage] = useState(0);

  useEffect(() => {
    if (!id) {
      setError("Stadium ID is missing");
      setLoading(false);
      return;
    }

    const loadStadium = async () => {
      setLoading(true);
      setError(null);

      const resultAction = await dispatch(fetchStadiumById(id));

      if (fetchStadiumById.fulfilled.match(resultAction)) {
        setStadium(resultAction.payload);
      } else {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load stadium");
      }

      setLoading(false);
    };

    void loadStadium();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!stadium?.id) {
      return;
    }

    if (!window.confirm("Are you sure you want to delete this stadium?")) {
      return;
    }

    setIsDeleting(true);
    const resultAction = await dispatch(deleteStadium(stadium.id));
    setIsDeleting(false);

    if (deleteStadium.fulfilled.match(resultAction)) {
      navigate("/stadiums");
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to delete stadium");
  };

  const zoneRows = useMemo(() => stadium?.zones ?? [], [stadium]);
  const zonesTotalPages = Math.max(1, Math.ceil(zoneRows.length / NESTED_PAGE_SIZE));
  const pagedZones = useMemo(
    () => zoneRows.slice(zonesPage * NESTED_PAGE_SIZE, (zonesPage + 1) * NESTED_PAGE_SIZE),
    [zoneRows, zonesPage],
  );

  const detailsColumns = [
    { header: "Name", render: (row: Stadium) => row.name ?? "-" },
    { header: "Address", render: (row: Stadium) => row.address ?? "-" },
    { header: "City", render: (row: Stadium) => row.cityName ?? "-" },
    { header: "Country", render: (row: Stadium) => row.countryName ?? "-" },
    { header: "Capacity", render: (row: Stadium) => row.capacity?.toLocaleString() ?? "-" },
    { header: "Construction Year", render: (row: Stadium) => row.constructionYear ?? "-" },
    { header: "Description", render: (row: Stadium) => row.description ?? "-" },
    { header: "Created At", render: (row: Stadium) => formatDate(row.createdAt) },
    {
      header: "Actions",
      render: (row: Stadium) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/stadiums/edit/${row.id}`)}>
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => void handleDelete()} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      ),
    },
  ];

  const zoneColumns = [
    { header: "Zone", render: (row: StadiumZone) => row.name ?? "-" },
    { header: "Capacity", render: (row: StadiumZone) => row.capacity?.toLocaleString() ?? "-" },
    { header: "Description", render: (row: StadiumZone) => row.description ?? "-" },
  ];

  return (
    <>
      <PageMeta title="Stadium Details | chritickets" description="Stadium details" />
      <PageBreadcrumb pageTitle="Stadium Details" />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/stadiums")}>
            Back
          </Button>
        </div>

        <ComponentCard title="Stadium Details">
          {loading && <p className="mb-4 text-sm text-gray-500">Loading stadium...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          {!loading && !error && stadium && (
            <div className="space-y-6">
              <PaginatedTable
                columns={detailsColumns}
                data={[stadium]}
                page={0}
                totalPages={1}
                onPageChange={() => undefined}
              />

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Zones
                </h3>
                <PaginatedTable
                  columns={zoneColumns}
                  data={pagedZones}
                  page={zonesPage}
                  totalPages={zonesTotalPages}
                  onPageChange={setZonesPage}
                />
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
