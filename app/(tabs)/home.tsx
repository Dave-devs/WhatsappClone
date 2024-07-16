import React, { useContext, useState, useEffect } from "react";
import { Appearance, Platform, Switch } from "react-native";
import CustomContainer from "@/components/CustomComponets/CustomContainer";
import CustomText from "@/components/CustomComponets/CustomText";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";


export default function Page() {
  const { mode, updateTheme } = useContext(ThemeContext);

  // Determine active mode based on current theme mode or system appearance
  const activeMode: ThemeMode = mode === "system"
    ? (Appearance.getColorScheme() === "dark" ? "dark" : "light")
    : mode;

  const activeColors = Colors[activeMode];
  const [isDarkMode, setIsDarkMode] = useState(activeMode === "dark");

  // Handle theme toggle
  const switchMode = () => {
    const newMode: ThemeMode = isDarkMode ? "light" : "dark";
    updateTheme({ mode: newMode });
    setIsDarkMode(!isDarkMode);
  };

  // Update toggle state when theme changes externally (e.g., system theme change)
  useEffect(() => {
    setIsDarkMode(mode === "dark");
  }, [mode]);

  return (
    <CustomContainer
      style={{ flex: 1, paddingTop: Platform.OS === "android" ? 40 : 0 }}
    >
      <CustomText>Home</CustomText>
      <Switch
        value={isDarkMode}
        onValueChange={switchMode}
        thumbColor={isDarkMode ? activeColors.primary : activeColors.secondary}
        trackColor={{
          false: activeColors.primary,
          true: activeColors.secondary,
        }}
      />
    </CustomContainer>
  );
}

