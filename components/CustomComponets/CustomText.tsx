import React, { ReactNode, useContext } from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { Appearance } from "react-native";

interface CustomTextProps {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  small?: boolean;
  big?: boolean;
  [key: string]: any;
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  children,
  small,
  big,
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
    <Text
      style={[
        {
          color: activeColors.text,
          fontSize: small ? 14 : big ? 24 : 16,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
