import { useRef } from "react";
import { TextInput, StyleSheet, View } from "react-native";

import useTasksStore from "@/store/tasksStore";

import FloatingButton from "@ui/ui/button/FloatingButton";
import CustomModal from "@ui/ui/modal/CustomModal";

import TaskForm from "./TaskForm";

export default function TaskModal() {
  const { taskManagerModalVisible, isEditing, toggleTaskManagerModalVisible } = useTasksStore();
  const inputRef = useRef<TextInput>(null);

  return (
    <>
      <CustomModal
        modalVisible={taskManagerModalVisible}
        onRequestClose={toggleTaskManagerModalVisible}
        onShow={() => {
          // dont want to use it but at least it working
          setTimeout(() => {
            inputRef.current?.focus();
          }, 20);
        }}>
        <View style={styles.centeredView}>
          <TaskForm inputRef={inputRef} />
        </View>
      </CustomModal>
      {!taskManagerModalVisible && !isEditing && <FloatingButton />}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
