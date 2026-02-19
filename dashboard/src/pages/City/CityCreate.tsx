import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { createCity } from "../../features/cities";
import { fetchCountries } from "../../features/countries";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const COUNTRIES_PAGE_SIZE = 1000;

const CityCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.cities);
  const { list: countries } = useAppSelector((state) => state.countries);

  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [selectKey, setSelectKey] = useState(0);

  useEffect(() => {
    void dispatch(fetchCountries({ page: 0, size: COUNTRIES_PAGE_SIZE }));
  }, [dispatch]);

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.id, label: country.name })),
    [countries],
  );

  const handleSubmit = async () => {
    if (!name.trim() || !countryId) {
      return;
    }

    const resultAction = await dispatch(
      createCity({
        name: name.trim(),
        countryId,
      }),
    );

    if (createCity.fulfilled.match(resultAction)) {
      setName("");
      setCountryId("");
      setSelectKey((previous) => previous + 1);
      navigate("/cities");
    }
  };

  return (
    <>
      <PageMeta title="Create City | chritickets" description="Create city" />
      <PageBreadcrumb pageTitle="Create City" />

      <div className="space-y-6">
        <ComponentCard title="Create City">
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

            {error && <p className="text-sm text-error-500">{error}</p>}

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/cities")}>
                Cancel
              </Button>
              <Button onClick={() => void handleSubmit()} disabled={loading}>
                {loading ? "Creating..." : "Create City"}
              </Button>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default CityCreate;
