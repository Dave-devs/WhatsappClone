import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Appearance,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

type ChatItemProps = {
  image: string;
  name: string;
  lastMsg: string;
  date: string;
};

const ChatItem = ({image, name, lastMsg, date}: ChatItemProps) => {
  const w = useWindowDimensions().width;

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
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={{ width: w / 1.8, gap: 5 }}>
        <Text
          style={[styles.name, { color: activeColors.text }]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          style={[styles.msg, { color: activeColors.tint }]}
          numberOfLines={1}
        >
          {lastMsg}
        </Text>
      </View>
      <Text style={[styles.date, { color: activeColors.tint }]}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 12,
    gap: 12,
    alignItems: "center",
    paddingVertical: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  name: {
    fontFamily: "nunitoB",
    fontSize: 15,
  },
  msg: {
    fontFamily: "nunito",
    fontSize: 12.5,
  },
  date: {
    fontFamily: "nunito",
    fontSize: 10,
    position: "absolute",
    right: 10,
    top: 7,
  },
});

export default ChatItem;
