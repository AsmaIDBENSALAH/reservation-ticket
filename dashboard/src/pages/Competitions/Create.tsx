import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { getCountries } from "../../features/countries/countriesApi"

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function Create({ isOpen, closeModal }: Props) {
  const [form, setForm] = useState({
    name: "",
    abbreviation: "",
    teamType: "CLUB",
    scope: "NATIONAL",
    countryId: "",
    countryIds: [] as string[],
    continent: "",
    description: "",
  });
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    const fetchCountries = async () => {
      const res = await getCountries({ page: 0, size: 200 });
      const options = res.content.map((c) => ({
        value: c.id,   // UUID
        label: c.name, // Nom lisible
      }));
      setCountries(options);
      console.log("fff")
    };

    fetchCountries();
  }, []);

  const handleChange = (field: string, value: any) => {
    if (field === "scope") {
      setForm({
        ...form,
        scope: value,
        countryId: "",
        countryIds: [],
        continent: "",
      });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const handleSubmit = () => {
    const payload: any = {
      name: form.name,
      abbreviation: form.abbreviation,
      teamType: form.teamType,
      scope: form.scope,
      description: form.description,
    };

    if (form.scope === "NATIONAL") {
      payload.countryId = form.countryId; // UUID
    }

    if (form.scope === "REGIONAL") {
      payload.countryIds = form.countryIds; // UUID[]
    }

    if (form.scope === "CONTINENTAL") {
      payload.continent = form.continent;
    }

    console.log("Payload final:", payload);
  };



  const teamTypeOptions = [
    { value: "CLUB", label: "Club" },
    { value: "NATIONAL", label: "National" },
  ];

  const scopeOptions = [
    { value: "NATIONAL", label: "National" },
    { value: "CONTINENTAL", label: "Continental" },
    { value: "REGIONAL", label: "Regional" },
    { value: "GLOBAL", label: "Global" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="w-full max-w-3xl p-0">
      <div className="flex max-h-[90vh] flex-col bg-white dark:bg-gray-900 rounded-2xl">
        <div className="overflow-y-auto px-6 py-6 lg:px-10 space-y-6">
          <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Add Competition
          </h5>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div>
              <Label>Abbreviation</Label>
              <Input
                type="text"
                value={form.abbreviation}
                onChange={(e) => handleChange("abbreviation", e.target.value)}
              />
            </div>

            <div>
              <Label>Team Type</Label>
              <Select
                options={teamTypeOptions}
                placeholder="Select team type"
                onChange={(value) => handleChange("teamType", value)}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>Scope</Label>
              <Select
                  options={scopeOptions}
                  placeholder="Select scope"
                  onChange={(value) => handleChange("scope", value)}
              />
            </div>



            {/* NATIONAL => 1 country */}
            {form.scope === "NATIONAL" && (
                <div>
                  <Label>Country</Label>
                  <Select
                      options={countries}
                      placeholder="Select country"
                      onChange={(value) => handleChange("countryId", value)}
                  />
                </div>
            )}

            {/* REGIONAL => plusieurs countries */}
            {form.scope === "REGIONAL" && (
                <div>
                  <Label>Countries</Label>
                  <Select
                      options={countries}
                      placeholder="Select country"
                      onChange={(value) =>
                          handleChange("countryIds", [...form.countryIds, value])
                      }
                  />
                </div>
            )}

            {/* CONTINENTAL */}
            {form.scope === "CONTINENTAL" && (
                <div>
                  <Label>Continent</Label>
                  <Select
                      options={[
                        { value: "AFRICA", label: "Africa" },
                        { value: "EUROPE", label: "Europe" },
                        { value: "ASIA", label: "Asia" },
                      ]}
                      placeholder="Select continent"
                      onChange={(value) => handleChange("continent", value)}
                  />
                </div>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Competition</Button>
        </div>
      </div>
    </Modal>
  );
}
