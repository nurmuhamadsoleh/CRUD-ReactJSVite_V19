import AppButton from "./ui/AppButton.jsx";

const deviceOptions = [
  {
    key: "mobile",
    label: "Mobile",
  },
  {
    key: "tablet",
    label: "Tablet",
  },
  {
    key: "laptop",
    label: "Laptop",
  },
];

export default function DeviceSwitcher({ value, onChange }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[330px]" aria-label="Pilih tampilan device">
      {deviceOptions.map((device) => (
        <AppButton
          key={device.key}
          type={value === device.key ? "primary" : "default"}
          onClick={() => onChange(device.key)}
          aria-pressed={value === device.key}
          className="justify-center"
        >
          {device.label}
        </AppButton>
      ))}
    </div>
  );
}
