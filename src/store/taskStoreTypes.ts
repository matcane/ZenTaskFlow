export type TTask = {
  id: string;
  title: string;
  done: number;
};

export type TTasksStore = {
  isEditing: boolean;
  editButtonVisible: boolean;
  setEditButtonVisible: (flag: boolean) => void;
  taskManagerModalVisible: boolean;
  menuModalVisible: boolean;
  hideCompleted: boolean;
  toggleHideCompleted: () => void;
  tasksByIdToDelete: TTask[];
  tasksToDeleteEqualAllTask: boolean;
  addTaskByIdToDelete: (taskToAdd: TTask) => void;
  deleteTaskByIdToDelete: (taskToAdd: TTask) => void;
  toggleAllTaskByIdToDelete: () => void;
  deleteTasksToDelete: () => void;
  toggleisEditing: () => void;
  toggleTaskManagerModalVisible: () => void;
  toggleMenuModalVisible: () => void;
  tasks: TTask[];
  addTask: (title: string) => void;
  updateTask: (task_id: string, newTitle: string) => void;
  currentTask: TTask | null;
  setCurrentTask: (task: TTask) => void;
  markDoneTask: (task_id: string) => void;
};
