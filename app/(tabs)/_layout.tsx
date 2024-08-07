import { Appearance, StyleSheet, View, Image } from "react-native";
import React, { useContext } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
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
          shadowOpacity: 0,
          borderTopColor: activeColors.background,
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
                <Image
                  source={require("@/assets/images/comment.png")}
                  style={styles.activeIcon}
                  tintColor={activeColors.activeIcon}
                />
              </View>
            ) : (
              <Image
                source={require("@/assets/images/comment-filled.png")}
                style={styles.activeIcon}
                tintColor={activeColors.inactiveIcon}
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
                <Image
                  source={require("@/assets/images/update.png")}
                  style={styles.activeIcon}
                  tintColor={activeColors.activeIcon}
                />
              </View>
            ) : (
              <Image
                source={require("@/assets/images/update-filled.png")}
                style={styles.activeIcon}
                tintColor={activeColors.inactiveIcon}
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
                <Image
                  source={require("@/assets/images/communities.png")}
                  style={styles.activeIcon}
                  tintColor={activeColors.activeIcon}
                />
              </View>
            ) : (
              <Image
                source={require("@/assets/images/communities-filled.png")}
                style={styles.activeIcon}
                tintColor={activeColors.inactiveIcon}
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
                <Image
                  source={require("@/assets/images/call.png")}
                  style={[
                    styles.activeIcon,
                    { maxHeight: 18, maxWidth: 18 },
                  ]}
                  tintColor={activeColors.activeIcon}
                />
              </View>
            ) : (
              <Image
                source={require("@/assets/images/call-filled.png")}
                style={[styles.activeIcon, { maxHeight: 18, maxWidth: 18 }]}
                tintColor={activeColors.inactiveIcon}
              />
            ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeIconBox: {
    height: 30,
    width: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIcon: {
    width: 23,
    height: 23,
    resizeMode: "center",
  },
  activeLabel: {
    fontFamily: "nunito",
    fontSize: 14,
  },
});
