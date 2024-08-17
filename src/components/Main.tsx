import { View } from "react-native";

import useTasksStore from "@/store/tasksStore";

import TaskList from "./task/TaskList";

export default function Main() {
  const taskManagerModalVisible = useTasksStore((state) => state.taskManagerModalVisible);
  return (
    <View style={[{ flex: 1 }, taskManagerModalVisible && { opacity: 0.5 }]}>
      <TaskList />
    </View>
  );
}
