import { StyleSheet, TouchableOpacity, Text } from "react-native";

import useTasksStore from "@/store/tasksStore";

export default function FloatingButton() {
  const toggleTaskManagerModalVisible = useTasksStore(
    (state) => state.toggleTaskManagerModalVisible,
  );
  return (
    <TouchableOpacity style={styles.button} onPress={toggleTaskManagerModalVisible}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    bottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
