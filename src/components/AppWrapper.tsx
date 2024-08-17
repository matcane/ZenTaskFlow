import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScrollYContext = createContext<Animated.Value | null>(null);

export const useScrollY = () => useContext(ScrollYContext);

export const ScrollYProvider = ({
  scrollY,
  children,
}: {
  scrollY: Animated.Value;
  children: React.ReactNode;
}) => {
  return <ScrollYContext.Provider value={scrollY}>{children}</ScrollYContext.Provider>;
};

export default function AppWrapper({ children }: PropsWithChildren) {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollYProvider scrollY={scrollY}>{children}</ScrollYProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flexGrow: 1,
  },
});
