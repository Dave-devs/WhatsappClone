import {
  Appearance,
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import UpdateHeader from "@/components/UpdateHeader";
import ChannelTile from "@/components/ChannelTile";
import channels from "@/assets/data/channels.json";
import Accordion from "@/components/Accordion";
import recentUpdates from "@/assets/data/recent-updates.json";
import viewedUpdates from "@/assets/data/viewed-updates.json";
import mutedUpdates from "@/assets/data/muted-updates.json";

const UpdatesScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Determine active mode based on current theme mode or system appearance
  const { mode, updateTheme } = useContext(ThemeContext);

  const activeMode: ThemeMode =
    mode === "system"
      ? Appearance.getColorScheme() === "dark"
        ? "dark"
        : "light"
      : mode;

  const activeColors = Colors[activeMode];
  const [isDarkMode, setIsDarkMode] = useState(activeMode === "dark");

  // Handle theme toggle
  const switchMode = () => {
    const newMode: ThemeMode = isDarkMode ? "light" : "dark";
    updateTheme({ mode: newMode });
    setIsDarkMode(!isDarkMode);
  };

  // Update toggle state when theme changes externally (e.g., system theme change)
  useEffect(() => {
    setIsDarkMode(mode === "dark");
  }, [mode]);
  return (
    <ScrollView
      style={[
        { backgroundColor: activeColors.background },
        defaultStyles.container,
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Updates",
          headerTitleStyle: {
            ...defaultStyles.headerTextStyle,
            color: activeColors.text,
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: activeColors.background,
          },
          headerRight: () => {
            return (
              <View style={defaultStyles.headerIcon}>
                <Image
                  source={require("@/assets/images/camera.png")}
                  style={{ width: 28, height: 28 }}
                  tintColor={activeColors.text}
                />
                <Fontisto name="search" size={20} color={activeColors.text} />
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={activeColors.text}
                />
              </View>
            );
          },
        }}
      />
      {/* Update Header */}
      <UpdateHeader />
      {/* Recent Status Here */}
      <Accordion
        headerTitle={"Recent updates"}
        status={"recent"}
        data={recentUpdates}
      />
      {/* Viewed Status Here */}
      <Accordion
        headerTitle={"Viewed updates"}
        status={"viewed"}
        data={viewedUpdates}
      />
      {/* Muted Status Here */}
      <Accordion
        headerTitle={"Muted updates"}
        status={"muted"}
        data={mutedUpdates}
      />
      {/* Separator */}
      <View style={[styles.separator, { borderColor: activeColors.tint }]} />
      {/* Channels */}
      <View style={{ marginHorizontal: 15 }}>
        <Text
          style={[defaultStyles.screenTextTitle, { color: activeColors.text }]}
        >
          Channels
        </Text>
        <Text style={[styles.channelDesc, { color: activeColors.tint }]}>
          Stay updated on topics that matter to you. Find channels to follow
          below.
        </Text>
      </View>

      <FlatList
        data={channels}
        renderItem={({ item }) => (
          <ChannelTile id={item.id} name={item.name} imageUrl={item.imageUrl} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Explore more */}
      <View style={[styles.explore, { backgroundColor: activeColors.primary }]}>
        <Text style={[styles.exploreText, { color: activeColors.statusIcon }]}>
          Explore more
        </Text>
      </View>
    </ScrollView>
  );
};

export default UpdatesScreen;

const styles = StyleSheet.create({
  separator: {
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  channelDesc: {
    fontFamily: "nunitoM",
    fontSize: 12,
    flexWrap: "wrap",
    marginTop: 20,
  },
  explore: {
    height: 40,
    width: 120,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  exploreText: {
    fontFamily: "nunitoSB",
    fontSize: 13,
  },
});
