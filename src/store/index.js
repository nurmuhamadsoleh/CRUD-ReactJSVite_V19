import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import createTaskSlice from "./taskSlice.js";

const store = persist(
  (set, get) => ({
    ...createTaskSlice(set, get),
  }),
  {
    name: "TaskManagementApp",
    partialize: (state) => ({
      localTasks: state.localTasks,
      deletedTaskIds: state.deletedTaskIds,
      taskApiResponse: state.taskApiResponse,
    }),
  },
);

const useAppStore = create(
  devtools(store, {
    name: "TaskManagementApp",
  }),
);

export default useAppStore;
