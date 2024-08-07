import {
  Appearance,
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import CustomContainer from "@/components/CustomComponets/CustomContainer";
import CustomText from "@/components/CustomComponets/CustomText";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";

const ChatsScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { mode, updateTheme } = useContext(ThemeContext);
  // Determine active mode based on current theme mode or system appearance
  const activeMode: ThemeMode =
    mode === "system"
      ? Appearance.getColorScheme() === "dark"
        ? "dark"
        : "light"
      : mode;

  const activeColors = Colors[activeMode];

  return (
    <View
      style={[
        { backgroundColor: activeColors.background, paddingTop: insets.top },
        defaultStyles.container,
      ]}
    >
      <Text style={{ color: activeColors.text }}>Chats</Text>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  
});
