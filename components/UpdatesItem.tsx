import { StyleSheet, Text, View, Image, Appearance } from "react-native";
import React, { useContext } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

type UpdatesItemProps = {
  image: string;
  name: string;
  date: string;
  status: string;
};

const UpdatesItem = ({ image, name, date, status }: UpdatesItemProps) => {
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
    <View style={styles.container}>
      {/* The image */}
      <View
        style={[
          styles.imageContainer,
          {
            borderColor:
              status === "recent" ? activeColors.primary : activeColors.tint,
          },
        ]}
      >
        <Image
          source={{ uri: image }}
          style={[styles.image, { opacity: status === "muted" ? 0.3 : 0.9 }]}
        />
      </View>
      {/* The texts */}
      <View>
        <Text style={[styles.name, { color: activeColors.text }]}>{name}</Text>
        <Text style={[styles.date, { color: activeColors.tint }]}>{date}</Text>
      </View>
    </View>
  );
};

export default UpdatesItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 2
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  name: {
    fontFamily: "nunitoB",
    fontSize: 15,
  },
  date: {
    fontFamily: "nunito",
    fontSize: 12.5,
  },
});
