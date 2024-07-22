import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import React, { useContext } from "react";
import { defaultStyles } from "@/constants/Styles";
import { ThemeContext } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

type ButtonProps = {
  text: string;
  onPress: () => void;
};

const Button = ({ text, onPress }: ButtonProps) => {
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
    <TouchableOpacity
      style={[{ backgroundColor: activeColors.primary }, defaultStyles.btn]}
      onPress={onPress}
    >
      <Text style={[{ color: activeColors.background }, defaultStyles.btnText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
