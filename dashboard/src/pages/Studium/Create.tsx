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
    address: "",
    cityId: "",
    countryId: "",
    capacity: "",
    constructionYear: "",
    description: "",
    zones: [
      {
        name: "",
        capacity: "",
        description: "",
      },
    ],
  });

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleZoneChange = (index: number, field: string, value: any) => {
    const updatedZones = [...form.zones];
    updatedZones[index] = { ...updatedZones[index], [field]: value };
    setForm({ ...form, zones: updatedZones });
  };

  const addZone = () => {
    setForm({
      ...form,
      zones: [...form.zones, { name: "", capacity: "", description: "" }],
    });
  };

  const removeZone = (index: number) => {
    const updatedZones = form.zones.filter((_, i) => i !== index);
    setForm({ ...form, zones: updatedZones });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      capacity: Number(form.capacity),
      constructionYear: Number(form.constructionYear),
      zones: form.zones.map((z) => ({
        name: z.name,
        capacity: Number(z.capacity),
        description: z.description,
      })),
    };

    console.log("Submitting:", payload);
    closeModal();
  };

  const countryOptions = [
    { value: "1", label: "Morocco" },
    { value: "2", label: "Spain" },
  ];

  const cityOptions = [
    { value: "1", label: "Casablanca" },
    { value: "2", label: "Madrid" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="w-full max-w-4xl p-0"
    >
      <div className="flex max-h-[90vh] flex-col bg-white dark:bg-gray-900 rounded-2xl">
        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 lg:px-10 space-y-6">
          {/* Header */}
          <div>
            <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Add Studium
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill the information below to create a new studium.
            </p>
          </div>

          {/* Main Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Studium Name</Label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div>
              <Label>Address</Label>
              <Input
                type="text"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
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
              <Label>City</Label>
              <Select
                options={cityOptions}
                placeholder="Select city"
                onChange={(value) => handleChange("cityId", value)}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>Total Capacity</Label>
              <Input
                type="number"
                value={form.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
              />
            </div>

            <div>
              <Label>Construction Year</Label>
              <Input
                type="number"
                value={form.constructionYear}
                onChange={(e) =>
                  handleChange("constructionYear", e.target.value)
                }
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="dark:bg-dark-900 h-24 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          {/* Zones Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h6 className="font-semibold text-gray-800 dark:text-white/90">
                Zones
              </h6>
              <Button size="sm" variant="outline" onClick={addZone}>
                + Add Zone
              </Button>
            </div>

            {form.zones.map((zone, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Label>Zone Name</Label>
                    <Input
                      type="text"
                      value={zone.name}
                      onChange={(e) =>
                        handleZoneChange(index, "name", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label>Zone Capacity</Label>
                    <Input
                      type="number"
                      value={zone.capacity}
                      onChange={(e) =>
                        handleZoneChange(index, "capacity", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-end">
                    {form.zones.length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeZone(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Description</Label>
                  <textarea
                    rows={3}
                    value={zone.description}
                    onChange={(e) =>
                      handleZoneChange(index, "description", e.target.value)
                    }
                    className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Studium</Button>
        </div>
      </div>
    </Modal>
  );
}
