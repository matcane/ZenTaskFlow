import { PropsWithChildren } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import useTasksStore from "@/store/tasksStore";
import { type TTask } from "@/store/taskStoreTypes";

export default function TaskWrapper({ task, children }: PropsWithChildren<{ task: TTask }>) {
  const { setCurrentTask, isEditing, toggleisEditing } = useTasksStore();

  return (
    <TouchableOpacity
      style={[
        styles.task,
        task!.done === 1 && { backgroundColor: "#313131" },
        isEditing && { justifyContent: "space-between", flexDirection: "row-reverse" },
      ]}
      onPress={() => setCurrentTask(task!)}
      onLongPress={toggleisEditing}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#525252",
    justifyContent: "flex-start",
    padding: 20,
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    gap: 0,
  },
});
