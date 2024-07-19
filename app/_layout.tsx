import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View } from 'react-native'
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { getData, storeData } from "@/config/asyncStorage";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    nunito: require("@/assets/fonts/Nunito-Regular.ttf"),
    nunitoM: require("@/assets/fonts/Nunito-Medium.ttf"),
    nunitoSB: require("@/assets/fonts/Nunito-SemiBold.ttf"),
    nunitoB: require("@/assets/fonts/Nunito-Bold.ttf"),
  });

  const [theme, setTheme] = useState<{ mode: ThemeMode }>({ mode: "system" });

  const updateTheme = (newTheme: { mode?: ThemeMode }) => {
    let mode: ThemeMode;
    if (!newTheme.mode) {
      mode = theme.mode === "dark" ? "light" : "dark";
    } else {
      mode = newTheme.mode;
    }
    setTheme({ mode });
    storeData("appTheme", { mode });
  };

  useEffect(() => {
    const fetchStoredTheme = async () => {
      try {
        const themeData = await getData("appTheme");
        if (themeData && themeData.mode) {
          updateTheme({ mode: themeData.mode });
        } else {
          // Default behavior if no stored theme found
          const systemColorScheme = Appearance.getColorScheme();
          updateTheme({ mode: systemColorScheme as ThemeMode });
        }
      } catch (error) {
        alert(error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    fetchStoredTheme();
  }, []);

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({ mode: colorScheme as ThemeMode });
    });

    return () => listener.remove();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <View />;
  }

  return (
    <ThemeContext.Provider value={{ mode: theme.mode, updateTheme }}>
      <RootLayoutNav />
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
    </ThemeContext.Provider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
