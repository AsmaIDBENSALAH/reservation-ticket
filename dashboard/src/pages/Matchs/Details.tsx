import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { fetchCompetitions } from "../../features/competitions";
import { fetchStadiums } from "../../features/stadiums";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteMatch, fetchMatchById, fetchTeams, type Match, type MatchZonePricing } from "./Create";

const NESTED_PAGE_SIZE = 5;

const formatDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

export default function MatchDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { list: stadiums } = useAppSelector((state) => state.stadiums);
  const { list: competitions } = useAppSelector((state) => state.competitions);

  const [teams, setTeams] = useState<Array<{ id: string; name: string }>>([]);
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [zonePage, setZonePage] = useState(0);

  const stadiumNameById = useMemo(() => new Map(stadiums.map((item) => [item.id, item.name])), [stadiums]);
  const competitionNameById = useMemo(
    () => new Map(competitions.map((item) => [item.id, item.name])),
    [competitions],
  );
  const teamNameById = useMemo(() => new Map(teams.map((item) => [item.id, item.name])), [teams]);

  useEffect(() => {
    void dispatch(fetchStadiums({ page: 0, size: 1000 }));
    void dispatch(fetchCompetitions({ page: 0, size: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    const loadTeams = async () => {
      const resultAction = await dispatch(fetchTeams());
      if (fetchTeams.fulfilled.match(resultAction)) {
        const safeTeams = Array.isArray(resultAction.payload?.content) ? resultAction.payload.content : [];
        setTeams(safeTeams.map((team) => ({ id: team.id, name: team.name })));
      }
    };

    void loadTeams();
  }, [dispatch]);

  useEffect(() => {
    if (!id) {
      setError("Match ID is missing");
      setLoading(false);
      return;
    }

    const loadMatch = async () => {
      setLoading(true);
      setError(null);

      const resultAction = await dispatch(fetchMatchById(id));

      if (fetchMatchById.fulfilled.match(resultAction)) {
        setMatch(resultAction.payload);
      } else {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load match");
      }

      setLoading(false);
    };

    void loadMatch();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!match?.id) {
      return;
    }

    if (!window.confirm("Are you sure you want to delete this match?")) {
      return;
    }

    setIsDeleting(true);
    const resultAction = await dispatch(deleteMatch(match.id));
    setIsDeleting(false);

    if (deleteMatch.fulfilled.match(resultAction)) {
      navigate("/matches");
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to delete match");
  };

  const getTeamName = (row: Match, kind: "home" | "away"): string => {
    if (kind === "home") {
      return row.homeTeam?.name ?? teamNameById.get(row.homeTeamId ?? "") ?? "-";
    }
    return row.awayTeam?.name ?? teamNameById.get(row.awayTeamId ?? "") ?? "-";
  };

  const getStadiumName = (row: Match): string => row.stadium?.name ?? stadiumNameById.get(row.stadiumId ?? "") ?? "-";
  const getCompetitionName = (row: Match): string =>
    row.competition?.name ?? competitionNameById.get(row.competitionId ?? "") ?? "-";

  const zoneRows = useMemo(() => match?.zonePricings ?? [], [match]);
  const zoneTotalPages = Math.max(1, Math.ceil(zoneRows.length / NESTED_PAGE_SIZE));
  const pagedZoneRows = useMemo(
    () => zoneRows.slice(zonePage * NESTED_PAGE_SIZE, (zonePage + 1) * NESTED_PAGE_SIZE),
    [zonePage, zoneRows],
  );

  const columns = [
    { header: "Match Number", render: (row: Match) => row.matchNumber ?? "-" },
    { header: "Date & Time", render: (row: Match) => formatDate(row.dateTime) },
    { header: "Status", render: (row: Match) => row.status ?? "-" },
    { header: "Attendance", render: (row: Match) => row.attendance?.toLocaleString() ?? "-" },
    { header: "Referee", render: (row: Match) => row.referee ?? "-" },
    { header: "Home Team", render: (row: Match) => getTeamName(row, "home") },
    { header: "Away Team", render: (row: Match) => getTeamName(row, "away") },
    { header: "Stadium", render: (row: Match) => getStadiumName(row) },
    { header: "Competition", render: (row: Match) => getCompetitionName(row) },
    {
      header: "Actions",
      render: (row: Match) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/matches/edit/${row.id}`)}>
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
    { header: "Zone", render: (row: MatchZonePricing) => row.zoneName ?? row.zone?.name ?? "-" },
    { header: "Price", render: (row: MatchZonePricing) => row.price?.toLocaleString() ?? "-" },
    { header: "Available Seats", render: (row: MatchZonePricing) => row.availableSeats?.toLocaleString() ?? "-" },
  ];

  return (
    <>
      <PageMeta title="Match Details | chritickets" description="Match details" />
      <PageBreadcrumb pageTitle="Match Details" />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/matches")}>
            Back
          </Button>
        </div>

        <ComponentCard title="Match Details">
          {loading && <p className="mb-4 text-sm text-gray-500">Loading match...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          {!loading && !error && match && (
            <div className="space-y-6">
              <PaginatedTable
                columns={columns}
                data={[match]}
                page={0}
                totalPages={1}
                onPageChange={() => undefined}
              />

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Zone Pricings
                </h3>
                <PaginatedTable
                  columns={zoneColumns}
                  data={pagedZoneRows}
                  page={zonePage}
                  totalPages={zoneTotalPages}
                  onPageChange={setZonePage}
                />
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
