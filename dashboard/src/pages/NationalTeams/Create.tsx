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

export const fetchNationalTeamById = createAsyncThunk(
  "nationalTeams/fetchNationalTeamById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<NationalTeam>(`/api/teams/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateNationalTeam = createAsyncThunk(
  "nationalTeams/updateNationalTeam",
  async ({ id, payload }: { id: string; payload: CreateNationalTeamPayload }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<NationalTeam>(`/api/teams/${id}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteNationalTeam = createAsyncThunk(
  "nationalTeams/deleteNationalTeam",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/teams/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const Create = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useAppDispatch();
  const { list: countries } = useAppSelector((state) => state.countries);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectKey, setSelectKey] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [initialName, setInitialName] = useState("");
  const [initialAbbreviation, setInitialAbbreviation] = useState("");
  const [initialLogoUrl, setInitialLogoUrl] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [initialFoundingYear, setInitialFoundingYear] = useState("");
  const [initialCountryId, setInitialCountryId] = useState("");

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [foundingYear, setFoundingYear] = useState("");
  const [countryId, setCountryId] = useState("");

  useEffect(() => {
    void dispatch(fetchCountries({ page: 0, size: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    if (!isEditMode || !id) {
      return;
    }

    const loadNationalTeam = async () => {
      setPageLoading(true);
      setError(null);
      const resultAction = await dispatch(fetchNationalTeamById(id));
      setPageLoading(false);

      if (!fetchNationalTeamById.fulfilled.match(resultAction)) {
        setError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load national team");
        return;
      }

      const payload = resultAction.payload;
      const loadedName = payload.name ?? "";
      const loadedAbbreviation = payload.abbreviation ?? "";
      const loadedLogoUrl = payload.logoUrl ?? "";
      const loadedDescription = payload.description ?? "";
      const loadedFoundingYear = String(payload.foundingYear ?? "");
      const loadedCountryId = payload.country?.id ?? "";

      setName(loadedName);
      setAbbreviation(loadedAbbreviation);
      setLogoUrl(loadedLogoUrl);
      setDescription(loadedDescription);
      setFoundingYear(loadedFoundingYear);
      setCountryId(loadedCountryId);

      setInitialName(loadedName);
      setInitialAbbreviation(loadedAbbreviation);
      setInitialLogoUrl(loadedLogoUrl);
      setInitialDescription(loadedDescription);
      setInitialFoundingYear(loadedFoundingYear);
      setInitialCountryId(loadedCountryId);
      setSelectKey((previous) => previous + 1);
    };

    void loadNationalTeam();
  }, [dispatch, id, isEditMode]);

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

    const payload = {
      name: name.trim(),
      abbreviation: abbreviation.trim(),
      logoUrl: logoUrl.trim(),
      description: description.trim(),
      type: "NATIONAL" as const,
      foundingYear: Number(foundingYear),
      countryId,
    };

    const resultAction = isEditMode && id
      ? await dispatch(updateNationalTeam({ id, payload }))
      : await dispatch(createNationalTeam(payload));

    setLoading(false);

    const isSuccess = isEditMode
      ? updateNationalTeam.fulfilled.match(resultAction)
      : createNationalTeam.fulfilled.match(resultAction);

    if (isSuccess) {
      resetForm();
      navigate("/national-teams");
      return;
    }

    const actionError = resultAction as { payload?: unknown; error?: { message?: string } };
    setError((actionError.payload as string) ?? actionError.error?.message ?? "Failed to save national team");
  };

  const isFormValid = Boolean(name.trim() && abbreviation.trim() && countryId && foundingYear.trim());
  const hasChanges = isEditMode
    ? name.trim() !== initialName.trim() ||
      abbreviation.trim() !== initialAbbreviation.trim() ||
      logoUrl.trim() !== initialLogoUrl.trim() ||
      description.trim() !== initialDescription.trim() ||
      foundingYear.trim() !== initialFoundingYear.trim() ||
      countryId !== initialCountryId
    : true;
  const isSubmitDisabled = loading || pageLoading || !isFormValid || !hasChanges;

  return (
    <>
      <PageMeta
        title={`${isEditMode ? "Edit National Team" : "Create National Team"} | chritickets`}
        description={isEditMode ? "Edit national team" : "Create national team"}
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit National Team" : "Create National Team"} />

      <div className="space-y-6">
        <ComponentCard title={isEditMode ? "Edit National Team" : "Create National Team"}>
          {pageLoading ? (
            <p className="text-sm text-gray-500">Loading national team...</p>
          ) : (
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
              <NumberInput
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
              <Button onClick={() => void handleSubmit()} disabled={isSubmitDisabled}>
                {loading ? "Saving..." : isEditMode ? "Update National Team" : "Create National Team"}
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
