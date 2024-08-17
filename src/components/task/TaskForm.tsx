import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, TextInput, View, Text, StyleSheet } from "react-native";

import useTasksStore from "@/store/tasksStore";

import TaskFormTextInput from "./TaskFormInput";

export default function TaskForm({ inputRef }: { inputRef: React.RefObject<TextInput> }) {
  const { addTask, updateTask, currentTask, toggleTaskManagerModalVisible } = useTasksStore();
  const [title, setTitle] = useState<string>(currentTask?.title || "");

  const handleTaskSubmit = () => {
    if (currentTask) {
      updateTask(currentTask.id, title);
    } else {
      addTask(title);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={toggleTaskManagerModalVisible}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Feather name="x" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerText}>New Task</Text>
        <Pressable
          disabled={title ? false : true}
          onPress={handleTaskSubmit}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Feather name="check" size={24} color={title ? "white" : "#525252"} />
        </Pressable>
      </View>
      <TaskFormTextInput title={title} setTitle={setTitle} inputRef={inputRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 200,
    height: "auto",
    backgroundColor: "#313131",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
  },
});
