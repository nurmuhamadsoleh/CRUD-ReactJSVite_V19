const normalizeTasks = (items = []) =>
  items.map((item) => ({
    id: item.id,
    title: item.title,
    completed: Boolean(item.completed),
    createdAt: item.createdAt ?? 0,
  }));

const readLegacyStorage = (key, fallbackValue = []) => {
  if (!key) {
    return fallbackValue;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    window.localStorage.removeItem(key);
    return fallbackValue;
  }
};

const initialState = {
  localTasks: normalizeTasks(readLegacyStorage(import.meta.env.VITE_STORAGE_KEY)),
  deletedTaskIds: readLegacyStorage(import.meta.env.VITE_DELETED_STORAGE_KEY),
  taskApiResponse: undefined,
};

const createTaskSlice = (set, get) => ({
  ...initialState,
  setTaskApiResponse: (response) => {
    set(() => ({ taskApiResponse: response }));
  },
  createLocalTask: (title) => {
    const task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    set((state) => ({
      localTasks: [task, ...state.localTasks],
    }));

    return task;
  },
  updateLocalTaskStatus: (taskId, completed, sourceTask) => {
    const existingTask = get().localTasks.find((task) => task.id === taskId);
    const nextTask = existingTask
      ? { ...existingTask, completed }
      : { ...sourceTask, completed, createdAt: sourceTask?.createdAt ?? Date.now() };

    set((state) => ({
      localTasks: existingTask
        ? state.localTasks.map((task) => (task.id === taskId ? nextTask : task))
        : [nextTask, ...state.localTasks],
    }));

    return nextTask;
  },
  deleteLocalTask: (taskId) => {
    set((state) => ({
      localTasks: state.localTasks.filter((task) => task.id !== taskId),
      deletedTaskIds: [...new Set([...state.deletedTaskIds, taskId])],
    }));
  },
});

export default createTaskSlice;
