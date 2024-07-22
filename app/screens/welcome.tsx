import {
  Appearance,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "@/components/CustomComponets/Button";

const WelcomeScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { mode } = useContext(ThemeContext);
  let activeMode: "light" | "dark";

  if (mode === "system") {
    activeMode = Appearance.getColorScheme() === "dark" ? "dark" : "light";
  } else {
    activeMode = mode;
  }

  const activeColors = Colors[activeMode];

  const openPrivacyUrl = () => {
    Linking.openURL("https://www.whatsapp.com/legal/privacy-policy?lg=en&lc=US");
  };
  const openTermsUrl = () => {
    Linking.openURL("https://www.whatsapp.com/legal/terms-of-service?lg=en&lc=US");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: activeColors.background,
        paddingTop: insets.top,
      }}
    >
      {/* WhatsApp Welcome Image */}
      <View style={styles.imageBox}>
        <Image
          source={require("@/assets/images/welcome.png")}
          style={styles.image}
        />
      </View>
      {/* WhatsApp Welcome Texts */}
      <View style={styles.textBox}>
        <Text style={[{ color: activeColors.text }, styles.text]}>
          Welcome to WhatsApp
        </Text>
        <Text style={[{ color: activeColors.tint }, styles.subTitle]}>
          Read our{" "}
          <Text onPress={openPrivacyUrl} style={{ color: "#00bbf9" }}>
            Privacy Policy
          </Text>
          . Tap "Agree and continue" to accept the{" "}
          <Text onPress={openTermsUrl} style={{ color: "#00bbf9" }}>
            Terms of Service
          </Text>
          .
        </Text>
      </View>
      {/* Language Selection Chip */}
      <View style={[styles.chip, {backgroundColor: activeColors.accent}]}>
        <SimpleLineIcons name="globe" size={24} color={activeColors.primary} />
        <Text style={[{ color: activeColors.primary }, styles.chipText]}>English</Text>
        <Feather name="chevron-down" size={24} color={activeColors.primary} />
      </View>

      <View style={{flex: 1}}/>

      {/* Agree Button */}
      <Button text="Agree and continue" onPress={() => router.replace('screens/otp')} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  imageBox: {
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 340,
    height: 340,
    resizeMode: "cover",
  },
  textBox: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "nunitoSB",
    fontSize: 25,
  },
  subTitle: {
    fontFamily: "nunito",
    fontSize: 12,
    textAlign: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    gap: 15,
    marginTop: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 50
  },
  chipText: {
    fontFamily: "nunito",
    fontSize: 12,
  }
});