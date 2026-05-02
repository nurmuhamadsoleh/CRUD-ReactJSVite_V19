import { Pagination } from "antd";

export default function TaskPagination({ current, pageSize, total, onChange, previewDevice }) {
  const startItem = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);
  const isCompact = previewDevice === "mobile";

  return (
    <div className="mt-auto flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="m-0 text-center text-sm font-medium text-ink-500 sm:text-left">
        Menampilkan {startItem}-{endItem} dari {total} task
      </p>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
        size={isCompact ? "small" : "default"}
        responsive
        className="task-pagination flex justify-center sm:justify-end"
      />
    </div>
  );
}
