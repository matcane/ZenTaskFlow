import { PropsWithChildren } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

type CustomModalProps = PropsWithChildren<{
  animationType?: "none" | "slide" | "fade" | undefined;
  modalVisible: boolean;
  onRequestClose: () => void;
  onShow?: () => void;
}>;

export default function CustomModal({
  animationType,
  modalVisible,
  onRequestClose,
  onShow,
  children,
}: CustomModalProps) {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
      onShow={onShow}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
