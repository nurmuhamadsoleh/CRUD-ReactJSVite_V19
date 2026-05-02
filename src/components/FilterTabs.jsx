import { Segmented } from "antd";

export default function FilterTabs({ value, onChange, counts }) {
  const options = [
    { label: `All (${counts.total})`, value: "all" },
    { label: `Completed (${counts.completed})`, value: "completed" },
    { label: `Pending (${counts.pending})`, value: "pending" },
  ];

  return (
    <div className="w-full">
      <Segmented block value={value} onChange={onChange} options={options} size="large" />
    </div>
  );
}
