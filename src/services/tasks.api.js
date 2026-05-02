import axios from "axios";
import useAppStore from "../store/index.js";

const taskClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const normalizeTasks = (items = []) =>
  items.map((item) => ({
    id: item.id,
    title: item.title,
    completed: Boolean(item.completed),
    createdAt: item.createdAt ?? 0,
  }));

const buildApiParams = ({ searchTerm = "", filter = "all", page, limit } = {}) => {
  const params = {};
  const query = searchTerm.trim();

  if (query) {
    params.title = query;
  }

  if (filter === "pending") {
    params.completed = false;
  }

  if (filter === "completed") {
    params.completed = true;
  }

  if (page && limit) {
    params._page = page;
    params._per_page = limit;
  }

  return params;
};

const parseApiResponse = (response) => {
  const payload = response.data;

  if (Array.isArray(payload)) {
    const headerTotal = Number(response.headers["x-total-count"]);

    return {
      data: normalizeTasks(payload),
      total: Number.isFinite(headerTotal) ? headerTotal : payload.length,
    };
  }

  return {
    data: normalizeTasks(payload.data ?? []),
    total: Number(payload.items ?? payload.total ?? payload.data?.length ?? 0),
  };
};

const fetchApiTasks = async (params = {}, signal) => {
  const response = await taskClient.get("", {
    params: buildApiParams(params),
    signal,
  });

  return parseApiResponse(response);
};

const sortTasks = (tasks) =>
  [...tasks].sort((firstTask, secondTask) => {
    const firstCreatedAt = Number(firstTask.createdAt || 0);
    const secondCreatedAt = Number(secondTask.createdAt || 0);

    return secondCreatedAt - firstCreatedAt || Number(secondTask.id) - Number(firstTask.id);
  });

const searchTasks = (tasks, searchTerm) => {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return tasks;
  }

  return tasks.filter((task) => task.title.toLowerCase().includes(query));
};

const filterTasks = (tasks, filter) => {
  if (filter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  if (filter === "pending") {
    return tasks.filter((task) => !task.completed);
  }

  return tasks;
};

const paginateTasks = (tasks, page, limit) => {
  const startIndex = (page - 1) * limit;

  return tasks.slice(startIndex, startIndex + limit);
};

const getLocalTasks = () => useAppStore.getState().localTasks ?? [];

const getDeletedTaskIds = () => useAppStore.getState().deletedTaskIds ?? [];

const removeDeletedTasks = (tasks) => {
  const deletedTaskIds = new Set(getDeletedTaskIds());

  return tasks.filter((task) => !deletedTaskIds.has(task.id));
};

const mergeLocalTasks = (apiTasks, localTasks) => {
  const mergedTasks = new Map();

  removeDeletedTasks(apiTasks).forEach((task) => {
    mergedTasks.set(task.id, task);
  });

  localTasks.forEach((task) => {
    mergedTasks.set(task.id, task);
  });

  return sortTasks([...mergedTasks.values()]);
};

const listLocalTasks = ({ searchTerm, filter, page, limit }) => {
  const searchedTasks = searchTasks(sortTasks(getLocalTasks()), searchTerm);
  const filteredTasks = filterTasks(searchedTasks, filter);

  return {
    data: paginateTasks(filteredTasks, page, limit),
    total: filteredTasks.length,
  };
};

const setTaskApiResponse = (response) => {
  useAppStore.getState().setTaskApiResponse(response);
};

export const listTasks = async ({ searchTerm, filter, page, limit, signal }) => {
  try {
    const [apiResult, allResult, completedResult, pendingResult] = await Promise.all([
      fetchApiTasks({ searchTerm, filter, page, limit }, signal),
      fetchApiTasks({ searchTerm, filter: "all" }, signal),
      fetchApiTasks({ searchTerm, filter: "completed" }, signal),
      fetchApiTasks({ searchTerm, filter: "pending" }, signal),
    ]);
    const localTasks = getLocalTasks();
    const searchedLocalTasks = searchTasks(localTasks, searchTerm);
    const visibleApiTasks = removeDeletedTasks(apiResult.data);
    const localFilteredTasks = filterTasks(searchedLocalTasks, filter);
    const visibleLocalTasks = paginateTasks(sortTasks(localFilteredTasks), page, limit);
    const data = mergeLocalTasks(visibleApiTasks, visibleLocalTasks).slice(0, limit);
    const totals = {
      all: mergeLocalTasks(allResult.data, searchedLocalTasks).length,
      completed: mergeLocalTasks(
        completedResult.data,
        filterTasks(searchedLocalTasks, "completed"),
      ).length,
      pending: mergeLocalTasks(pendingResult.data, filterTasks(searchedLocalTasks, "pending")).length,
    };
    const response = {
      data,
      total: totals[filter],
      totals,
    };

    setTaskApiResponse(response);

    return response;
  } catch (error) {
    if (axios.isCancel(error) || error.name === "CanceledError") {
      throw error;
    }

    const localResult = listLocalTasks({ searchTerm, filter, page, limit });
    const searchedLocalTasks = searchTasks(getLocalTasks(), searchTerm);
    const response = {
      ...localResult,
      totals: {
        all: searchedLocalTasks.length,
        completed: filterTasks(searchedLocalTasks, "completed").length,
        pending: filterTasks(searchedLocalTasks, "pending").length,
      },
    };

    setTaskApiResponse(response);

    return response;
  }
};

export const createTask = async (title) => useAppStore.getState().createLocalTask(title);

export const updateTaskStatus = async (taskId, completed, sourceTask) =>
  useAppStore.getState().updateLocalTaskStatus(taskId, completed, sourceTask);

export const deleteTask = async (taskId) => {
  useAppStore.getState().deleteLocalTask(taskId);
};
