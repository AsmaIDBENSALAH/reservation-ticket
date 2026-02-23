import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { fetchCities } from "../../features/cities";
import { fetchCountries } from "../../features/countries";
import { createStadium, fetchStadiumById, updateStadium } from "../../features/stadiums";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const CITIES_PAGE_SIZE = 1000;
const COUNTRIES_PAGE_SIZE = 1000;

interface ZoneForm {
  name: string;
  capacity: string;
  description: string;
  porte: string;
}

const emptyZone = (): ZoneForm => ({
  name: "",
  capacity: "",
  description: "",
  porte: "",
});

const toPositiveInteger = (value: string): number | null => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  const integer = Math.trunc(parsed);
  return integer > 0 ? integer : null;
};

const toIntegerOrNull = (value: string): number | null => {
  if (!value.trim()) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return Math.trunc(parsed);
};

const StadiumCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.stadiums);
  const { list: cities } = useAppSelector((state) => state.cities);
  const { list: countries } = useAppSelector((state) => state.countries);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cityId, setCityId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [constructionYear, setConstructionYear] = useState("");
  const [description, setDescription] = useState("");
  const [zones, setZones] = useState<ZoneForm[]>([emptyZone()]);

  const [initialName, setInitialName] = useState("");
  const [initialAddress, setInitialAddress] = useState("");
  const [initialCityId, setInitialCityId] = useState("");
  const [initialCountryId, setInitialCountryId] = useState("");
  const [initialCapacity, setInitialCapacity] = useState("");
  const [initialConstructionYear, setInitialConstructionYear] = useState("");
  const [initialDescription, setInitialDescription] = useState("");

  const [citySelectKey, setCitySelectKey] = useState(0);
  const [countrySelectKey, setCountrySelectKey] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchCities({ page: 0, size: CITIES_PAGE_SIZE }));
    void dispatch(fetchCountries({ page: 0, size: COUNTRIES_PAGE_SIZE }));
  }, [dispatch]);

  useEffect(() => {
    if (!isEditMode || !id) {
      return;
    }

    const loadStadium = async () => {
      setPageLoading(true);
      setLocalError(null);

      const resultAction = await dispatch(fetchStadiumById(id));
      setPageLoading(false);

      if (!fetchStadiumById.fulfilled.match(resultAction)) {
        setLocalError((resultAction.payload as string) ?? resultAction.error.message ?? "Failed to load stadium");
        return;
      }

      const payload = resultAction.payload;
      const loadedName = payload.name ?? "";
      const loadedAddress = payload.address ?? "";
      const loadedCityId = payload.cityId ?? "";
      const loadedCountryId = payload.countryId ?? "";
      const loadedCapacity = String(payload.capacity ?? "");
      const loadedConstructionYear = String(payload.constructionYear ?? "");
      const loadedDescription = payload.description ?? "";

      setName(loadedName);
      setAddress(loadedAddress);
      setCityId(loadedCityId);
      setCountryId(loadedCountryId);
      setCapacity(loadedCapacity);
      setConstructionYear(loadedConstructionYear);
      setDescription(loadedDescription);

      setInitialName(loadedName);
      setInitialAddress(loadedAddress);
      setInitialCityId(loadedCityId);
      setInitialCountryId(loadedCountryId);
      setInitialCapacity(loadedCapacity);
      setInitialConstructionYear(loadedConstructionYear);
      setInitialDescription(loadedDescription);

      setCitySelectKey((previous) => previous + 1);
      setCountrySelectKey((previous) => previous + 1);
    };

    void loadStadium();
  }, [dispatch, id, isEditMode]);

  const cityOptions = useMemo(
    () => cities.map((city) => ({ value: city.id, label: city.name })),
    [cities],
  );

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, label: country.name })),
    [countries],
  );

  const handleZoneChange = (index: number, field: keyof ZoneForm, value: string) => {
    setZones((previousZones) => {
      const nextZones = [...previousZones];
      nextZones[index] = {
        ...nextZones[index],
        [field]: value,
      };
      return nextZones;
    });
  };

  const handleAddZone = () => {
    setZones((previousZones) => [...previousZones, emptyZone()]);
  };

  const handleRemoveZone = (index: number) => {
    setZones((previousZones) => {
      if (previousZones.length <= 1) {
        return previousZones;
      }
      return previousZones.filter((_, zoneIndex) => zoneIndex !== index);
    });
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setCityId("");
    setCountryId("");
    setCapacity("");
    setConstructionYear("");
    setDescription("");
    setZones([emptyZone()]);
    setCitySelectKey((previous) => previous + 1);
    setCountrySelectKey((previous) => previous + 1);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !address.trim() || !cityId || !countryId) {
      return;
    }

    const parsedCapacity = toPositiveInteger(capacity);
    if (!parsedCapacity) {
      return;
    }

    const resultAction = isEditMode && id
      ? await dispatch(
          updateStadium({
            id,
            payload: {
              id,
              name: name.trim(),
              address: address.trim(),
              cityId,
              countryId,
              capacity: parsedCapacity,
              constructionYear: toIntegerOrNull(constructionYear) ?? 0,
              description: description.trim(),
            },
          }),
        )
      : await dispatch(
          createStadium({
            name: name.trim(),
            address: address.trim(),
            cityId,
            countryId,
            capacity: parsedCapacity,
            constructionYear: toIntegerOrNull(constructionYear) ?? undefined,
            description: description.trim(),
            zones: zones
              .map((zone) => ({
                name: zone.name.trim(),
                capacity: toPositiveInteger(zone.capacity),
                description: zone.description.trim(),
                porte: zone.porte.trim(),
              }))
              .filter((zone) => zone.name && zone.capacity && zone.porte)
              .map((zone) => ({
                name: zone.name,
                capacity: zone.capacity as number,
                description: zone.description,
                porte: zone.porte,
              })),
          }),
        );

    const isSuccess = isEditMode
      ? updateStadium.fulfilled.match(resultAction)
      : createStadium.fulfilled.match(resultAction);

    if (isSuccess) {
      resetForm();
      navigate("/stadiums");
    }
  };

  const isFormValid = Boolean(name.trim() && address.trim() && cityId && countryId && toPositiveInteger(capacity));
  const hasChanges = isEditMode
    ? name.trim() !== initialName.trim() ||
      address.trim() !== initialAddress.trim() ||
      cityId !== initialCityId ||
      countryId !== initialCountryId ||
      capacity !== initialCapacity ||
      constructionYear !== initialConstructionYear ||
      description.trim() !== initialDescription.trim()
    : true;
  const isSubmitDisabled = loading || pageLoading || !isFormValid || !hasChanges;

  return (
    <>
      <PageMeta
        title={`${isEditMode ? "Edit Stadium" : "Create Stadium"} | chritickets`}
        description={isEditMode ? "Edit stadium" : "Create stadium"}
      />
      <PageBreadcrumb pageTitle={isEditMode ? "Edit Stadium" : "Create Stadium"} />

      <div className="space-y-6">
        <ComponentCard title={isEditMode ? "Edit Stadium" : "Create Stadium"}>
          {pageLoading ? (
            <p className="text-sm text-gray-500">Loading stadium...</p>
          ) : (
            <div className="space-y-6">
              <div>
                <Label>Name</Label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Stadium name" />
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Stadium address"
                />
              </div>

              <div>
                <Label>City</Label>
                <Select
                  key={citySelectKey}
                  options={cityOptions}
                  placeholder="Select city"
                  defaultValue={cityId}
                  onChange={setCityId}
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

              <div>
                <Label>Capacity</Label>
                <Input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="Total capacity"
                />
              </div>

              <div>
                <Label>Construction Year</Label>
                <Input
                  type="number"
                  value={constructionYear}
                  onChange={(e) => setConstructionYear(e.target.value)}
                  placeholder="Construction year"
                />
              </div>

              <div>
                <Label>Description</Label>
                <TextArea
                  value={description}
                  onChange={setDescription}
                  placeholder="Stadium description"
                  rows={4}
                />
              </div>

              {!isEditMode && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Zones</Label>
                    <Button size="sm" variant="outline" onClick={handleAddZone}>
                      Add Zone
                    </Button>
                  </div>

                  {zones.map((zone, index) => (
                    <div key={index} className="rounded-xl border border-gray-200 p-4 dark:border-gray-700 space-y-4">
                      <div>
                        <Label>Zone Name</Label>
                        <Input
                          type="text"
                          value={zone.name}
                          onChange={(e) => handleZoneChange(index, "name", e.target.value)}
                          placeholder="Zone name"
                        />
                      </div>

                      <div>
                        <Label>Zone Capacity</Label>
                        <Input
                          type="number"
                          value={zone.capacity}
                          onChange={(e) => handleZoneChange(index, "capacity", e.target.value)}
                          placeholder="Zone capacity"
                        />
                      </div>

                      <div>
                        <Label>Zone Description</Label>
                        <TextArea
                          value={zone.description}
                          onChange={(value) => handleZoneChange(index, "description", value)}
                          placeholder="Zone description"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Porte</Label>
                        <Input
                          type="text"
                          value={zone.porte}
                          onChange={(e) => handleZoneChange(index, "porte", e.target.value)}
                          placeholder="Porte"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveZone(index)}
                          disabled={zones.length <= 1}
                        >
                          Remove Zone
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(localError || error) && <p className="text-sm text-error-500">{localError ?? error}</p>}

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate("/stadiums")}>Cancel</Button>
                <Button onClick={() => void handleSubmit()} disabled={isSubmitDisabled}>
                  {loading ? "Saving..." : isEditMode ? "Update Stadium" : "Create Stadium"}
                </Button>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default StadiumCreate;
