import React, { ReactNode, useContext } from "react";
import { SafeAreaView, ScrollView, ViewStyle, StyleProp } from "react-native";
import { StatusBar } from "expo-status-bar";
import { defaultStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { Appearance } from "react-native";

interface CustomContainerProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  [key: string]: any;
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  style,
  children,
  ...props
}) => {
  const { mode } = useContext(ThemeContext);
  let activeMode: "light" | "dark";

  if (mode === "system") {
    activeMode = Appearance.getColorScheme() === "dark" ? "dark" : "light";
  } else {
    activeMode = mode;
  }

  const activeColors = Colors[activeMode];

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ScrollView
        style={[{ backgroundColor: activeColors.background }, style]}
        {...props}
      >
        {children}
        <StatusBar style={activeMode === "dark" ? "light" : "dark"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomContainer;
