import Feather from "@expo/vector-icons/Feather";
import { Pressable, View, Text, StyleSheet } from "react-native";

import useTasksStore from "@/store/tasksStore";

import TaskModal from "./task/TaskModal";

export default function Footer() {
  const isEditing = useTasksStore((state) => state.isEditing);
  const tasksByIdToDelete = useTasksStore((state) => state.tasksByIdToDelete);
  const deleteTasksToDelete = useTasksStore((state) => state.deleteTasksToDelete);

  const deleteIconColor = () => (tasksByIdToDelete.length > 0 ? "white" : "#525252");

  return (
    <>
      <View style={[styles.footer, { display: isEditing ? "flex" : "none" }]}>
        <Pressable
          disabled={tasksByIdToDelete.length > 0 ? false : true}
          onPress={deleteTasksToDelete}
          style={styles.deleteButton}
          hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}>
          <Feather name="trash-2" size={24} color={deleteIconColor()} />
          <Text style={[styles.deleteButtonText, { color: deleteIconColor() }]}>Delete</Text>
        </Pressable>
      </View>
      <TaskModal />
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    fontSize: 14,
  },
});
