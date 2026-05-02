import ReportsView from "../Component/ReportsView.jsx";

export default function ReportsContainer({ previewDevice, onDeviceChange, stats }) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <ReportsView
      completionRate={completionRate}
      previewDevice={previewDevice}
      onDeviceChange={onDeviceChange}
      stats={stats}
    />
  );
}
