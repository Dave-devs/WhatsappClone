import {
  Appearance,
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "@/components/SearchBar";
import ChatItem from "@/components/ChatItem";
import chats from "@/assets/data/chats.json";
import * as Haptics from "expo-haptics";
import SwipeableRow from "@/components/SwipeableRow";

const ChatsScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { mode, updateTheme } = useContext(ThemeContext);
  // Determine active mode based on current theme mode or system appearance
  const activeMode: ThemeMode =
    mode === "system"
      ? Appearance.getColorScheme() === "dark"
        ? "dark"
        : "light"
      : mode;

  const activeColors = Colors[activeMode];

  const [items, setItem] = useState(chats);

  const deleteChat = (idToRemove: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setItem(items.filter((chat: { id: any }) => chat.id !== idToRemove.id));
  };

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
          headerTitle: "WhatsApp",
          headerTitleStyle: {
            ...defaultStyles.headerTextStyle,
            color: activeColors.text,
          },
          headerRight: () => {
            return (
              <View style={defaultStyles.headerIcon}>
                <Image
                  source={require("@/assets/images/camera.png")}
                  style={{ width: 27, height: 27 }}
                  tintColor={activeColors.text}
                />
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={activeColors.text}
                />
              </View>
            );
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: activeColors.background,
          },
        }}
      />
      {/* Search Bar */}
      <SearchBar />
      {/* Chats */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <SwipeableRow onDelete={() => deleteChat(item)}>
            <ChatItem
              image={item.imageUrl}
              name={item.name}
              lastMsg={item.lastMsg}
              date={item.date}
            />
          </SwipeableRow>
        )}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginBottom: insets.bottom + 140 }}
      />
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginRight: 10,
    alignContent: "center",
  },
});
