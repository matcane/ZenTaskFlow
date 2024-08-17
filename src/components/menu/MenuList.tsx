import React from "react";
import { View, StyleSheet } from "react-native";

import useTasksStore from "@/store/tasksStore";

import ModalItem from "./MenuItem";

export default function MenuList() {
  const editButtonVisible = useTasksStore((state) => state.editButtonVisible);
  const toggleMenuModalVisible = useTasksStore((state) => state.toggleMenuModalVisible);
  const toggleisEditing = useTasksStore((state) => state.toggleisEditing);
  const hideCompleted = useTasksStore((state) => state.hideCompleted);
  const toggleHideCompleted = useTasksStore((state) => state.toggleHideCompleted);
  return (
    <View style={[styles.container, { minHeight: editButtonVisible ? 100 : 50 }]}>
      {editButtonVisible && <ModalItem label="Edit" onPress={toggleisEditing} />}
      <ModalItem
        label={(hideCompleted ? "Show" : "Hide") + " completed"}
        onPress={() => {
          toggleHideCompleted();
          toggleMenuModalVisible();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: "auto",
    borderRadius: 20,
    backgroundColor: "#535353",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
});
