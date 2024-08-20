import { Colors } from "@/constants/Colors";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { View, TouchableOpacity, Text, Appearance } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
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

  return (
    <>
      {message !== null && (
        <Animated.View
          style={{
            height: 70,
            flexDirection: "row",
            backgroundColor: "#E4E9EB",
            marginBottom: 20,
            alignItems: 'center'
          }}
          entering={FadeInDown}
          exiting={FadeOutDown}
        >
          <View
            style={{
              height: 70,
              width: 6,
              backgroundColor: activeColors.primary,
            }}
          ></View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: activeColors.primary,
                paddingLeft: 10,
                paddingTop: 5,
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              {message?.user.name}
            </Text>
            <Text style={{ color: "grey", paddingLeft: 10, paddingTop: 5 }}>
              {message!.text.length > 40
                ? message?.text.substring(0, 40) + "..."
                : message?.text}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 10,
            }}
          >
            <TouchableOpacity onPress={clearReply}>
              <Ionicons name="close-circle-outline" color={activeColors.background} size={28} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default ReplyMessageBar;
