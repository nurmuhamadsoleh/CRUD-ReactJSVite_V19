import { Switch } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader.jsx";

export default function SettingsView({
  isSidebarOpen,
  onDeviceChange,
  onSidebarOpenChange,
  previewDevice,
}) {
  return (
    <>
      <PageHeader
        badge="Settings"
        title="Settings"
        description="Preferensi tampilan task dan navigasi aplikasi."
        previewDevice={previewDevice}
        onDeviceChange={onDeviceChange}
      />
      <section className="rounded-lg border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-900 text-xl text-white">
            <SettingOutlined />
          </span>
          <div>
            <h1 className="m-0 text-2xl font-bold text-ink-900">Settings</h1>
            <p className="m-0 mt-1 text-sm text-ink-500">Preferensi tampilan task</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="m-0 font-semibold text-ink-900">Compact cards</p>
                <p className="m-0 mt-1 text-sm text-ink-500">Kerapatan daftar task</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="m-0 font-semibold text-ink-900">Sidebar laptop</p>
                <p className="m-0 mt-1 text-sm text-ink-500">Tampilan navigasi permanen</p>
              </div>
              <Switch checked={isSidebarOpen} onChange={onSidebarOpenChange} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
