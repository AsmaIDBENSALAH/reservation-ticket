import { useState } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { createCountry } from "../../features/countries";
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
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.countries);

  const [name, setName] = useState("");
  const [continentName, setContinentName] = useState<ContinentName | "">("");

  const handleSubmit = async () => {
    if (!name.trim() || !continentName) {
      return;
    }

    const resultAction = await dispatch(
      createCountry({
        name: name.trim(),
        continentName,
      }),
    );

    if (createCountry.fulfilled.match(resultAction)) {
      navigate("/country/show");
    }
  };

  return (
    <>
      <PageMeta title="Create Country | chritickets" description="Create country" />
      <PageBreadcrumb pageTitle="Create Country" />

      <div className="space-y-6">
        <ComponentCard title="Create Country">
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
                options={continentOptions}
                placeholder="Select continent"
                defaultValue={continentName}
                onChange={(value) => setContinentName(value as ContinentName)}
              />
            </div>

            {error && <p className="text-sm text-error-500">{error}</p>}

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/country/show")}>
                Cancel
              </Button>
              <Button onClick={() => void handleSubmit()} disabled={loading}>
                {loading ? "Creating..." : "Create Country"}
              </Button>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default Create;
