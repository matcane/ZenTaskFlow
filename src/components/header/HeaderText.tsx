import { PropsWithChildren } from "react";
import { Animated, StyleSheet } from "react-native";

import { useHeaderAnimations } from "@/hooks/useHeaderAnimations";

export default function HeaderText({ indent, children }: PropsWithChildren<{ indent?: boolean }>) {
  const { fontSize, TextMarginTop, TextMarginLeft } = useHeaderAnimations();
  return (
    <Animated.Text
      style={[
        styles.headerText,
        {
          fontSize: fontSize,
          marginTop: TextMarginTop,
          marginLeft: indent ? 10 : TextMarginLeft,
        },
      ]}>
      {children}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "white",
  },
});
