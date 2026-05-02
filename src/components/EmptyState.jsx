import { Empty } from "antd";

const labels = {
  all: "Belum ada task.",
  completed: "Belum ada task yang selesai.",
  pending: "Tidak ada task pending.",
};

export default function EmptyState({ filter }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/80 p-8">
      <Empty description={labels[filter]} />
    </div>
  );
}
