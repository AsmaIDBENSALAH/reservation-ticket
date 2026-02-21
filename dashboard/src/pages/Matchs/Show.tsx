import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import Create from "./Create";
import { deleteMatch, fetchMatches, updateMatch } from "../../features/matchs/matchSlice";
import type { MatchResponse } from "../../features/matchs/matchTypes";

export default function ShowMatches() {
    const dispatch = useAppDispatch();
    const { list: matches, pagination } = useAppSelector((state) => state.matches);
    const { isOpen, openModal, closeModal } = useModal();
    const [page, setPage] = useState(0);

    // **State pour match en édition**
    const [editingMatch, setEditingMatch] = useState<MatchResponse | null>(null);

    useEffect(() => {
        void dispatch(fetchMatches({ page, size: pagination.size }));
    }, [dispatch, page, pagination.size]);

    // **Fonction handleEdit pour ouvrir modal avec match**
    const handleEdit = (match: MatchResponse) => {
        setEditingMatch(match); // on met le match en édition
        openModal();            // on ouvre le modal
    };

    const handleDelete = async (match: MatchResponse) => {
        if (!confirm(`Are you sure you want to delete match ${match.matchNumber}?`)) return;
        try {
            await dispatch(deleteMatch(match.id)).unwrap();
            alert("Match deleted!");
            void dispatch(fetchMatches({ page, size: pagination.size }));
        } catch (error: any) {
            console.error("Error deleting match:", error);
            alert(error.message || "Error deleting match");
        }
    };

    const handleChangeStatus = async (match: MatchResponse) => {
        const newStatus = prompt("Enter new status (SCHEDULED, FINISHED, CANCELLED):", match.status);
        if (!newStatus) return;
        try {
            await dispatch(updateMatch({ matchId: match.id, payload: { status: newStatus } })).unwrap();
            alert("Status updated!");
            void dispatch(fetchMatches({ page, size: pagination.size }));
        } catch (error: any) {
            console.error("Error updating status:", error);
            alert(error.message || "Error updating status");
        }
    };

    const columns = [
        { header: "Match Number", render: (row: MatchResponse) => row.matchNumber },
        { header: "Date & Time", render: (row: MatchResponse) => new Date(row.dateTime).toLocaleString() },
        { header: "Stadium", render: (row: MatchResponse) => row.stadiumName },
        { header: "Home Team", render: (row: MatchResponse) => row.homeTeamName },
        { header: "Away Team", render: (row: MatchResponse) => row.awayTeamName },
        { header: "Status", render: (row: MatchResponse) => row.status },
        {
            header: "Zone Pricing",
            render: (row: MatchResponse) =>
                row.zonePricings.map((z) => `${z.name}: ${z.price} ${row.currency}`).join(", "),
        },
        {
            header: "Actions",
            render: (row: MatchResponse) => (
                <div className="flex gap-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(row)}>Delete</button>
                    <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => handleChangeStatus(row)}>Change Status</button>
                </div>
            ),
        },
    ];

    return (
        <>
            <PageMeta title="Matches | chritickets" description="All matches" />
            <PageBreadcrumb pageTitle="Matches" />

            <div className="space-y-6">
                <ComponentCard title="All Matches" addButton={{ label: "Add Match +", onClick: openModal }}>
                    <PaginatedTable
                        columns={columns}
                        data={matches}
                        page={page}
                        totalPages={pagination.totalPages}
                        onPageChange={setPage}
                    />
                </ComponentCard>
            </div>

            {/* Passer le match en édition au modal */}
            <Create
                isOpen={isOpen}
                closeModal={() => {
                    setEditingMatch(null); // reset après fermeture
                    closeModal();
                }}
                editingMatch={editingMatch}
            />
        </>
    );
}