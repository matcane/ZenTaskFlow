import { View, Text, StyleSheet } from "react-native";

import { type TTask } from "@/store/taskStoreTypes";

export type TTaskSection = {
  title: string;
  data: TTask[];
};

export default function TaskSection({ section }: { section: TTaskSection }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>
        {section.title} ({section.data.length})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginLeft: 20,
  },
  sectionHeaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
