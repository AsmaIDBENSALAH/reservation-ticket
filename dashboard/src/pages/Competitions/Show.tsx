import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import Create from "./Create";

interface Competition {
  id: string;
  name: string;
  abbreviation: string;
  teamType: string;
  scope: string;
  country: string;
  continent: string;
}

export default function Show() {
  const { isOpen, openModal, closeModal } = useModal();

  // Fake data
  const fakeData: Competition[] = [
    {
      id: "1",
      name: "African Championship",
      abbreviation: "AFCH",
      teamType: "CLUB",
      scope: "CONTINENTAL",
      country: "Morocco",
      continent: "Africa",
    },
    {
      id: "2",
      name: "National League",
      abbreviation: "NL",
      teamType: "CLUB",
      scope: "NATIONAL",
      country: "Spain",
      continent: "Europe",
    },
  ];

  const columns = [
    { header: "Name", render: (row: Competition) => row.name },
    { header: "Abbreviation", render: (row: Competition) => row.abbreviation },
    { header: "Team Type", render: (row: Competition) => row.teamType },
    { header: "Scope", render: (row: Competition) => row.scope },
    { header: "Country", render: (row: Competition) => row.country },
    { header: "Continent", render: (row: Competition) => row.continent },
  ];

  const [page, setPage] = useState(0);
  const totalPages = 1;

  return (
    <>
      <PageMeta
        title="Competitions | chritickets"
        description="All competitions"
      />
      <PageBreadcrumb pageTitle="Competitions" />

      <div className="space-y-6">
        <ComponentCard
          title="All Competitions"
          addButton={{
            label: "Add Competition +",
            onClick: openModal,
          }}
        >
          <PaginatedTable
            columns={columns}
            data={fakeData}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </ComponentCard>
      </div>

      {/* Modal */}
      <Create isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
