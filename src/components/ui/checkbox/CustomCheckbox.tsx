import Checkbox from "expo-checkbox";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export default function MyCheckbox({
  customStyle,
  condition,
  onValueChange,
}: {
  customStyle?: StyleProp<ViewStyle>;
  condition: boolean;
  onValueChange: () => void;
}) {
  return (
    <Checkbox
      color="#2196f3"
      style={[styles.checkbox, customStyle]}
      value={condition ? true : false}
      onValueChange={onValueChange}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderColor: "black",
    borderRadius: 30,
  },
});
