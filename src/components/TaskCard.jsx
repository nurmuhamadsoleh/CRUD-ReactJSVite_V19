import { Popconfirm, Tag, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AppButton from "./ui/AppButton.jsx";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <article className="task-card rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <label className="mt-1 inline-flex cursor-pointer items-center" aria-label={`Ubah status ${task.title}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="peer sr-only"
          />
          <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-slate-300 bg-white text-sm font-bold text-white transition peer-checked:border-lagoon-500 peer-checked:bg-lagoon-500">
            {task.completed ? "✓" : ""}
          </span>
        </label>

        <div className="min-w-0 flex-1">
          <h2
            className={`m-0 break-words text-base font-semibold leading-6 ${
              task.completed ? "text-ink-500 line-through" : "text-ink-900"
            }`}
          >
            {task.title}
          </h2>
          <Tag color={task.completed ? "success" : "warning"} className="mt-3">
            {task.completed ? "Completed" : "Pending"}
          </Tag>
        </div>

        <Tooltip title="Hapus task">
          <Popconfirm
            title="Hapus task ini?"
            description="Task yang dihapus tidak bisa dikembalikan."
            okText="Hapus"
            cancelText="Batal"
            onConfirm={() => onDelete(task.id)}
          >
            <AppButton danger type="text" icon={<DeleteOutlined />} aria-label="Hapus task" />
          </Popconfirm>
        </Tooltip>
      </div>
    </article>
  );
}
