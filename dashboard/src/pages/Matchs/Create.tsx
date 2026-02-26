import { useEffect, useMemo, useState } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import NumberInput from "../../components/form/input/NumberInput";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import TextArea from "../../components/form/input/TextArea";
import axiosInstance from "../../api/axiosInstance";
import { fetchCompetitions } from "../../features/competitions";
import { fetchStadiums, type StadiumZone } from "../../features/stadiums";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export interface MatchTeam {
  id: string;
  name: string;
}

export interface MatchCompetition {
  id: string;
  name: string;
}

export interface MatchStadium {
  id: string;
  name: string;
  cityName?: string;
  countryName?: string;
}

export interface MatchZonePricing {
  zoneId: string;
  price: number;
  availableSeats: number;
  zoneName?: string;
  zone?: {
    id: string;
    name: string;
    capacity?: number;
  };
}

export interface Match {
  id: string;
  dateTime: string;
  status: string;
  matchNumber: string;
  attendance: number;
  referee: string;
  matchImageUrl: string;
  stadiumId?: string;
  homeTeamId?: string;
  awayTeamId?: string;
  competitionId?: string;
  stadium?: MatchStadium;
  homeTeam?: MatchTeam;
  awayTeam?: MatchTeam;
  competition?: MatchCompetition;
  zonePricings: MatchZonePricing[];
}

interface CreateMatchPayload {
  dateTime: string;
  status: string;
  matchNumber: string;
  attendance: number;
  referee: string;
  matchImageUrl: string;
  stadiumId: string;
  homeTeamId: string;
  awayTeamId: string;
  competitionId: string;
  zonePricings: Array<{
    zoneId: string;
    price: number;
    availableSeats: number;
    isActive: boolean;
  }>;
}

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

interface UpdateMatchPayload {
  id: string;
  payload: CreateMatchPayload;
}

interface StadiumDetails {
  id: string;
  name: string;
  zones: StadiumZone[];
}

interface ZonePricingRow {
  key: string;
  zoneId: string;
  price: string;
  availableSeats: string;
}

const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message ?? axiosError.message ?? "Unexpected error";
};

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (params: { page: number; size: number }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<PaginatedResponse<Match>>("/api/matches", {
        params: { page: params.page, size: params.size },
      });
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchMatchById = createAsyncThunk(
  "matches/fetchMatchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Match>(`/api/matches/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createMatch = createAsyncThunk(
  "matches/createMatch",
  async (payload: CreateMatchPayload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<Match>("/api/matches", payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateMatch = createAsyncThunk(
  "matches/updateMatch",
  async ({ id, payload }: UpdateMatchPayload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<Match>(`/api/matches/${id}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteMatch = createAsyncThunk(
  "matches/deleteMatch",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/matches/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchStadiumZones = createAsyncThunk(
  "matches/fetchStadiumZones",
  async (stadiumId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<StadiumDetails>(`/api/stadiums/${stadiumId}`);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchTeams = createAsyncThunk(
  "matches/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<PaginatedResponse<MatchTeam>>("/api/teams", {
        params: { page: 0, size: 1000 },
      });
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const STATUS_OPTIONS = [
  { value: "SCHEDULED", label: "SCHEDULED" },
  { value: "LIVE", label: "LIVE" },
  { value: "FINISHED", label: "FINISHED" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "POSTPONED", label: "POSTPONED" },
  { value: "SUSPENDED", label: "SUSPENDED" },
];

const createZonePricingRow = (): ZonePricingRow => ({
  key: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  zoneId: "",
  price: "",
  availableSeats: "",
});

const toDateTimeLocal = (value: string): string => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value.slice(0, 16);
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const toApiDateTime = (value: string): string => {
  if (!value.trim()) {
    return "";
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  return value;
};

const toNumberOrZero = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const Create = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useAppDispatch();
  const { list: stadiums } = useAppSelector((state) => state.stadiums);
  const { list: competitions } = useAppSelector((state) => state.competitions);

  const [teams, setTeams] = useState<MatchTeam[]>([]);
  const [zones, setZones] = useState<StadiumZone[]>([]);
  const [selectKey, setSelectKey] = useState(0);

  const [dateTime, setDateTime] = useState("");
  const [status, setStatus] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  const [attendance, setAttendance] = useState("");
  const [referee, setReferee] = useState("");
  const [matchImageUrl, setMatchImageUrl] = useState("");
  const [stadiumId, setStadiumId] = useState("");
  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");
  const [competitionId, setCompetitionId] = useState("");
  const [zonePricings, setZonePricings] = useState<ZonePricingRow[]>([createZonePricingRow()]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stadiumOptions = useMemo(
    () => stadiums.map((stadium) => ({ value: stadium.id, label: stadium.name })),
    [stadiums],
  );
  const competitionOptions = useMemo(
    () => competitions.map((competition) => ({ value: competition.id, label: competition.name })),
    [competitions],
  );
  const teamOptions = useMemo(() => teams.map((team) => ({ value: team.id, label: team.name })), [teams]);
  const homeTeamOptions = useMemo(
    () => teamOptions.filter((team) => team.value !== awayTeamId),
    [teamOptions, awayTeamId],
  );
  const awayTeamOptions = useMemo(
    () => teamOptions.filter((team) => team.value !== homeTeamId),
    [teamOptions, homeTeamId],
  );
  const zoneOptions = useMemo(() => zones.map((zone) => ({ value: zone.id, label: zone.name })), [zones]);

  const zoneCapacityById = useMemo(() => {
    const entries = zones.map((zone) => [zone.id, zone.capacity] as const);
    return new Map(entries);
  }, [zones]);

  const refreshSelects = () => {
    setSelectKey((previous) => previous + 1);
  };

  const loadStadiumZones = async (targetStadiumId: string, keepRows: boolean) => {
    if (!targetStadiumId) {
      setZones([]);
      setZonePricings([createZonePricingRow()]);
      refreshSelects();
      return;
    }

    const resultAction = await dispatch(fetchStadiumZones(targetStadiumId));
    if (!fetchStadiumZones.fulfilled.match(resultAction)) {
      setZones([]);
      if (!keepRows) {
        setZonePricings([createZonePricingRow()]);
      }
      return;
    }

    const stadiumZones = Array.isArray(resultAction.payload?.zones) ? resultAction.payload.zones : [];
    setZones(stadiumZones);

    if (!keepRows) {
      setZonePricings([createZonePricingRow()]);
    }

    refreshSelects();
  };

  useEffect(() => {
    void dispatch(fetchStadiums({ page: 0, size: 1000 }));
    void dispatch(fetchCompetitions({ page: 0, size: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    const loadTeams = async () => {
      const resultAction = await dispatch(fetchTeams());
      if (fetchTeams.fulfilled.match(resultAction)) {
        const safeTeams = Array.isArray(resultAction.payload?.content) ? resultAction.payload.content : [];
        setTeams(safeTeams);
      }
    };

    void loadTeams();
  }, [dispatch]);

  useEffect(() => {
    if (!isEditMode || !id) {
      return;
    }

    const loadMatch = async () => {
      setPageLoading(true);
      setError(null);

      const resultAction = await dispatch(fetchMatchById(id));
      setPageLoading(false);

      if (!fetchMatchById.fulfilled.match(resultAction)) {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load match");
        return;
      }

      const payload = resultAction.payload;
      const currentStadiumId = payload.stadiumId ?? payload.stadium?.id ?? "";
      const currentZonePricings = Array.isArray(payload.zonePricings) ? payload.zonePricings : [];

      setDateTime(toDateTimeLocal(payload.dateTime ?? ""));
      setStatus(payload.status ?? "");
      setMatchNumber(payload.matchNumber ?? "");
      setAttendance(String(payload.attendance ?? 0));
      setReferee(payload.referee ?? "");
      setMatchImageUrl(payload.matchImageUrl ?? "");
      setStadiumId(currentStadiumId);
      setHomeTeamId(payload.homeTeamId ?? payload.homeTeam?.id ?? "");
      setAwayTeamId(payload.awayTeamId ?? payload.awayTeam?.id ?? "");
      setCompetitionId(payload.competitionId ?? payload.competition?.id ?? "");
      setZonePricings(
        currentZonePricings.length > 0
          ? currentZonePricings.map((zonePricing) => ({
              key: `${zonePricing.zoneId}-${Math.random().toString(36).slice(2, 9)}`,
              zoneId: zonePricing.zoneId ?? zonePricing.zone?.id ?? "",
              price: String(zonePricing.price ?? ""),
              availableSeats: String(zonePricing.availableSeats ?? ""),
            }))
          : [createZonePricingRow()],
      );

      await loadStadiumZones(currentStadiumId, true);
      refreshSelects();
    };

    void loadMatch();
  }, [dispatch, id, isEditMode]);

  const handleStadiumChange = (value: string) => {
    setStadiumId(value);
    setZonePricings([createZonePricingRow()]);
    void loadStadiumZones(value, false);
  };

  const handleHomeTeamChange = (value: string) => {
    setHomeTeamId(value);
    if (value && value === awayTeamId) {
      setAwayTeamId("");
      refreshSelects();
    }
  };

  const handleAwayTeamChange = (value: string) => {
    setAwayTeamId(value);
    if (value && value === homeTeamId) {
      setHomeTeamId("");
      refreshSelects();
    }
  };

  const handleZonePricingChange = (rowKey: string, field: keyof Omit<ZonePricingRow, "key">, value: string) => {
    setZonePricings((previousRows) =>
      previousRows.map((row) => {
        if (row.key !== rowKey) {
          return row;
        }

        if (field === "zoneId") {
          const maxSeats = zoneCapacityById.get(value);
          const seatsValue = toNumberOrZero(row.availableSeats);
          return {
            ...row,
            zoneId: value,
            availableSeats:
              Number.isFinite(maxSeats) && seatsValue > (maxSeats as number)
                ? String(maxSeats)
                : row.availableSeats,
          };
        }

        if (field === "availableSeats") {
          const maxSeats = zoneCapacityById.get(row.zoneId);
          const seatsValue = toNumberOrZero(value);
          if (Number.isFinite(maxSeats) && seatsValue > (maxSeats as number)) {
            return { ...row, availableSeats: String(maxSeats) };
          }
        }

        return { ...row, [field]: value };
      }),
    );
  };

  const handleAddZonePricing = () => {
    setZonePricings((previousRows) => [...previousRows, createZonePricingRow()]);
    refreshSelects();
  };

  const handleRemoveZonePricing = (rowKey: string) => {
    setZonePricings((previousRows) => {
      if (previousRows.length <= 1) {
        return previousRows;
      }
      return previousRows.filter((row) => row.key !== rowKey);
    });
  };

  const handleSubmit = async () => {
    if (!dateTime || !status || !matchNumber.trim() || !stadiumId || !homeTeamId || !awayTeamId || !competitionId) {
      return;
    }

    setLoading(true);
    setError(null);

    const payload: CreateMatchPayload = {
      dateTime: toApiDateTime(dateTime),
      status: status.trim(),
      matchNumber: matchNumber.trim(),
      attendance: toNumberOrZero(attendance),
      referee: referee.trim(),
      matchImageUrl: matchImageUrl.trim(),
      stadiumId,
      homeTeamId,
      awayTeamId,
      competitionId,
      zonePricings: zonePricings
        .map((zonePricing) => ({
          zoneId: zonePricing.zoneId,
          price: toNumberOrZero(zonePricing.price),
          availableSeats: toNumberOrZero(zonePricing.availableSeats),
          isActive: true,
        }))
        .filter((zonePricing) => zonePricing.zoneId),
    };

    const resultAction = isEditMode && id
      ? await dispatch(updateMatch({ id, payload }))
      : await dispatch(createMatch(payload));

    setLoading(false);

    const isSuccess = isEditMode
      ? updateMatch.fulfilled.match(resultAction)
      : createMatch.fulfilled.match(resultAction);

    if (isSuccess) {
      navigate("/matches");
      return;
    }

    const actionError = resultAction as { payload?: unknown; error?: { message?: string } };
    setError((actionError.payload as string) ?? actionError.error?.message ?? "Failed to save match");
  };

  return (
    <>
      <PageMeta
        title={`${isEditMode ? "Edit Match" : "Create Match"} | chritickets`}
        description={isEditMode ? "Edit match" : "Create match"}
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit Match" : "Create Match"} />

      <div className="space-y-6">
        <ComponentCard title={isEditMode ? "Edit Match" : "Create Match"}>
          {pageLoading ? (
            <p className="text-sm text-gray-500">Loading match...</p>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label>Date & Time</Label>
                  <Input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    placeholder="2026-03-20T18:00"
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <Select
                    key={`status-${selectKey}`}
                    options={STATUS_OPTIONS}
                    placeholder="Select status"
                    defaultValue={status}
                    onChange={setStatus}
                  />
                </div>

                <div>
                  <Label>Match Number</Label>
                  <Input
                    type="text"
                    value={matchNumber}
                    onChange={(e) => setMatchNumber(e.target.value)}
                    placeholder="M001"
                  />
                </div>

                <div>
                  <Label>Attendance</Label>
                  <NumberInput
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label>Referee</Label>
                  <Input
                    type="text"
                    value={referee}
                    onChange={(e) => setReferee(e.target.value)}
                    placeholder="Malang Diedhiou"
                  />
                </div>

                <div>
                  <Label>Stadium</Label>
                  <Select
                    key={`stadium-${selectKey}`}
                    options={stadiumOptions}
                    placeholder="Select stadium"
                    defaultValue={stadiumId}
                    onChange={handleStadiumChange}
                  />
                </div>

                <div>
                  <Label>Home Team</Label>
                  <Select
                    key={`home-${selectKey}`}
                    options={homeTeamOptions}
                    placeholder="Select home team"
                    defaultValue={homeTeamId}
                    onChange={handleHomeTeamChange}
                  />
                </div>

                <div>
                  <Label>Away Team</Label>
                  <Select
                    key={`away-${selectKey}`}
                    options={awayTeamOptions}
                    placeholder="Select away team"
                    defaultValue={awayTeamId}
                    onChange={handleAwayTeamChange}
                  />
                </div>

                <div>
                  <Label>Competition</Label>
                  <Select
                    key={`competition-${selectKey}`}
                    options={competitionOptions}
                    placeholder="Select competition"
                    defaultValue={competitionId}
                    onChange={setCompetitionId}
                  />
                </div>
              </div>

              <div>
                <Label>Match Image URL</Label>
                <TextArea
                  rows={2}
                  value={matchImageUrl}
                  onChange={setMatchImageUrl}
                  placeholder="https://example.com/match1.png"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Zone Pricings</Label>
                  <Button size="sm" variant="outline" onClick={handleAddZonePricing}>
                    Add Zone Pricing
                  </Button>
                </div>

                {zonePricings.map((zonePricing) => {
                  const currentMaxSeats = zoneCapacityById.get(zonePricing.zoneId);
                  const selectedZoneIdsInOtherRows = new Set(
                    zonePricings.filter((row) => row.key !== zonePricing.key && row.zoneId).map((row) => row.zoneId),
                  );
                  const zoneOptionsForCurrentRow = zoneOptions.filter(
                    (zone) => zone.value === zonePricing.zoneId || !selectedZoneIdsInOtherRows.has(zone.value),
                  );

                  return (
                    <div
                      key={zonePricing.key}
                      className="space-y-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                          <Label>Zone</Label>
                          <Select
                            key={`zone-${selectKey}-${zonePricing.key}`}
                            options={zoneOptionsForCurrentRow}
                            placeholder="Select zone"
                            defaultValue={zonePricing.zoneId}
                            onChange={(value) => handleZonePricingChange(zonePricing.key, "zoneId", value)}
                          />
                        </div>

                        <div>
                          <Label>Price</Label>
                          <NumberInput
                            value={zonePricing.price}
                            onChange={(e) => handleZonePricingChange(zonePricing.key, "price", e.target.value)}
                            placeholder="15000"
                          />
                        </div>

                        <div>
                          <Label>Available Seats</Label>
                          <NumberInput
                            value={zonePricing.availableSeats}
                            max={Number.isFinite(currentMaxSeats) ? String(currentMaxSeats) : undefined}
                            onChange={(e) => handleZonePricingChange(zonePricing.key, "availableSeats", e.target.value)}
                            placeholder={Number.isFinite(currentMaxSeats) ? `Max ${currentMaxSeats}` : "Available seats"}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={zonePricings.length <= 1}
                          onClick={() => handleRemoveZonePricing(zonePricing.key)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {error && <p className="text-sm text-error-500">{error}</p>}

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate("/matches")}>
                  Cancel
                </Button>
                <Button onClick={() => void handleSubmit()} disabled={loading}>
                  {loading ? "Saving..." : isEditMode ? "Update Match" : "Create Match"}
                </Button>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default Create;
