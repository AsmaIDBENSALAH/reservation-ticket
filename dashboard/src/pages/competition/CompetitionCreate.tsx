import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import MultiSelect from "../../components/form/MultiSelect";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import {
  createCompetition,
  fetchCompetitionById,
  updateCompetition,
} from "../../features/competitions";
import type { CompetitionScope, TeamType } from "../../features/competitions/competitionTypes";
import { fetchCountries } from "../../features/countries";
import type { ContinentName } from "../../features/countries/countriesTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const COUNTRIES_PAGE_SIZE = 1000;
type CompetitionScopeValue = CompetitionScope | "REGIONAL" | "INTERNATIONAL";

const teamTypeOptions = [
  { value: "CLUB", label: "Club" },
  { value: "NATIONAL", label: "National" },
];

const scopeOptions = [
  { value: "NATIONAL", label: "National" },
  { value: "CONTINENTAL", label: "Continental" },
  { value: "REGIONAL", label: "Regional" },
  { value: "INTERNATIONAL", label: "International" },
];

const continentOptions = [
  { value: "AFRICA", label: "Africa" },
  { value: "EUROPE", label: "Europe" },
  { value: "ASIA", label: "Asia" },
  { value: "AMERICAS", label: "Americas" },
  { value: "OCEANIA", label: "Oceania" },
  { value: "ARAB_WORLD", label: "Arab World" },
];

const CompetitionCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.competitions);
  const { list: countries } = useAppSelector((state) => state.countries);

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [teamType, setTeamType] = useState<TeamType | "">("");
  const [scope, setScope] = useState<CompetitionScopeValue | "">("");
  const [continent, setContinent] = useState<ContinentName | "">("");
  const [countryId, setCountryId] = useState("");
  const [countryIds, setCountryIds] = useState<string[]>([]);

  const [initialName, setInitialName] = useState("");
  const [initialAbbreviation, setInitialAbbreviation] = useState("");
  const [initialLogoUrl, setInitialLogoUrl] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [initialTeamType, setInitialTeamType] = useState<TeamType | "">("");
  const [initialScope, setInitialScope] = useState<CompetitionScopeValue | "">("");
  const [initialContinent, setInitialContinent] = useState<ContinentName | "">("");
  const [initialCountryId, setInitialCountryId] = useState("");
  const [initialCountryIds, setInitialCountryIds] = useState<string[]>([]);

  const [countrySelectKey, setCountrySelectKey] = useState(0);
  const [teamTypeSelectKey, setTeamTypeSelectKey] = useState(0);
  const [scopeSelectKey, setScopeSelectKey] = useState(0);
  const [continentSelectKey, setContinentSelectKey] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchCountries({ page: 0, size: COUNTRIES_PAGE_SIZE }));
  }, [dispatch]);

  useEffect(() => {
    if (!isEditMode || !id) {
      return;
    }

    const loadCompetition = async () => {
      setPageLoading(true);
      setLocalError(null);

      const resultAction = await dispatch(fetchCompetitionById(id));
      setPageLoading(false);

      if (!fetchCompetitionById.fulfilled.match(resultAction)) {
        setLocalError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load competition");
        return;
      }

      const payload = resultAction.payload;
      const loadedName = payload.name ?? "";
      const loadedAbbreviation = payload.abbreviation ?? "";
      const loadedLogoUrl = payload.logoUrl ?? "";
      const loadedDescription = payload.description ?? "";
      const loadedTeamType = (payload.teamType ?? "") as TeamType | "";
      const loadedScope = ((payload.scope ?? "") === "GLOBAL"
        ? "INTERNATIONAL"
        : payload.scope) as CompetitionScopeValue | "";
      const loadedContinent = loadedScope === "CONTINENTAL" ? (payload.continent ?? "") as ContinentName | "" : "";
      const loadedCountryId = loadedScope === "NATIONAL" ? payload.country?.id ?? "" : "";
      const loadedCountryIds = loadedScope === "REGIONAL"
        ? payload.countries?.map((country) => country.id) ?? []
        : [];
      setName(loadedName);
      setAbbreviation(loadedAbbreviation);
      setLogoUrl(loadedLogoUrl);
      setDescription(loadedDescription);
      setTeamType(loadedTeamType);
      setScope(loadedScope);
      setContinent(loadedContinent);
      setCountryId(loadedCountryId);
      setCountryIds(loadedCountryIds);

      setInitialName(loadedName);
      setInitialAbbreviation(loadedAbbreviation);
      setInitialLogoUrl(loadedLogoUrl);
      setInitialDescription(loadedDescription);
      setInitialTeamType(loadedTeamType);
      setInitialScope(loadedScope);
      setInitialContinent(loadedContinent);
      setInitialCountryId(loadedCountryId);
      setInitialCountryIds(loadedCountryIds);

      setCountrySelectKey((previous) => previous + 1);
      setTeamTypeSelectKey((previous) => previous + 1);
      setScopeSelectKey((previous) => previous + 1);
      setContinentSelectKey((previous) => previous + 1);
    };

    void loadCompetition();
  }, [dispatch, id, isEditMode]);

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, label: country.name })),
    [countries],
  );
  const countryMultiOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, text: country.name })),
    [countries],
  );

  useEffect(() => {
    if (scope !== "NATIONAL") {
      setCountryId("");
    }
    if (scope !== "CONTINENTAL") {
      setContinent("");
    }
    if (scope !== "REGIONAL") {
      setCountryIds([]);
    }
  }, [scope]);

  const resetForm = () => {
    setName("");
    setAbbreviation("");
    setLogoUrl("");
    setDescription("");
    setTeamType("");
    setScope("");
    setContinent("");
    setCountryId("");
    setCountryIds([]);
    setCountrySelectKey((previous) => previous + 1);
    setTeamTypeSelectKey((previous) => previous + 1);
    setScopeSelectKey((previous) => previous + 1);
    setContinentSelectKey((previous) => previous + 1);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !abbreviation.trim() || !teamType || !scope) {
      return;
    }

    const basePayload = {
      name: name.trim(),
      abbreviation: abbreviation.trim(),
      logoUrl: logoUrl.trim(),
      description: description.trim(),
      teamType,
    };
    let payload: Record<string, unknown>;

    if (scope === "NATIONAL") {
      const normalizedCountryId = countryId.trim();
      if (!normalizedCountryId) {
        return;
      }
      payload = {
        ...basePayload,
        scope: "NATIONAL",
        countryId: normalizedCountryId,
      };
    } else if (scope === "CONTINENTAL") {
      if (!continent) {
        return;
      }
      payload = {
        ...basePayload,
        scope: "CONTINENTAL",
        continent,
      };
    } else if (scope === "REGIONAL") {
      const normalizedCountryIds = countryIds.map((value) => value.trim()).filter(Boolean);
      if (normalizedCountryIds.length === 0) {
        return;
      }
      payload = {
        ...basePayload,
        scope: "REGIONAL",
        countryIds: normalizedCountryIds,
      };
    } else {
      payload = {
        ...basePayload,
        scope: "INTERNATIONAL",
      };
    }

    const resultAction = isEditMode && id
      ? await dispatch(updateCompetition({ id, payload: payload as never }))
      : await dispatch(createCompetition(payload as never));

    const isSuccess = isEditMode
      ? updateCompetition.fulfilled.match(resultAction)
      : createCompetition.fulfilled.match(resultAction);

    if (isSuccess) {
      resetForm();
      navigate("/competitions");
    }
  };

  const isScopeFieldValid = scope === "NATIONAL"
    ? Boolean(countryId.trim())
    : scope === "CONTINENTAL"
      ? Boolean(continent)
      : scope === "REGIONAL"
        ? countryIds.length > 0
        : scope === "INTERNATIONAL";
  const isFormValid = Boolean(name.trim() && abbreviation.trim() && teamType && scope && isScopeFieldValid);
  const hasCountryIdsChanged = [...countryIds].sort().join(",") !== [...initialCountryIds].sort().join(",");
  const hasChanges = isEditMode
    ? name.trim() !== initialName.trim() ||
      abbreviation.trim() !== initialAbbreviation.trim() ||
      logoUrl.trim() !== initialLogoUrl.trim() ||
      description.trim() !== initialDescription.trim() ||
      teamType !== initialTeamType ||
      scope !== initialScope ||
      continent !== initialContinent ||
      countryId !== initialCountryId ||
      hasCountryIdsChanged
    : true;
  const isSubmitDisabled = loading || pageLoading || !isFormValid || !hasChanges;

  return (
    <>
      <PageMeta
        title={`${isEditMode ? "Edit Competition" : "Create Competition"} | chritickets`}
        description={isEditMode ? "Edit competition" : "Create competition"}
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit Competition" : "Create Competition"} />

      <div className="space-y-6">
        <ComponentCard title={isEditMode ? "Edit Competition" : "Create Competition"}>
          {pageLoading ? (
            <p className="text-sm text-gray-500">Loading competition...</p>
          ) : (
            <div className="space-y-6">
              <div>
                <Label>Name</Label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Competition name" />
              </div>

              <div>
                <Label>Abbreviation</Label>
                <Input
                  type="text"
                  value={abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value)}
                  placeholder="Competition abbreviation"
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
                  value={description}
                  onChange={setDescription}
                  placeholder="Competition description"
                  rows={4}
                />
              </div>

              <div>
                <Label>Team Type</Label>
                <Select
                  key={teamTypeSelectKey}
                  options={teamTypeOptions}
                  placeholder="Select team type"
                  defaultValue={teamType}
                  onChange={(value) => setTeamType(value as TeamType)}
                />
              </div>

              <div>
                <Label>Scope</Label>
                <Select
                  key={scopeSelectKey}
                  options={scopeOptions}
                  placeholder="Select scope"
                  defaultValue={scope}
                  onChange={(value) => setScope(value as CompetitionScope)}
                />
              </div>

              {scope === "CONTINENTAL" && (
                <div>
                  <Label>Continent</Label>
                  <Select
                    key={continentSelectKey}
                    options={continentOptions}
                    placeholder="Select continent"
                    defaultValue={continent}
                    onChange={(value) => setContinent(value as ContinentName)}
                  />
                </div>
              )}

              {scope === "NATIONAL" && (
                <div>
                  <Label>Country</Label>
                  <Select
                    key={countrySelectKey}
                    options={countryOptions}
                    placeholder="Select country"
                    defaultValue={countryId}
                    onChange={setCountryId}
                  />
                </div>
              )}

              {scope === "REGIONAL" && (
                <MultiSelect
                  label="Countries"
                  options={countryMultiOptions}
                  value={countryIds}
                  onChange={setCountryIds}
                  placeholder="Select countries"
                />
              )}

              {(localError || error) && <p className="text-sm text-error-500">{localError ?? error}</p>}

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate("/competitions")}>Cancel</Button>
                <Button onClick={() => void handleSubmit()} disabled={isSubmitDisabled}>
                  {loading ? "Saving..." : isEditMode ? "Update Competition" : "Create Competition"}
                </Button>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default CompetitionCreate;
