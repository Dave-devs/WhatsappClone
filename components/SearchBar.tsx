import { Appearance, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { Fontisto } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

const SearchBar = () => {
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
    <View style={[{ backgroundColor: activeColors.accent }, styles.serchBox]}>
      <Image
        source={require("@/assets/images/meta-ai.png")}
        style={defaultStyles.image}
      />
      <Text style={[styles.text, { color: activeColors.tint }]}>
        Ask Meta AI or Search
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  serchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 50,
    gap: 10,
  },
  text: {
    fontFamily: "nunitoSB",
    fontSize: 13,
    width: "100%",
  },
});

export default SearchBar;
