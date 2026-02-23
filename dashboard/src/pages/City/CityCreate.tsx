import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { createCity, fetchCityById, updateCity } from "../../features/cities";
import { fetchCountries } from "../../features/countries";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const COUNTRIES_PAGE_SIZE = 1000;

const CityCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.cities);
  const { list: countries } = useAppSelector((state) => state.countries);

  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [loadedCountryName, setLoadedCountryName] = useState("");
  const [initialName, setInitialName] = useState("");
  const [initialCountryId, setInitialCountryId] = useState("");
  const [selectKey, setSelectKey] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchCountries({ page: 0, size: COUNTRIES_PAGE_SIZE }));
  }, [dispatch]);

  useEffect(() => {
    if (!isEditMode || !id) {
      return;
    }

    const loadCity = async () => {
      setPageLoading(true);
      setLocalError(null);
      const resultAction = await dispatch(fetchCityById(id));
      setPageLoading(false);

      if (!fetchCityById.fulfilled.match(resultAction)) {
        setLocalError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load city");
        return;
      }

      const loadedName = resultAction.payload.name ?? "";
      const loadedCountryId = resultAction.payload.countryId ?? resultAction.payload.country?.id ?? "";
      const resolvedCountryId = loadedCountryId || countries.find((country) => country.name === resultAction.payload.countryName)?.id || "";

      setName(loadedName);
      setCountryId(resolvedCountryId);
      setLoadedCountryName(resultAction.payload.countryName ?? "");
      setInitialName(loadedName);
      setInitialCountryId(resolvedCountryId);
      setSelectKey((previous) => previous + 1);
    };

    void loadCity();
  }, [countries, dispatch, id, isEditMode]);

  useEffect(() => {
    if (!isEditMode || !loadedCountryName || countryId) {
      return;
    }

    const matchedCountryId = countries.find((country) => country.name === loadedCountryName)?.id ?? "";
    if (!matchedCountryId) {
      return;
    }

    setCountryId(matchedCountryId);
    setInitialCountryId((previous) => previous || matchedCountryId);
    setSelectKey((previous) => previous + 1);
  }, [countries, countryId, isEditMode, loadedCountryName]);

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, label: country.name })),
    [countries],
  );

  const handleSubmit = async () => {
    if (!name.trim() || !countryId) {
      return;
    }

    const payload = {
      name: name.trim(),
      countryId,
    };

    const resultAction = isEditMode && id
      ? await dispatch(updateCity({ id, payload }))
      : await dispatch(createCity(payload));

    const isSuccess = isEditMode
      ? updateCity.fulfilled.match(resultAction)
      : createCity.fulfilled.match(resultAction);

    if (isSuccess) {
      setName("");
      setCountryId("");
      setSelectKey((previous) => previous + 1);
      navigate("/cities");
    }
  };

  const isFormValid = Boolean(name.trim() && countryId);
  const hasChanges = isEditMode
    ? name.trim() !== initialName.trim() || countryId !== initialCountryId
    : true;
  const isSubmitDisabled = loading || pageLoading || !isFormValid || !hasChanges;

  return (
    <>
      <PageMeta
        title={`${isEditMode ? "Edit City" : "Create City"} | chritickets`}
        description={isEditMode ? "Edit city" : "Create city"}
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit City" : "Create City"} />

      <div className="space-y-6">
        <ComponentCard title={isEditMode ? "Edit City" : "Create City"}>
          {pageLoading ? (
            <p className="text-sm text-gray-500">Loading city...</p>
          ) : (
          <div className="space-y-6">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="City name"
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

            {(localError || error) && <p className="text-sm text-error-500">{localError ?? error}</p>}

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/cities")}>
                Cancel
              </Button>
              <Button onClick={() => void handleSubmit()} disabled={isSubmitDisabled}>
                {loading ? "Saving..." : isEditMode ? "Update City" : "Create City"}
              </Button>
            </div>
          </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default CityCreate;
