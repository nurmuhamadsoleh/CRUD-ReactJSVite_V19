import { useEffect, useMemo, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDebounce from "../../../hooks/useDebounce.js";
import { createTask, deleteTask, listTasks, updateTaskStatus } from "../../../services/tasks.api.js";
import TasksView from "../Component/TasksView.jsx";
import taskPreviewLayout from "./taskPreviewLayout.js";

const emptyTotals = {
  all: 0,
  completed: 0,
  pending: 0,
};

export default function TasksContainer({ previewDevice, onDeviceChange }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: "always",
            retryOnMount: true,
            refetchInterval: false,
            refetchIntervalInBackground: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TasksContainerContent previewDevice={previewDevice} onDeviceChange={onDeviceChange} />
    </QueryClientProvider>
  );
}

function TasksContainerContent({ previewDevice, onDeviceChange }) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const taskPreview = taskPreviewLayout[previewDevice];
  const pageSize = taskPreview.pageSize;

  const getListTaskManagement = ({ signal }) =>
    listTasks({
      searchTerm: debouncedSearchTerm,
      filter,
      page: currentPage,
      limit: pageSize,
      signal,
    });

  const {
    data: dataListTaskManagement,
    error: errorListTaskManagement,
    isError: isErrorListTaskManagement,
    isFetching: isFetchingTaskManagement,
    refetch: refetchTaskManagement,
  } = useQuery({
    queryKey: [
      "Get List Task Management",
      "desc",
      "id",
      pageSize,
      currentPage,
      debouncedSearchTerm,
      filter,
    ],
    queryFn: getListTaskManagement,
    enabled: true,
  });

  const tasks = dataListTaskManagement?.data ?? [];
  const taskTotals = dataListTaskManagement?.totals ?? emptyTotals;
  const isLoading = isFetchingTaskManagement;

  const stats = useMemo(
    () => ({
      total: taskTotals.all,
      completed: taskTotals.completed,
      pending: taskTotals.pending,
    }),
    [taskTotals],
  );

  useEffect(() => {
    if (isErrorListTaskManagement) {
      toast.error(errorListTaskManagement?.message || "Gagal memuat data task.");
    }
  }, [errorListTaskManagement, isErrorListTaskManagement]);

  const invalidateTasks = () => {
    queryClient.invalidateQueries({ queryKey: ["Get List Task Management"] });
    refetchTaskManagement();
  };

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      setFilter("pending");
      setSearchTerm("");
      setCurrentPage(1);
      invalidateTasks();
      toast.success("Task baru ditambahkan.");
    },
    onError: () => {
      toast.error("Gagal menambahkan task.");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, completed, task }) => updateTaskStatus(taskId, completed, task),
    onSuccess: invalidateTasks,
    onError: () => {
      toast.error("Gagal mengubah status task.");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      invalidateTasks();
      toast.success("Task dihapus.");
    },
    onError: () => {
      toast.error("Gagal menghapus task.");
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, filter, previewDevice]);

  useEffect(() => {
    const lastPage = Math.max(1, Math.ceil(taskTotals[filter] / pageSize));

    if (currentPage > lastPage) {
      setCurrentPage(lastPage);
    }
  }, [currentPage, filter, pageSize, taskTotals]);

  const handleAddTask = async (title) => {
    await createTaskMutation.mutateAsync(title);
  };

  const handleToggleTask = async (taskId) => {
    const selectedTask = tasks.find((task) => task.id === taskId);

    if (!selectedTask) {
      return;
    }

    await updateTaskMutation.mutateAsync({
      taskId,
      completed: !selectedTask.completed,
      task: selectedTask,
    });
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTaskMutation.mutateAsync(taskId);
  };

  const handleFilterChange = (nextFilter) => {
    setFilter(nextFilter);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <>
      <TasksView
        currentPage={currentPage}
        filter={filter}
        isLoading={isLoading}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onDeviceChange={onDeviceChange}
        onFilterChange={handleFilterChange}
        onPageChange={setCurrentPage}
        onSearchChange={setSearchTerm}
        onToggleTask={handleToggleTask}
        pageSize={pageSize}
        previewDevice={previewDevice}
        searchTerm={searchTerm}
        stats={stats}
        taskPreview={taskPreview}
        taskTotals={taskTotals}
        tasks={tasks}
      />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
