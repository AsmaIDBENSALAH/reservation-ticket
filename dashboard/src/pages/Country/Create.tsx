import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { createCountry, fetchCountryById, updateCountry } from "../../features/countries";
import type { ContinentName } from "../../features/countries/countriesTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const continentOptions = [
  { value: "AFRICA", label: "Afrique" },
  { value: "EUROPE", label: "Europe" },
  { value: "ASIA", label: "Asie" },
  { value: "AMERICAS", label: "Amérique" },
  { value: "OCEANIA", label: "Océanie" },
  { value: "ARAB_WORLD", label: "Arab World" },
];

const Create = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.countries);

  const [name, setName] = useState("");
  const [continentName, setContinentName] = useState<ContinentName | "">("");
  const [initialName, setInitialName] = useState("");
  const [initialContinentName, setInitialContinentName] = useState<ContinentName | "">("");
  const [continentSelectKey, setContinentSelectKey] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditMode || !id) {
      return;
    }

    const loadCountry = async () => {
      setPageLoading(true);
      setLocalError(null);
      const resultAction = await dispatch(fetchCountryById(id));
      setPageLoading(false);

      if (!fetchCountryById.fulfilled.match(resultAction)) {
        setLocalError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load country");
        return;
      }

      const loadedName = resultAction.payload.name ?? "";
      const loadedContinent = resultAction.payload.continentName ?? "";
      setName(loadedName);
      setContinentName(loadedContinent);
      setInitialName(loadedName);
      setInitialContinentName(loadedContinent);
      setContinentSelectKey((previous) => previous + 1);
    };

    void loadCountry();
  }, [dispatch, id, isEditMode]);

  const handleSubmit = async () => {
    if (!name.trim() || !continentName) {
      return;
    }

    const payload = {
      name: name.trim(),
      continentName,
    };

    const resultAction = isEditMode && id
      ? await dispatch(updateCountry({ id, payload }))
      : await dispatch(createCountry(payload));

    const isSuccess = isEditMode
      ? updateCountry.fulfilled.match(resultAction)
      : createCountry.fulfilled.match(resultAction);

    if (isSuccess) {
      navigate("/country/show");
    }
  };

  const isFormValid = Boolean(name.trim() && continentName);
  const hasChanges = isEditMode
    ? name.trim() !== initialName.trim() || continentName !== initialContinentName
    : true;
  const isSubmitDisabled = loading || pageLoading || !isFormValid || !hasChanges;

  return (
    <>
      <PageMeta
        title={`${isEditMode ? "Edit Country" : "Create Country"} | chritickets`}
        description={isEditMode ? "Edit country" : "Create country"}
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit Country" : "Create Country"} />

      <div className="space-y-6">
        <ComponentCard title={isEditMode ? "Edit Country" : "Create Country"}>
          {pageLoading ? (
            <p className="text-sm text-gray-500">Loading country...</p>
          ) : (
            <div className="space-y-6">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Country name"
                />
              </div>

              <div>
                <Label>Continent</Label>
                <Select
                  key={continentSelectKey}
                  options={continentOptions}
                  placeholder="Select continent"
                  defaultValue={continentName}
                  onChange={(value) => setContinentName(value as ContinentName)}
                />
              </div>

              {(localError || error) && <p className="text-sm text-error-500">{localError ?? error}</p>}

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate("/country/show")}>
                  Cancel
                </Button>
                <Button onClick={() => void handleSubmit()} disabled={isSubmitDisabled}>
                  {loading ? "Saving..." : isEditMode ? "Update Country" : "Create Country"}
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
