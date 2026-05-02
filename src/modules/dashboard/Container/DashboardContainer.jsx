import DashboardView from "../Component/DashboardView.jsx";

export default function DashboardContainer({ previewDevice, onDeviceChange, stats }) {
  return (
    <DashboardView
      previewDevice={previewDevice}
      onDeviceChange={onDeviceChange}
      stats={stats}
    />
  );
}
