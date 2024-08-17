import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import useTasksStore from "@/store/tasksStore";

import CustomCheckbox from "@ui/ui/checkbox/CustomCheckbox";

export default function MenuButtons() {
  const toggleMenuModalVisible = useTasksStore((state) => state.toggleMenuModalVisible);
  const isEditing = useTasksStore((state) => state.isEditing);
  const toggleisEditing = useTasksStore((state) => state.toggleisEditing);
  const toggleAllTaskByIdToDelete = useTasksStore((state) => state.toggleAllTaskByIdToDelete);
  const tasksToDeleteEqualAllTask = useTasksStore((state) => state.tasksToDeleteEqualAllTask);

  if (isEditing) {
    return (
      <>
        <CustomCheckbox
          customStyle={styles.floatingcheckbox}
          condition={tasksToDeleteEqualAllTask}
          onValueChange={toggleAllTaskByIdToDelete}
        />
        <Pressable
          onPress={toggleisEditing}
          style={styles.closeEditing}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
          <Feather name="x" size={24} color="white" />
        </Pressable>
      </>
    );
  } else {
    return (
      <Pressable style={styles.menuButton} onPress={toggleMenuModalVisible}>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    marginTop: 5,
    marginRight: 10,
    right: 0,
    top: 3,
  },
  floatingcheckbox: {
    position: "absolute",
    marginTop: 5,
    marginRight: 20,
    right: 0,
    top: 5,
  },
  closeEditing: {
    position: "absolute",
    marginTop: 5,
    marginLeft: 20,
    left: 0,
    top: 3,
  },
});
