import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import MultiSelect from "../../components/form/MultiSelect";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { createCompetition } from "../../features/competitions";
import type { CompetitionScope, TeamType } from "../../features/competitions/competitionTypes";
import { fetchCountries } from "../../features/countries";
import type { ContinentName } from "../../features/countries/countriesTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const COUNTRIES_PAGE_SIZE = 1000;

const teamTypeOptions = [
  { value: "CLUB", label: "Club" },
  { value: "NATIONAL", label: "National" },
];

const scopeOptions = [
  { value: "NATIONAL", label: "National" },
  { value: "CONTINENTAL", label: "Continental" },
  { value: "GLOBAL", label: "Global" },
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
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.competitions);
  const { list: countries } = useAppSelector((state) => state.countries);

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [teamType, setTeamType] = useState<TeamType | "">("");
  const [scope, setScope] = useState<CompetitionScope | "">("");
  const [continent, setContinent] = useState<ContinentName | "">("");
  const [countryId, setCountryId] = useState("");
  const [countryIds, setCountryIds] = useState<string[]>([]);
  const [countrySelectKey, setCountrySelectKey] = useState(0);

  useEffect(() => {
    void dispatch(fetchCountries({ page: 0, size: COUNTRIES_PAGE_SIZE }));
  }, [dispatch]);

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, label: country.name })),
    [countries],
  );

  const countryMultiSelectOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, text: country.name })),
    [countries],
  );

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
  };

  const handleSubmit = async () => {
    if (!name.trim() || !abbreviation.trim() || !teamType || !scope || !continent || !countryId) {
      return;
    }

    const resultAction = await dispatch(
      createCompetition({
        name: name.trim(),
        abbreviation: abbreviation.trim(),
        logoUrl: logoUrl.trim(),
        description: description.trim(),
        teamType,
        scope,
        countryId,
        continent,
        countryIds,
      }),
    );

    if (createCompetition.fulfilled.match(resultAction)) {
      resetForm();
      navigate("/competitions");
    }
  };

  return (
    <>
      <PageMeta title="Create Competition | chritickets" description="Create competition" />
      <PageBreadcrumb pageTitle="Create Competition" />

      <div className="space-y-6">
        <ComponentCard title="Create Competition">
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
                options={teamTypeOptions}
                placeholder="Select team type"
                defaultValue={teamType}
                onChange={(value) => setTeamType(value as TeamType)}
              />
            </div>

            <div>
              <Label>Scope</Label>
              <Select
                options={scopeOptions}
                placeholder="Select scope"
                defaultValue={scope}
                onChange={(value) => setScope(value as CompetitionScope)}
              />
            </div>

            <div>
              <Label>Continent</Label>
              <Select
                options={continentOptions}
                placeholder="Select continent"
                defaultValue={continent}
                onChange={(value) => setContinent(value as ContinentName)}
              />
            </div>

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

            <MultiSelect
              label="Countries"
              options={countryMultiSelectOptions}
              value={countryIds}
              onChange={setCountryIds}
              placeholder="Select countries"
            />

            {error && <p className="text-sm text-error-500">{error}</p>}

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/competitions")}>
                Cancel
              </Button>
              <Button onClick={() => void handleSubmit()} disabled={loading}>
                {loading ? "Creating..." : "Create Competition"}
              </Button>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default CompetitionCreate;
