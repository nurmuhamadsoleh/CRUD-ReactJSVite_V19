import TaskCard from "./TaskCard.jsx";

const layoutClasses = {
  mobile: "grid-cols-1",
  tablet: "grid-cols-1 sm:grid-cols-2",
  laptop: "md:grid-cols-2 xl:grid-cols-3",
};

export default function TaskList({ tasks, onToggleTask, onDeleteTask, previewDevice = "laptop" }) {
  return (
    <div className={`grid gap-3 ${layoutClasses[previewDevice]}`}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
      ))}
    </div>
  );
}
