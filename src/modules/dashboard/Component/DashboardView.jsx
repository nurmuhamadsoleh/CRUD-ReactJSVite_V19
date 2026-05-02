import PageHeader from "../../../components/PageHeader.jsx";
import StatTile from "../../../components/StatTile.jsx";

export default function DashboardView({ previewDevice, onDeviceChange, stats }) {
  return (
    <>
      <PageHeader
        badge="Dashboard"
        title="Ringkasan Produktivitas"
        description={`${stats.pending} task pending dari ${stats.total} total task aktif.`}
        previewDevice={previewDevice}
        onDeviceChange={onDeviceChange}
      />

      <section className="grid gap-3 sm:grid-cols-3 lg:gap-4" aria-label="Ringkasan dashboard">
        <StatTile title="Total Task" value={stats.total} icon="T" tone="neutral" />
        <StatTile
          title="Completed"
          value={stats.completed}
          icon="C"
          tone="success"
        />
        <StatTile
          title="Pending"
          value={stats.pending}
          icon="P"
          tone="warning"
        />
      </section>
    </>
  );
}
