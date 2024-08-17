import { View, Text, StyleSheet, Appearance, Image } from "react-native";
import React, { useContext } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

type ChannelProps = {
  id: string;
  name: string;
  imageUrl: string;
};

const ChannelTile = ({id, name, imageUrl}: ChannelProps) => {
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
    <View key={id} style={[styles.channelContainer, { borderColor: activeColors.tint }]}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={[styles.bigBox, { backgroundColor: activeColors.secondary }]}
        />
        <View
          style={[
            styles.smallBox,
            { backgroundColor: activeColors.statusIcon },
          ]}
        >
          <Image
            source={require("@/assets/images/checklist.png")}
            style={{ height: 21, width: 21 }}
          />
        </View>
      </View>
      <Text style={[styles.text, { color: activeColors.text }]}>{name}</Text>
      <View
        style={[styles.btnBox, { backgroundColor: activeColors.secondary }]}
      >
        <Text style={[styles.btnText, { color: activeColors.activeIcon }]}>
          Follow
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  channelContainer: {
    height: 180,
    width: 135,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    marginLeft: 10,
    marginTop: 20,
    padding: 10,
    justifyContent: "space-evenly",
  },
  btnBox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingVertical: 8,
  },
  text: {
    fontFamily: "nunitoM",
    fontSize: 14,
    textAlign: "center",
  },
  btnText: {
    fontFamily: "nunitoM",
    fontSize: 13,
  },
  bigBox: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  smallBox: {
    height: 25,
    width: 25,
    borderRadius: 50,
    position: "absolute",
    right: 21,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChannelTile;
