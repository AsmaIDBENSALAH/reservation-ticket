import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import Create from "./Create";

interface ZonePricing {
  zoneName: string;
  price: number;
  availableSeats: number;
  isActive: boolean;
}

interface Match {
  id: string;
  dateTime: string;
  status: string;
  matchNumber: string;
  attendance: number;
  referee: string;
  stadiumName: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  zonePricings: ZonePricing[];
}

export default function ShowMatches() {
  const { isOpen, openModal, closeModal } = useModal();
  const [page, setPage] = useState(0);
  const totalPages = 1;

  const fakeMatches: Match[] = [
    {
      id: "1",
      dateTime: "2026-02-15T16:50:13.104Z",
      status: "Scheduled",
      matchNumber: "M001",
      attendance: 5000,
      referee: "Ref 1",
      stadiumName: "Stadium A",
      homeTeam: "Morocco",
      awayTeam: "Spain",
      competition: "World Cup",
      zonePricings: [
        { zoneName: "VIP", price: 50, availableSeats: 50, isActive: true },
        { zoneName: "Regular", price: 20, availableSeats: 200, isActive: true },
      ],
    },
  ];

  const columns = [
    { header: "Match Number", render: (row: Match) => row.matchNumber },
    { header: "Date & Time", render: (row: Match) => new Date(row.dateTime).toLocaleString() },
    { header: "Stadium", render: (row: Match) => row.stadiumName },
    { header: "Home Team", render: (row: Match) => row.homeTeam },
    { header: "Away Team", render: (row: Match) => row.awayTeam },
    { header: "Status", render: (row: Match) => row.status },
    {
      header: "Zone Pricing",
      render: (row: Match) =>
        row.zonePricings.map((z) => `${z.zoneName}: $${z.price}`).join(", "),
    },
  ];

  return (
    <>
      <PageMeta title="Matches | chritickets" description="All matches" />
      <PageBreadcrumb pageTitle="Matches" />

      <div className="space-y-6">
        <ComponentCard title="All Matches" addButton={{ label: "Add Match +", onClick: openModal }}>
          <PaginatedTable columns={columns} data={fakeMatches} page={page} totalPages={totalPages} onPageChange={setPage} />
        </ComponentCard>
      </div>

      <Create isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
