import { Spin } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FireOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AppHeader from "../../../components/AppHeader.jsx";
import EmptyState from "../../../components/EmptyState.jsx";
import FilterTabs from "../../../components/FilterTabs.jsx";
import StatTile from "../../../components/StatTile.jsx";
import TaskComposer from "../../../components/TaskComposer.jsx";
import TaskList from "../../../components/TaskList.jsx";
import TaskPagination from "../../../components/TaskPagination.jsx";
import TaskSearchInput from "../../../components/TaskSearchInput.jsx";

export default function TasksView({
  currentPage,
  filter,
  isLoading,
  onAddTask,
  onDeleteTask,
  onDeviceChange,
  onFilterChange,
  onPageChange,
  onSearchChange,
  onToggleTask,
  pageSize,
  previewDevice,
  searchTerm,
  stats,
  taskPreview,
  taskTotals,
  tasks,
}) {
  return (
    <div className={`mx-auto flex w-full flex-col gap-6 transition-all duration-300 ${taskPreview.frame}`}>
      <AppHeader previewDevice={previewDevice} onDeviceChange={onDeviceChange} />

      <section className={`grid gap-3 lg:gap-4 ${taskPreview.stats}`} aria-label="Ringkasan task">
        <StatTile title="Total Task" value={stats.total} icon={<FireOutlined />} tone="neutral" />
        <StatTile
          title="Completed"
          value={stats.completed}
          icon={<CheckCircleOutlined />}
          tone="success"
        />
        <StatTile
          title="Pending"
          value={stats.pending}
          icon={<ClockCircleOutlined />}
          tone="warning"
        />
      </section>

      <section className={`grid items-start gap-5 ${taskPreview.workspace}`}>
        <div className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft backdrop-blur sm:p-5">
          <TaskComposer onAddTask={onAddTask} submitIcon={<PlusOutlined />} />
        </div>

        <div className="flex min-h-[420px] flex-col gap-4 rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft backdrop-blur sm:p-5">
          <TaskSearchInput
            value={searchTerm}
            onChange={onSearchChange}
            isSearching={isLoading && Boolean(searchTerm.trim())}
          />
          <FilterTabs value={filter} onChange={onFilterChange} counts={stats} />

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center py-16">
              <Spin tip="Memuat task" size="large">
                <div className="h-16 w-16" />
              </Spin>
            </div>
          ) : tasks.length > 0 ? (
            <>
              <TaskList
                tasks={tasks}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
                previewDevice={previewDevice}
              />
              <TaskPagination
                current={currentPage}
                pageSize={pageSize}
                total={taskTotals[filter]}
                onChange={onPageChange}
                previewDevice={previewDevice}
              />
            </>
          ) : (
            <EmptyState filter={filter} />
          )}
        </div>
      </section>
    </div>
  );
}
