import { lazy, Suspense, useState } from "react";
import AppButton from "./components/ui/AppButton.jsx";
import SidebarNavigation from "./components/SidebarNavigation.jsx";
import useAppStore from "./store/index.js";

const DashboardContainer = lazy(() => import("./modules/dashboard/Container/DashboardContainer.jsx"));
const ReportsContainer = lazy(() => import("./modules/reports/Container/ReportsContainer.jsx"));
const SettingsContainer = lazy(() => import("./modules/settings/Container/SettingsContainer.jsx"));
const TasksContainer = lazy(() => import("./modules/tasks/Container/TasksContainer.jsx"));

const emptyTotals = {
  all: 0,
  completed: 0,
  pending: 0,
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("laptop");
  const taskApiResponse = useAppStore((state) => state.taskApiResponse);
  const totals = taskApiResponse?.totals ?? emptyTotals;
  const stats = {
    total: totals.all,
    completed: totals.completed,
    pending: totals.pending,
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  const renderPage = () => {
    if (activePage === "dashboard") {
      return (
        <DashboardContainer
          previewDevice={previewDevice}
          onDeviceChange={setPreviewDevice}
          stats={stats}
        />
      );
    }

    if (activePage === "reports") {
      return (
        <ReportsContainer
          previewDevice={previewDevice}
          onDeviceChange={setPreviewDevice}
          stats={stats}
        />
      );
    }

    if (activePage === "settings") {
      return (
        <SettingsContainer
          isSidebarOpen={isSidebarOpen}
          onDeviceChange={setPreviewDevice}
          onSidebarOpenChange={setIsSidebarOpen}
          previewDevice={previewDevice}
        />
      );
    }

    return <TasksContainer previewDevice={previewDevice} onDeviceChange={setPreviewDevice} />;
  };

  return (
    <div className="task-shell bg-transparent lg:flex">
      {isSidebarOpen ? (
        <aside className="sticky top-0 hidden h-screen shrink-0 lg:block">
          <SidebarNavigation
            activePage={activePage}
            onNavigate={handleNavigate}
            onClose={() => setIsSidebarOpen(false)}
            stats={stats}
          />
        </aside>
      ) : null}

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 h-full w-full bg-slate-950/40"
            type="button"
            aria-label="Tutup menu sidebar"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative h-full w-[300px] max-w-[86vw]">
            <SidebarNavigation
              activePage={activePage}
              onNavigate={handleNavigate}
              onClose={() => setIsMobileMenuOpen(false)}
              stats={stats}
              isMobile
            />
          </div>
        </div>
      ) : null}

      <main className="min-w-0 flex-1">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-10">
          <div className="flex items-center gap-3 lg:hidden">
            <AppButton
              type="primary"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Buka menu sidebar"
            >
              Menu
            </AppButton>
          </div>

          {!isSidebarOpen ? (
            <div className="hidden lg:block">
              <AppButton
                type="primary"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Buka sidebar"
              >
                Buka Sidebar
              </AppButton>
            </div>
          ) : null}

          <Suspense
            fallback={
              <div className="rounded-lg border border-white/80 bg-white/90 p-6 text-sm font-semibold text-ink-500 shadow-soft">
                Memuat halaman...
              </div>
            }
          >
            {renderPage()}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
