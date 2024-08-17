import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Appearance,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { FontAwesome6 } from "@expo/vector-icons";

const UpdateHeader = () => {
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
    <View style={styles.container}>
      <Text style={[styles.screenTextTitle, { color: activeColors.text }]}>
        Status
      </Text>
      <View style={styles.headerStyle}>
        {/* Box 1 and 2 */}
        <View>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPCkWOkCF3wrLkCCN02_IkJYF9bCuXsw9Gw&s",
            }}
            style={[styles.imageBox, { backgroundColor: activeColors.tint }]}
          />
          <View
            style={[styles.iconBox, { backgroundColor: activeColors.text }]}
          >
            <View
              style={[styles.icon, { backgroundColor: activeColors.primary }]}
            >
              <FontAwesome6 name="plus" size={15} color={activeColors.text} />
            </View>
          </View>
        </View>
        {/* Text 1 and 2 */}
        <View style={defaultStyles.container}>
          <Text style={[styles.screenStatusText, { color: activeColors.text }]}>
            My status
          </Text>
          <Text style={[styles.screenStatusText, { color: activeColors.tint }]}>
            Tap to add status update
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 15
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  imageBox: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  iconBox: {
    height: 24,
    width: 24,
    borderRadius: 50,
    position: "absolute",
    right: -2,
    bottom: -2,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 22,
    width: 22,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  screenTextTitle: {
    fontFamily: "nunitoB",
    fontSize: 16,
  },
  screenStatusText: {
    fontFamily: "nunitoB",
    fontSize: 14.5,
  },
});

export default UpdateHeader;
