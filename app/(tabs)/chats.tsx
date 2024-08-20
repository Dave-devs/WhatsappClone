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
import { AntDesign, Ionicons } from "@expo/vector-icons";
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
    <>
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
          showsVerticalScrollIndicator={true}
        />

        {ellipsisOpen && (
          <View
            style={[
              defaultStyles.dropdownCotainer,
              { backgroundColor: activeColors.background },
            ]}
          >
            <DropdownItem onPress={() => { }} text="New group" />
            <DropdownItem onPress={() => { }} text="New broadcast" />
            <DropdownItem onPress={() => { }} text="Linked devices" />
            <DropdownItem onPress={() => { }} text="Starred messages" />
            <DropdownItem onPress={() => { }} text="Settings" />
            <DropdownItem onPress={() => { }} text="Switch accounts" />
          </View>
        )}
        <View style={[styles.separator, { borderColor: activeColors.tint }]} />

        <View
          style={[styles.textContainer, { marginBottom: insets.bottom + 120 }]}
        >
          <AntDesign name="lock" size={13} color={activeColors.text} />
          <Text style={[styles.text, { color: activeColors.tint }]}>
            Your personal messages are{" "}
            <Text style={{ color: activeColors.primary }}>
              end-to-end encrypted
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* FAB */}
      <View style={[styles.fabContainer, {backgroundColor: activeColors.primary}]}>
        <TouchableOpacity onPress={() => { }}>
          <Image
            source={require("@/assets/images/message.png")}
            style={styles.fab}
            tintColor={activeColors.background}
          />
        </TouchableOpacity>
      </View>
    </>
    
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  separator: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  text: {
    fontFamily: "nunito",
    fontSize: 11,
  },
  fabContainer: {
    height: 58,
    width: 58,
    position: "absolute",
    bottom: 20,
    right: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    height: 26,
    width: 26,
  },
});
