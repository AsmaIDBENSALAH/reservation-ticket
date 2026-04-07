import { useState } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";

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
    continent: "",
    description: "",
  });

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Submitting Competition:", form);
    closeModal();
  };

  const countryOptions = [
    { value: "1", label: "Morocco" },
    { value: "2", label: "Spain" },
  ];

  const teamTypeOptions = [
    { value: "CLUB", label: "Club" },
    { value: "NATIONAL", label: "National" },
  ];

  const scopeOptions = [
    { value: "NATIONAL", label: "National" },
    { value: "CONTINENTAL", label: "Continental" },
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
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>Country</Label>
              <Select
                options={countryOptions}
                placeholder="Select country"
                onChange={(value) => handleChange("countryId", value)}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>Continent</Label>
              <Input
                type="text"
                value={form.continent}
                onChange={(e) => handleChange("continent", e.target.value)}
              />
            </div>
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
