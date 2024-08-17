import { Pressable, Text } from "react-native";

export default function ModalItem({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={{ width: "100%" }} onPress={onPress} hitSlop={{ top: 5, bottom: 5 }}>
      <Text style={{ color: "white" }}>{label}</Text>
    </Pressable>
  );
}
