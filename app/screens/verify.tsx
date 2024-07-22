import { Appearance, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const VerifyScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Theme
  const { mode } = useContext(ThemeContext);
  let activeMode: "light" | "dark";

  if (mode === "system") {
    activeMode = Appearance.getColorScheme() === "dark" ? "dark" : "light";
  } else {
    activeMode = mode;
  }

  const activeColors = Colors[activeMode];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: activeColors.background,
        paddingTop: insets.top,
      }}
    >
      <Text style={{color: activeColors.text}}>verify</Text>
    </View>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  
});
