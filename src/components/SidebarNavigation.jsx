import AppButton from "./ui/AppButton.jsx";

const navigationItems = [
  {
    key: "dashboard",
    icon: "D",
    label: "Dashboard",
  },
  {
    key: "tasks",
    icon: "T",
    label: "Tasks",
  },
  {
    key: "reports",
    icon: "R",
    label: "Reports",
  },
  {
    key: "settings",
    icon: "S",
    label: "Settings",
  },
];

export default function SidebarNavigation({ activePage, onNavigate, onClose, stats, isMobile = false }) {
  return (
    <nav className="flex h-full w-[300px] flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-soft lg:w-[280px]">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="m-0 text-xs font-semibold uppercase tracking-wide text-lagoon-600">
            Workspace
          </p>
          <h2 className="m-0 mt-1 text-xl font-bold text-ink-900">TaskFlow</h2>
        </div>
        <AppButton
          type="text"
          shape="circle"
          onClick={onClose}
          aria-label={isMobile ? "Tutup menu sidebar" : "Tutup sidebar"}
        >
          X
        </AppButton>
      </div>

      <div className="grid gap-2">
        {navigationItems.map((item) => {
          const isActive = activePage === item.key;

          return (
            <button
              key={item.key}
              className={`flex h-12 items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-lagoon-500 text-white"
                  : "text-ink-700 hover:bg-slate-100 hover:text-lagoon-600"
              }`}
              type="button"
              onClick={() => onNavigate(item.key)}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-lg text-xs ${
                  isActive ? "bg-white/20" : "bg-slate-100"
                }`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-ink-700">Pending</span>
          <span className="rounded-full bg-coral-500 px-2 py-0.5 text-xs font-bold text-white">
            {stats.pending}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-lagoon-500"
            style={{
              width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
            }}
          />
        </div>
        <p className="m-0 mt-3 text-xs text-ink-500">
          {stats.completed} dari {stats.total} task selesai
        </p>
      </div>
    </nav>
  );
}
