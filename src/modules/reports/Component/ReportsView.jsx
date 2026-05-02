import { Progress } from "antd";
import { BarChartOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader.jsx";
import StatTile from "../../../components/StatTile.jsx";

export default function ReportsView({ completionRate, previewDevice, onDeviceChange, stats }) {
  return (
    <>
      <PageHeader
        badge="Reports"
        title="Reports"
        description="Progress penyelesaian task berdasarkan status completed dan pending."
        previewDevice={previewDevice}
        onDeviceChange={onDeviceChange}
      />
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-lg border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-lagoon-500 text-xl text-white">
              <BarChartOutlined />
            </span>
            <div>
              <h1 className="m-0 text-2xl font-bold text-ink-900">Reports</h1>
              <p className="m-0 mt-1 text-sm text-ink-500">Progress penyelesaian task</p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-ink-700">
                <span>Completed</span>
                <span>{stats.completed} task</span>
              </div>
              <Progress percent={completionRate} strokeColor="#16a34a" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-ink-700">
                <span>Pending</span>
                <span>{stats.pending} task</span>
              </div>
              <Progress percent={100 - completionRate} strokeColor="#f26a4b" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur sm:p-6">
          <h2 className="m-0 text-xl font-bold text-ink-900">Status Hari Ini</h2>
          <div className="mt-5 grid gap-3">
            <StatTile
              title="Selesai"
              value={stats.completed}
              icon={<CheckCircleOutlined />}
              tone="success"
            />
            <StatTile
              title="Belum Selesai"
              value={stats.pending}
              icon={<ClockCircleOutlined />}
              tone="warning"
            />
          </div>
        </div>
      </section>
    </>
  );
}
