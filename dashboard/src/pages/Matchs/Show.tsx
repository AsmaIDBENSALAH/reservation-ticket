import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Button from "../../components/ui/button/Button";
import { fetchCompetitions } from "../../features/competitions";
import { fetchStadiums } from "../../features/stadiums";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMatches, fetchTeams, type Match } from "./Create";

const ITEMS_PER_PAGE = 10;

const formatDateTime = (value: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
};

export default function ShowMatches() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list: stadiums } = useAppSelector((state) => state.stadiums);
  const { list: competitions } = useAppSelector((state) => state.competitions);

  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: ITEMS_PER_PAGE,
    totalPages: 0,
    totalElements: 0,
  });

  const stadiumNameById = useMemo(() => {
    const entries = stadiums.map((stadium) => [stadium.id, stadium.name] as const);
    return new Map(entries);
  }, [stadiums]);

  const competitionNameById = useMemo(() => {
    const entries = competitions.map((competition) => [competition.id, competition.name] as const);
    return new Map(entries);
  }, [competitions]);

  const teamNameById = useMemo(() => {
    const entries = teams.map((team) => [team.id, team.name] as const);
    return new Map(entries);
  }, [teams]);

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

  const loadMatches = async (page: number, size: number) => {
    setLoading(true);
    setError(null);

    const resultAction = await dispatch(fetchMatches({ page, size }));

    setLoading(false);

    if (fetchMatches.fulfilled.match(resultAction)) {
      const safeContent = Array.isArray(resultAction.payload?.content) ? resultAction.payload.content : [];
      setMatches(safeContent);
      setPagination({
        page,
        size,
        totalPages: Number.isFinite(resultAction.payload?.totalPages) ? resultAction.payload.totalPages : 0,
        totalElements: Number.isFinite(resultAction.payload?.totalElements) ? resultAction.payload.totalElements : 0,
      });
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to fetch matches");
  };

  useEffect(() => {
    void loadMatches(0, ITEMS_PER_PAGE);
  }, []);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || (pagination.totalPages > 0 && nextPage >= pagination.totalPages)) {
      return;
    }

    void loadMatches(nextPage, pagination.size || ITEMS_PER_PAGE);
  };

  const getTeamName = (match: Match, kind: "home" | "away"): string => {
    if (kind === "home") {
      return match.homeTeam?.name ?? teamNameById.get(match.homeTeamId ?? "") ?? "-";
    }
    return match.awayTeam?.name ?? teamNameById.get(match.awayTeamId ?? "") ?? "-";
  };

  const getStadiumName = (match: Match): string => match.stadium?.name ?? stadiumNameById.get(match.stadiumId ?? "") ?? "-";
  const getCompetitionName = (match: Match): string =>
    match.competition?.name ?? competitionNameById.get(match.competitionId ?? "") ?? "-";

  const columns = [
    { header: "Match Number", render: (row: Match) => row.matchNumber ?? "-" },
    { header: "Date & Time", render: (row: Match) => formatDateTime(row.dateTime) },
    { header: "Status", render: (row: Match) => row.status ?? "-" },
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
        </div>
      ),
    },
  ];

  return (
    <>
      <PageMeta title="Matches | chritickets" description="All matches" />
      <PageBreadcrumb pageTitle="Matches" />

      <div className="space-y-6">
        <ComponentCard
          title="All Matches"
          addButton={{
            label: "Add Match +",
            onClick: () => navigate("/matches/create"),
          }}
        >
          {loading && <p className="mb-4 text-sm text-gray-500">Loading matches...</p>}
          {error && <p className="mb-4 text-sm text-error-500">{error}</p>}

          <PaginatedTable
            columns={columns}
            data={matches}
            page={pagination.page}
            totalPages={Math.max(pagination.totalPages, 1)}
            onPageChange={handlePageChange}
          />
        </ComponentCard>
      </div>
    </>
  );
}
