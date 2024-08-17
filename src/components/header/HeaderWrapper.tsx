import { PropsWithChildren } from "react";
import { Animated, StyleSheet } from "react-native";

import { useHeaderAnimations } from "@/hooks/useHeaderAnimations";
import useTasksStore from "@/store/tasksStore";

export default function HeaderWrapper({ children }: PropsWithChildren) {
  const { headerHeight, headerBorder } = useHeaderAnimations();
  const taskManagerModalVisible = useTasksStore((state) => state.taskManagerModalVisible);
  return (
    <Animated.View
      style={[
        styles.header,
        { height: headerHeight, borderBottomWidth: headerBorder },
        taskManagerModalVisible && { opacity: 0.5 },
      ]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 0,
    flexDirection: "row",
    paddingLeft: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "gray",
  },
});
