import {
  Appearance,
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
  Text,
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
import DropdownItem from "@/components/DropdownItem";

const ChatsScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [ellipsisOpen, setEllipsisOpen] = useState(false);
  const handleEllipsisOpen = () => {
    setEllipsisOpen(!ellipsisOpen);
  };

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
      onMomentumScrollBegin={() => setEllipsisOpen(false)}
      onAccessibilityTap={() => setEllipsisOpen(false)}
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
              <View style={[defaultStyles.headerIcon, { marginRight: 10 }]}>
                <Image
                  source={require("@/assets/images/camera.png")}
                  style={{ width: 27, height: 27 }}
                  tintColor={activeColors.text}
                />
                <TouchableOpacity onPress={handleEllipsisOpen}>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    color={activeColors.text}
                  />
                </TouchableOpacity>
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
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/screens/message",
                  params: {
                    image: item.imageUrl,
                    name: item.name,
                  },
                })
              }
            >
              <ChatItem
                image={item.imageUrl}
                name={item.name}
                lastMsg={item.lastMsg}
                date={item.date}
              />
            </Pressable>
          </SwipeableRow>
        )}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginBottom: insets.bottom + 140 }}
        showsVerticalScrollIndicator={true}
      />

      {ellipsisOpen && (
        <View
          style={[
            defaultStyles.dropdownCotainer,
            { backgroundColor: activeColors.background },
          ]}
        >
          <DropdownItem onPress={() => {}} text="New group" />
          <DropdownItem onPress={() => {}} text="New broadcast" />
          <DropdownItem onPress={() => {}} text="Linked devices" />
          <DropdownItem onPress={() => {}} text="Starred messages" />
          <DropdownItem onPress={() => {}} text="Settings" />
          <DropdownItem onPress={() => {}} text="Switch accounts" />
        </View>
      )}
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
