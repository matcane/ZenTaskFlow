import uuid from "react-native-uuid";
import { create } from "zustand";

import { initializeDatabase, executeQuery, executeEachQuery } from "@/utils/database";

import { TTasksStore } from "./taskStoreTypes";

const initialState = {
  isEditing: false,
  editButtonVisible: true,
  tasksByIdToDelete: [],
  tasksToDeleteEqualAllTask: false,
  hideCompleted: false,
  taskManagerModalVisible: false,
  menuModalVisible: false,
  tasks: [],
  currentTask: null,
};

const useTasksStore = create<TTasksStore>((set) => ({
  ...initialState,
  toggleHideCompleted: () => {
    set((state) => ({
      hideCompleted: !state.hideCompleted,
    }));
  },
  setEditButtonVisible: (flag) => {
    set({ editButtonVisible: flag });
  },
  deleteTasksToDelete: () => {
    const tasksToDelete = useTasksStore.getState().tasksByIdToDelete;
    executeEachQuery("DELETE FROM tasks WHERE id = ?", tasksToDelete);
    tasksToDelete.map((currentTask) => {
      set((state) => ({ tasks: state.tasks.filter((task) => task.id !== currentTask.id) }));
    });
    set((state) => ({ isEditing: !state.isEditing }));
  },
  addTaskByIdToDelete: (task) => {
    set((state) => ({
      tasksByIdToDelete: [...state.tasksByIdToDelete, task],
      tasksToDeleteEqualAllTask:
        state.tasksByIdToDelete.length + 1 === state.tasks.length ? true : false,
    }));
  },
  deleteTaskByIdToDelete: (currentTask) => {
    set((state) => ({
      tasksToDeleteEqualAllTask: false,
      tasksByIdToDelete: state.tasksByIdToDelete.filter((task) => task.id !== currentTask.id),
    }));
  },
  toggleAllTaskByIdToDelete: () => {
    set((state) => ({
      tasksToDeleteEqualAllTask: !state.tasksToDeleteEqualAllTask,
      tasksByIdToDelete: state.tasksToDeleteEqualAllTask ? [] : [...state.tasks],
    }));
  },
  toggleTaskManagerModalVisible: () => {
    set((state) => ({
      currentTask: null,
      taskManagerModalVisible: !state.taskManagerModalVisible,
    }));
  },
  toggleMenuModalVisible: () => {
    set((state) => ({
      menuModalVisible: !state.menuModalVisible,
    }));
  },
  toggleisEditing: () => {
    set((state) => ({
      currentTask: null,
      tasksToDeleteEqualAllTask: false,
      tasksByIdToDelete: [],
      isEditing: !state.isEditing,
      menuModalVisible: false,
    }));
  },
  addTask: async (title) => {
    const newTask = { id: uuid.v4().toString(), title: title, done: -1 };
    executeQuery("INSERT INTO tasks (id, title, done) VALUES (?, ?, -1);", [
      newTask.id,
      newTask.title,
    ]);

    set((state) => ({
      tasks: [...state.tasks, newTask],
      taskManagerModalVisible: !state.taskManagerModalVisible,
    }));
  },
  updateTask: async (task_id, newTitle) => {
    executeQuery("UPDATE tasks SET title = ? WHERE id = ?;", [newTitle, task_id]);

    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === task_id ? { ...task, title: newTitle } : task)),
      taskManagerModalVisible: !state.taskManagerModalVisible,
    }));
  },
  setCurrentTask: (task) => {
    set((state) => ({
      currentTask: task,
      taskManagerModalVisible: !state.taskManagerModalVisible,
    }));
  },
  markDoneTask: async (task_id) => {
    const task = useTasksStore.getState().tasks.find((task) => task.id === task_id);
    if (task) {
      executeQuery("UPDATE tasks SET done = ? WHERE id = ?;", [task?.done * -1, task_id]);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === task_id ? { ...task, done: task.done * -1 } : task,
        ),
      }));
    }
  },
}));

export const initializeStore = async () => {
  const initialTasks = await initializeDatabase();
  useTasksStore.setState({ tasks: initialTasks });
};

export default useTasksStore;
