import {
  Appearance,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
  BubbleProps,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import messageData from "@/assets/data/messages.json";
import DropdownItem from "@/components/DropdownItem";

const Message = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [ellipsisOpen, setEllipsisOpen] = useState(false);
  const handleEllipsisOpen = () => {
    setEllipsisOpen(!ellipsisOpen);
  };

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? "You" : "Bob",
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: "All your base are belong to us",
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Bot",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

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
    <View
      style={[
        defaultStyles.container,
        { backgroundColor: activeColors.background },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => {
            return (
              <View style={styles.headerContainer}>
                {/* Image */}
                <Image
                  source={{ uri: `${params.image}` }}
                  style={styles.headerImage}
                />
                {/* Name */}
                <Text style={[styles.headerName, { color: activeColors.text }]}>
                  {params.name}
                </Text>
              </View>
            );
          },
          headerTitleStyle: {
            ...defaultStyles.headerTextStyle,
            color: activeColors.text,
          },
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: activeColors.background,
          },
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="arrow-back-outline"
                  size={24}
                  color={activeColors.text}
                />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <View style={defaultStyles.headerIcon}>
                <Image
                  source={require("@/assets/images/call.png")}
                  style={{ width: 20, height: 20 }}
                  tintColor={activeColors.text}
                />
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
        }}
      />
      <ImageBackground
        source={require("@/assets/images/chat-bg.png")}
        style={{
          flex: 1,
          marginBottom: insets.bottom,
          backgroundColor: activeColors.background,
        }}
        onAccessibilityTap={() => setEllipsisOpen(!ellipsisOpen)}
      >
        
          <GiftedChat
            messages={messages}
            onSend={(messages: any) => onSend(messages)}
            user={{
              _id: 1,
            }}
            renderAvatar={() => null}
            renderBubble={(props: Readonly<BubbleProps<IMessage>>) => {
              return (
                <Bubble
                  {...props}
                  textStyle={{
                    right: {
                      color: activeColors.text,
                    },
                    left: {
                      color: activeColors.text,
                    },
                  }}
                  wrapperStyle={{
                    left: {
                      backgroundColor: activeColors.receiverChip,
                    },
                    right: {
                      backgroundColor: activeColors.senderChip,
                    },
                  }}
                />
              );
            }}
          // renderMessage={(props) => {
          //   return (
          //     <View {...props}>

          //     </View>
          //   )
          // }}
          onPress={handleEllipsisOpen}
          />

          {ellipsisOpen && (
            <View
              style={[
                defaultStyles.dropdownCotainer,
                { backgroundColor: activeColors.background },
              ]}
            >
              <DropdownItem onPress={() => { }} text="Add to contacts" />
              <DropdownItem onPress={() => { }} text="Media, links, and docs" />
              <DropdownItem onPress={() => { }} text="Search" />
              <DropdownItem onPress={() => { }} text="Mute notifications" />
              <DropdownItem onPress={() => { }} text="Disappearing messages" />
              <DropdownItem onPress={() => { }} text="Wallpaper" />
              <DropdownItem onPress={() => { }} text="More" />
            </View>
          )}
      </ImageBackground>
      
    </View>
  );
};

export default Message;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
    marginLeft: 10,
  },
  headerName: {
    fontFamily: "nunitoSB",
    fontSize: 18,
    flex: 1,
  },
  headerImage: {
    width: 38,
    height: 38,
    borderRadius: 50,
    resizeMode: "cover",
    backgroundColor: "red",
  },
});
