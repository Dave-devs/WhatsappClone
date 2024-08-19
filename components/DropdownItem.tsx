import { Appearance, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { defaultStyles } from "@/constants/Styles";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

type DropdownProps = {
    text: string;
    onPress: () => void;
};

const DropdownItem = ({text, onPress}: DropdownProps) => {
  // Determine active mode based on current theme mode or system appearance
  const { mode, updateTheme } = useContext(ThemeContext);

  const activeMode: ThemeMode =
    mode === "system"
      ? Appearance.getColorScheme() === "dark"
        ? "dark"
        : "light"
      : mode;

  const activeColors = Colors[activeMode];
  return (
    <TouchableOpacity onPress={onPress}>
          <Text style={[defaultStyles.text, { color: activeColors.text }]}>
              {text}
          </Text>
    </TouchableOpacity>
  );
};

export default DropdownItem;
