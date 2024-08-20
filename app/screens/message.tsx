import {
  Appearance,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { Swipeable, TextInput } from "react-native-gesture-handler";
import ReplyMessageBar from "@/components/ReplyMessageBar";
import ChatMessageBox from "@/components/ChatMessageBox";

const Message = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const screenWidth = useWindowDimensions().width;
  const insets = useSafeAreaInsets();

  const [ellipsisOpen, setEllipsisOpen] = useState(false);
  const handleEllipsisOpen = () => {
    setEllipsisOpen(!ellipsisOpen);
  };

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState<string>("");
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

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

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: "blue" }}
        renderActions={() => (
          <View
            style={{
              height: 44,
              justifyContent: "center",
              alignItems: "center",
              left: 5,
            }}
          >
            <Ionicons name="add" color={"red"} size={28} />
          </View>
        )}
      />
    );
  };

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  const renderBarr = (props: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 5,
          gap: 8,
          position: "absolute",
          bottom: 4,
          flex: 1
        }}
      >
        {/* TextInput, Emoji, Link, Camera Container  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            backgroundColor: activeColors.background,
            height: 50,
            width: screenWidth - 65,
            borderRadius: 50,
            gap: 10
          }}
        >
          {/* Emoji */}
          <Entypo name="emoji-happy" size={20} color={activeColors.text} />
          {/* TextInput */}
          <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Message"
          style={{color: text.length > 1 ? activeColors.text : 'grey', width: 173, fontFamily: 'nunitoSB',  }}
          numberOfLines={5}
          placeholderTextColor={activeColors.tint}
          />
          {/* Lat Two Icons */}
          <View style={{flexDirection:  "row", alignItems: "center", gap: 15}}>
            <MaterialCommunityIcons name="paperclip" size={20} color={activeColors.text} />
            <Image source={require('@/assets/images/camera.png')} style={[styles.image]} tintColor={activeColors.text} />
          </View>

        </View>

        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: activeColors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {
            text.length > 0 ? (
              <Image source={require('@/assets/images/camera.png')} style={[styles.image]} tintColor={activeColors.text} />
            ) : (
                <Image source={require('@/assets/images/mic.png')} style={[styles.mic]} tintColor={activeColors.background} />
            )
          }
          
        </View>
      </View>
    );
  };

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
              <View style={{paddingBottom: insets.bottom + 5}}>
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
              </View>
            );
          }}
          onPress={handleEllipsisOpen}
          // renderSend={(props) => (
          //   <View
          //     style={[styles.send, { backgroundColor: activeColors.primary }]}
          //   >
          //     {text.length > 1 ? (
          //       // <Send
          //       //   {...props}
          //       //   containerStyle={{
          //       //     justifyContent: "center",
          //       //   }}
          //       // >
          //       //   <Ionicons name="send" size={24} color={activeColors.text} />
          //       // </Send>
          //       <Ionicons name="send" size={24} color={activeColors.text} />
          //     ) : (
          //       // <Image
          //       //   source={require("@/assets/images/mic.png")}
          //       //   style={[styles.mic]}
          //       // />
          //       <Ionicons
          //         name="send"
          //         size={18}
          //         color={activeColors.background}
          //       />
          //     )}
          //   </View>
          // )}
          renderInputToolbar={renderBarr}
          renderChatFooter={() => (
            <ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage} />
          )}
          onLongPress={(context, message) => setReplyMessage(message)}
          renderMessage={(props) => (
            <ChatMessageBox
              {...props}
              setReplyOnSwipeOpen={setReplyMessage}
              updateRowRef={updateRowRef}
            />
          )}
        />

        {ellipsisOpen && (
          <View
            style={[
              defaultStyles.dropdownCotainer,
              { backgroundColor: activeColors.background },
            ]}
          >
            <DropdownItem onPress={() => {}} text="Add to contacts" />
            <DropdownItem onPress={() => {}} text="Media, links, and docs" />
            <DropdownItem onPress={() => {}} text="Search" />
            <DropdownItem onPress={() => {}} text="Mute notifications" />
            <DropdownItem onPress={() => {}} text="Disappearing messages" />
            <DropdownItem onPress={() => {}} text="Wallpaper" />
            <DropdownItem onPress={() => {}} text="More" />
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
  send: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 24,
    width: 24,
  },
  mic: {
    height: 18,
    width: 18
  },
  composer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'lightGrey',
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
});
