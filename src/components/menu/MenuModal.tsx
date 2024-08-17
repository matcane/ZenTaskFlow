import { StyleSheet, View } from "react-native";

import useTasksStore from "@/store/tasksStore";

import CustomModal from "@ui/ui/modal/CustomModal";

import MenuButtons from "./MenuButtons";
import MenuList from "./MenuList";

export default function MenuModal() {
  const menuModalVisible = useTasksStore((state) => state.menuModalVisible);
  const toggleMenuModalVisible = useTasksStore((state) => state.toggleMenuModalVisible);

  return (
    <>
      <CustomModal
        animationType="fade"
        modalVisible={menuModalVisible}
        onRequestClose={toggleMenuModalVisible}>
        <View style={styles.centeredView}>
          <MenuList />
        </View>
      </CustomModal>
      <MenuButtons />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    top: 50,
  },
});
