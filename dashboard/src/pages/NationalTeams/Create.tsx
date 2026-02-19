import { useEffect, useMemo, useState } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { fetchCountries } from "../../features/countries";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axiosInstance from "../../api/axiosInstance";
import type { ContinentName } from "../../features/countries/countriesTypes";

export interface NationalTeamCountry {
  id: string;
  name: string;
  continentName: ContinentName;
}

export interface NationalTeam {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
  description: string;
  type: "NATIONAL";
  foundingYear: number;
  country: NationalTeamCountry;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface PaginatedNationalTeamsResponse {
  content: NationalTeam[];
  totalPages: number;
  totalElements: number;
}

export interface CreateNationalTeamPayload {
  name: string;
  abbreviation: string;
  logoUrl: string;
  description: string;
  type: "NATIONAL";
  foundingYear: number;
  countryId: string;
}

const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message ?? axiosError.message ?? "Unexpected error";
};

export const fetchNationalTeams = createAsyncThunk(
  "nationalTeams/fetchNationalTeams",
  async (params: { page: number; size: number }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<PaginatedNationalTeamsResponse>("http://localhost:8084/api/teams", {
        params: { type: "NATIONAL", page: params.page, size: params.size },
      });
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createNationalTeam = createAsyncThunk(
  "nationalTeams/createNationalTeam",
  async (payload: CreateNationalTeamPayload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<NationalTeam>("http://localhost:8084/api/teams", payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list: countries } = useAppSelector((state) => state.countries);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectKey, setSelectKey] = useState(0);

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [foundingYear, setFoundingYear] = useState("");
  const [countryId, setCountryId] = useState("");

  useEffect(() => {
    void dispatch(fetchCountries({ page: 0, size: 1000 }));
  }, [dispatch]);

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, label: country.name })),
    [countries],
  );

  const resetForm = () => {
    setName("");
    setAbbreviation("");
    setLogoUrl("");
    setDescription("");
    setFoundingYear("");
    setCountryId("");
    setSelectKey((previous) => previous + 1);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !abbreviation.trim() || !countryId || !foundingYear.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    const resultAction = await dispatch(
      createNationalTeam({
        name: name.trim(),
        abbreviation: abbreviation.trim(),
        logoUrl: logoUrl.trim(),
        description: description.trim(),
        type: "NATIONAL",
        foundingYear: Number(foundingYear),
        countryId,
      }),
    );

    setLoading(false);

    if (createNationalTeam.fulfilled.match(resultAction)) {
      resetForm();
      navigate("/national-teams");
      return;
    }

    setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to create national team");
  };

  return (
    <>
      <PageMeta title="Create National Team | chritickets" description="Create national team" />
      <PageBreadcrumb pageTitle="Create National Team" />

      <div className="space-y-6">
        <ComponentCard title="Create National Team">
          <div className="space-y-6">
            <div>
              <Label>Name</Label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Team name" />
            </div>

            <div>
              <Label>Abbreviation</Label>
              <Input
                type="text"
                value={abbreviation}
                onChange={(e) => setAbbreviation(e.target.value)}
                placeholder="Team abbreviation"
              />
            </div>

            <div>
              <Label>Logo URL</Label>
              <Input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div>
              <Label>Description</Label>
              <TextArea
                rows={4}
                value={description}
                onChange={setDescription}
                placeholder="National team description"
              />
            </div>

            <div>
              <Label>Founding Year</Label>
              <Input
                type="number"
                value={foundingYear}
                onChange={(e) => setFoundingYear(e.target.value)}
                placeholder="1990"
              />
            </div>

            <div>
              <Label>Country</Label>
              <Select
                key={selectKey}
                options={countryOptions}
                placeholder="Select country"
                defaultValue={countryId}
                onChange={setCountryId}
              />
            </div>

            {error && <p className="text-sm text-error-500">{error}</p>}

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/national-teams")}>
                Cancel
              </Button>
              <Button onClick={() => void handleSubmit()} disabled={loading}>
                {loading ? "Creating..." : "Create National Team"}
              </Button>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default Create;
