import { StyleSheet, Text } from "react-native";

import useTasksStore from "@/store/tasksStore";
import { type TTask } from "@/store/taskStoreTypes";

import CustomCheckbox from "@ui/ui/checkbox/CustomCheckbox";

export default function TaskContent({ task }: { task: TTask }) {
  const {
    isEditing,
    markDoneTask,
    tasksByIdToDelete,
    addTaskByIdToDelete,
    deleteTaskByIdToDelete,
  } = useTasksStore();

  const isTaskToDelete = () => tasksByIdToDelete.includes(task);
  const isTaskDone = () => task!.done === 1;

  const handleToggleTaskEdit = () => {
    if (isTaskToDelete()) {
      deleteTaskByIdToDelete(task);
    } else {
      addTaskByIdToDelete(task);
    }
  };

  const handleMarkDoneTask = () => markDoneTask(task.id);

  return (
    <>
      <CustomCheckbox
        condition={isEditing ? isTaskToDelete() : isTaskDone()}
        onValueChange={isEditing ? handleToggleTaskEdit : handleMarkDoneTask}
      />
      <Text style={styles.taskTitle}>{task.title}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  taskTitle: {
    maxWidth: "80%",
    marginHorizontal: 10,
    color: "white",
    fontSize: 20,
  },
});
