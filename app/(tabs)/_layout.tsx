import { Appearance, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function _layout() {
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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColors.activeIcon,
        headerShown: false,
        tabBarStyle: {
          height: 55,
          elevation: 0,
          backgroundColor: activeColors.background,
        },
        tabBarLabelStyle: {
          fontFamily: "nunitoB",
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,
          tabBarLabel: "Chats",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={[
                  { backgroundColor: activeColors.secondary },
                  styles.activeIconBox,
                ]}
              >
                <MaterialCommunityIcons
                  name="message-reply-text"
                  size={24}
                  color={activeColors.activeIcon}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                name="message-reply-text"
                size={24}
                color={activeColors.inactiveIcon}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          headerShown: false,
          tabBarLabel: "Updates",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={[
                  { backgroundColor: activeColors.secondary },
                  styles.activeIconBox,
                ]}
              >
                <FontAwesome
                  name="whatsapp"
                  size={24}
                  color={activeColors.activeIcon}
                />
              </View>
            ) : (
              <FontAwesome
                name="whatsapp"
                size={24}
                color={activeColors.inactiveIcon}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          headerShown: false,
          tabBarLabel: "Communities",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={[
                  { backgroundColor: activeColors.secondary },
                  styles.activeIconBox,
                ]}
              >
                <FontAwesome5
                  name="users"
                  size={24}
                  color={activeColors.inactiveIcon}
                />
              </View>
            ) : (
              <FontAwesome5
                name="users"
                size={24}
                color={activeColors.inactiveIcon}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          headerShown: false,
          tabBarLabel: "Calls",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={[
                  { backgroundColor: activeColors.secondary },
                  styles.activeIconBox,
                ]}
              >
                <Ionicons
                  name="call"
                  size={20}
                  color={activeColors.activeIcon}
                />
              </View>
            ) : (
              <Ionicons
                name="call"
                size={20}
                color={activeColors.inactiveIcon}
              />
            ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeIconBox: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 1,
    alignContent: "center",
  },
  activeIcon: {
    width: 24,
    height: 24,
  },
  activeLabel: {
    fontFamily: "nunito",
    fontSize: 14,
  },
});
