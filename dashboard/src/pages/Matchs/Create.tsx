import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import DatePicker from "../../components/form/date-picker";
import { getStadiums } from "../../features/stadiums/stadiumService";
import { getCompetitions } from "../../features/competitions/competitionService";
import { fetchClubs } from "../Clubs/Create";
import { fetchNationalTeams } from "../NationalTeams/Create";
import { useAppDispatch } from "../../store/hooks";
import { createMatch, updateMatch } from "../../features/matchs/matchSlice";
import type { MatchResponse } from "../../features/matchs/matchTypes";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  editingMatch: MatchResponse | null;
}

interface Zone {
  id: string;
  name: string;
}

interface Stadium {
  id: string;
  name: string;
  zones: Zone[];
}

export default function Create({ isOpen, closeModal, editingMatch }: Props) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    dateTime: "",
    status: "",
    matchNumber: "",
    attendance: 0,
    referee: "",
    stadiumId: "",
    homeTeamId: "",
    awayTeamId: "",
    competitionId: "",
    currency: "MAD",
    zonePricings: [] as { zoneId: string; price: number; availableSeats: number; isActive: boolean }[],
  });

  const [competitions, setCompetitions] = useState<{ id: string; name: string; teamType: "CLUB" | "NATIONAL" }[]>([]);
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);

  // Fetch stadiums
  useEffect(() => {
    const fetchStadiumsData = async () => {
      try {
        const data = await getStadiums(0, 100);
        setStadiums(data.content);
      } catch (error) {
        console.error("Error fetching stadiums:", error);
      }
    };
    fetchStadiumsData();
  }, []);

  // Fetch competitions
  useEffect(() => {
    const fetchCompetitionsData = async () => {
      try {
        const data = await getCompetitions(0, 100);
        setCompetitions(data.content);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
    fetchCompetitionsData();
  }, []);

  // Pré-remplir le formulaire si editingMatch est défini
  useEffect(() => {
    if (editingMatch) {
      console.log(editingMatch);
      setForm({
        dateTime: editingMatch.dateTime,
        status: editingMatch.status,
        matchNumber: editingMatch.matchNumber,
        attendance: editingMatch.attendance,
        referee: editingMatch.referee,
        stadiumId: editingMatch.stadiumId,
        homeTeamId: editingMatch.homeTeamId,
        awayTeamId: editingMatch.awayTeamId,
        competitionId: editingMatch.competitionId,
        currency: editingMatch.currency || "MAD",
        zonePricings: editingMatch.zonePricings.map((z) => ({
          zoneId: z.id,
          price: z.price,
          availableSeats: z.availableSeats,
          isActive: z.isActive,
        })),
      });
      const stadium = stadiums.find((s) => s.id === editingMatch.stadiumId);
      setZones(stadium?.zones || []);
    } else {
      setForm({
        dateTime: "",
        status: "",
        matchNumber: "",
        attendance: 0,
        referee: "",
        stadiumId: "",
        homeTeamId: "",
        awayTeamId: "",
        competitionId: "",
        currency: "MAD",
        zonePricings: [],
      });
      setZones([]);
    }
  }, [editingMatch, stadiums]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setForm({
        dateTime: "",
        status: "",
        matchNumber: "",
        attendance: 0,
        referee: "",
        stadiumId: "",
        homeTeamId: "",
        awayTeamId: "",
        competitionId: "",
        currency: "MAD",
        zonePricings: [],
      });
      setZones([]);
    }
  }, [isOpen]);

  const handleCompetitionChange = async (competitionId: string) => {
    const competition = competitions.find((c) => c.id === competitionId);
    if (!competition) return;

    setForm((prev) => ({
      ...prev,
      competitionId,
      homeTeamId: "",
      awayTeamId: "",
    }));

    try {
      let result: { content: { id: string; name: string }[] } | undefined;

      if (competition.teamType === "NATIONAL") {
        result = await dispatch(fetchNationalTeams({ page: 0, size: 100 })).unwrap();
      } else {
        result = await dispatch(fetchClubs({ page: 0, size: 100 })).unwrap();
      }

      if (result?.content) {
        setTeams(result.content.map((t) => ({ id: t.id, name: t.name })));
      } else {
        setTeams([]);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]);
    }
  };

  const handleStadiumChange = (stadiumId: string) => {
    const stadium = stadiums.find((s) => s.id === stadiumId);
    setZones(stadium?.zones || []);
    setForm({
      ...form,
      stadiumId,
      zonePricings: stadium?.zones.map((z) => ({ zoneId: z.id, price: 0, availableSeats: 0, isActive: true })) || [],
    });
  };

  const handleZonePriceChange = (zoneId: string, field: "price" | "availableSeats" | "isActive", value: any) => {
    const updated = form.zonePricings.map((z) => (z.zoneId === zoneId ? { ...z, [field]: value } : z));
    setForm({ ...form, zonePricings: updated });
  };

  const handleSubmit = async () => {
    try {
      if (!form.competitionId || !form.homeTeamId || !form.awayTeamId || !form.stadiumId || !form.dateTime) {
        alert("Please fill all required fields.");
        return;
      }

      if (editingMatch) {
        await dispatch(updateMatch({ matchId: editingMatch.id, payload: form })).unwrap();
        alert("Match updated successfully!");
      } else {
        await dispatch(createMatch(form)).unwrap();
        alert("Match created successfully!");
      }

      closeModal();
    } catch (error: any) {
      console.error("Error submitting match:", error);
      alert(error.message || "Error submitting match");
    }
  };

  const statusOptions = [
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "FINISHED", label: "Finished" },
    { value: "CANCELLED", label: "Canceled" },
  ];

  const currencies = ["USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "MAD"];

  return (
      <Modal isOpen={isOpen} onClose={closeModal} className="w-full max-w-4xl p-0">
        <div className="flex max-h-[90vh] flex-col bg-white dark:bg-gray-900 rounded-2xl">
          <div className="overflow-y-auto px-6 py-6 lg:px-10 space-y-6">
            <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              {editingMatch ? "Update Match" : "Add Match"}
            </h5>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Date & Time */}
              <div>
                <Label>Date & Time</Label>
                <DatePicker
                    id="dateTime"
                    placeholder="Select Date & Time"
                    onChange={(dates) => {
                      if (!dates || !dates[0]) return;
                      setForm({ ...form, dateTime: dates[0].toISOString() });
                    }}
                />
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <Select
                    options={statusOptions}
                    placeholder="Select Status"
                    onChange={(value) => setForm({ ...form, status: value })}
                />
              </div>

              {/* Match Number */}
              <div>
                <Label>Match Number</Label>
                <Input type="text" value={form.matchNumber} onChange={(e) => setForm({ ...form, matchNumber: e.target.value })} />
              </div>

              {/* Attendance */}
              <div>
                <Label>Attendance</Label>
                <Input type="number" value={form.attendance} onChange={(e) => setForm({ ...form, attendance: Number(e.target.value) })} />
              </div>

              {/* Referee */}
              <div>
                <Label>Referee</Label>
                <Input type="text" value={form.referee} onChange={(e) => setForm({ ...form, referee: e.target.value })} />
              </div>

              {/* Stadium */}
              <div>
                <Label>Stadium</Label>
                <Select
                    options={stadiums.map((s) => ({ value: s.id, label: s.name }))}
                    placeholder="Select Stadium"
                    onChange={handleStadiumChange}
                />
              </div>

              {/* Competition */}
              <div>
                <Label>Competition</Label>
                <Select
                    options={competitions.map((c) => ({ value: c.id, label: c.name }))}
                    placeholder="Select Competition"
                    onChange={handleCompetitionChange}
                />
              </div>

              {/* Home Team */}
              <div>
                <Label>Home Team</Label>
                <Select
                    options={teams.map((t) => ({ value: t.id, label: t.name }))}
                    placeholder="Select Home Team"
                    onChange={(value) => setForm({ ...form, homeTeamId: value })}
                />
              </div>

              {/* Away Team */}
              <div>
                <Label>Away Team</Label>
                <Select
                    options={teams.map((t) => ({ value: t.id, label: t.name }))}
                    placeholder="Select Away Team"
                    onChange={(value) => setForm({ ...form, awayTeamId: value })}
                />
              </div>

              {/* Currency */}
              <div>
                <Label>Currency</Label>
                <Select
                    options={currencies.map((c) => ({ value: c, label: c }))}
                    placeholder="Select Currency"
                    onChange={(value) => setForm({ ...form, currency: value })}
                />
              </div>
            </div>

            {/* Zone Pricing */}
            {zones.length > 0 && (
                <div className="space-y-4 mt-4">
                  <h6 className="font-semibold text-gray-800 dark:text-white/90">Zone Pricing</h6>
                  {form.zonePricings.map((z) => {
                    const zone = zones.find((zone) => zone.id === z.zoneId);
                    return (
                        <div key={z.zoneId} className="grid grid-cols-1 gap-4 md:grid-cols-3 p-4 border border-gray-200 rounded-xl dark:border-gray-700">
                          <div>
                            <Label>Zone Name</Label>
                            <Input type="text" value={zone?.name || ""} disabled />
                          </div>
                          <div>
                            <Label>Price</Label>
                            <Input type="number" value={z.price} onChange={(e) => handleZonePriceChange(z.zoneId, "price", Number(e.target.value))} />
                          </div>
                          <div>
                            <Label>Available Seats</Label>
                            <Input type="number" value={z.availableSeats} onChange={(e) => handleZonePriceChange(z.zoneId, "availableSeats", Number(e.target.value))} />
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingMatch ? "Update Match" : "Add Match"}</Button>
          </div>
        </div>
      </Modal>
  );
}