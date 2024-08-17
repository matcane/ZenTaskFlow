import { useScrollY } from "@ui/AppWrapper";

export function useHeaderAnimations() {
  const scrollY = useScrollY();

  const headerHeight = scrollY?.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 40],
    extrapolate: "clamp",
  });

  const headerBorder = scrollY?.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.5],
    extrapolate: "clamp",
  });

  const fontSize = scrollY?.interpolate({
    inputRange: [0, 100],
    outputRange: [44, 24],
    extrapolate: "clamp",
  });

  const TextMarginTop = scrollY?.interpolate({
    inputRange: [0, 100],
    outputRange: [50, 0],
    extrapolate: "clamp",
  });

  const TextMarginLeft = scrollY?.interpolate({
    inputRange: [0, 100],
    outputRange: [10, 48],
    extrapolate: "clamp",
  });

  return { headerHeight, headerBorder, fontSize, TextMarginTop, TextMarginLeft };
}
