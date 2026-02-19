import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import Create from "./Create";
import { useModal } from "../../hooks/useModal";

interface Zone {
  name: string;
  capacity: number;
  description: string;
}

interface Studium {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  constructionYear: number;
  description: string;
}

// Fake data
const fakeData: Studium[] = [
  {
    id: "1",
    name: "Stadium A",
    address: "123 Main St",
    city: "Casablanca",
    country: "Morocco",
    capacity: 5000,
    constructionYear: 1990,
    description: "Main stadium in Casablanca",
  },
  {
    id: "2",
    name: "Stadium B",
    address: "456 Side St",
    city: "Madrid",
    country: "Spain",
    capacity: 8000,
    constructionYear: 2000,
    description: "Main stadium in Madrid",
  },
];

export default function Show() {
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const { isOpen, openModal, closeModal } = useModal();

  const totalPages = Math.ceil(fakeData.length / pageSize);
  const currentPageData = fakeData.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  const columns = [
    {
      header: "Name",
      render: (row: Studium) => row.name,
    },
    {
      header: "Address",
      render: (row: Studium) => row.address,
    },
    {
      header: "City",
      render: (row: Studium) => row.city,
    },
    {
      header: "Country",
      render: (row: Studium) => row.country,
    },
    {
      header: "Capacity",
      render: (row: Studium) => row.capacity,
    },
    {
      header: "Construction Year",
      render: (row: Studium) => row.constructionYear,
    },
  ];

  return (
    <>
      <PageMeta title="Studiums | Dashboard" description="All studiums" />
      <PageBreadcrumb pageTitle="Studiums" />
      <div className="space-y-6">
        <ComponentCard
          title="All Studiums"
          addButton={{ label: "Add Match +", onClick: openModal }}
        >
          <PaginatedTable
            columns={columns}
            data={currentPageData}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </ComponentCard>
      </div>
      <Create isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
