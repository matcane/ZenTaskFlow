import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { initializeStore } from "@/store/tasksStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initializeApp = async () => {
      await initializeStore();

      SplashScreen.hideAsync();
    };
    initializeApp();
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
