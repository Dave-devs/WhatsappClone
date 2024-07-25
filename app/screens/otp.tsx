import {
  ActivityIndicator,
  Alert,
  Appearance,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@/components/CustomComponets/Button";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";

const OtpScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const params = useLocalSearchParams<{ phoneNumber: string }>();

  useEffect(() => {
    if (params.phoneNumber) {
      try {
        const parsedPhoneNumber = JSON.parse(params.phoneNumber);
        setPhoneNumber(parsedPhoneNumber);
      } catch (error) {
        Alert.alert("Error", "Failed to parse phone number");
      }
    }
  }, [params.phoneNumber]);

  const trySignIn = async () => {
    console.log('trySignIn', phoneNumber);

    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
      return factor.strategy === 'phone_code';
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: 'phone_code',
      phoneNumberId,
    });

    router.push({
      pathname: "screens/verify",
      params: {
        phoneNumber: phoneNumber,
        signin: "true",
      },
    });
    setLoading(false);
  };

  const sendOtp = async () => {
    console.log("Sending OTP", phoneNumber);
    setLoading(true);

    try {
      await signUp!.create({ phoneNumber });

      console.log("TESafter createT: ", signUp!.createdSessionId);
      signUp!.preparePhoneNumberVerification();

      console.log("after prepare: ");
      router.push({
        pathname: "screens/verify",
        params: {
          phoneNumber: phoneNumber,
        },
      });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === "form_identifier_exists") {
          console.log("User already exists");
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert("Error", err.errors[0].message);
        }
      }
    }
  };

  // Theme
  const { mode } = useContext(ThemeContext);
  let activeMode: "light" | "dark";

  if (mode === "system") {
    activeMode = Appearance.getColorScheme() === "dark" ? "dark" : "light";
  } else {
    activeMode = mode;
  }

  const activeColors = Colors[activeMode];

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: activeColors.background,
        paddingTop: insets.top,
      }}
    >
      {loading && (
        <View
          style={[styles.loading, { backgroundColor: activeColors.background }]}
        >
          <ActivityIndicator size={"large"} color={activeColors.primary} />
          <Text style={[{color: activeColors.text}, styles.loadingText]}>Sending code...</Text>
        </View>
      )}
      <View style={styles.headerBox}>
        <Text style={[styles.headerText, { color: activeColors.text }]}>
          Enter your phone number
        </Text>
        <Ionicons
          name="ellipsis-vertical"
          size={20}
          color={activeColors.tint}
        />
      </View>
      {/* Header SubText */}
      <View style={styles.subTextBox}>
        <Text style={[styles.headerSubText, { color: activeColors.text }]}>
          WhatsApp will need to verify your phone number. Carrier charges may
          apply.{" "}
          <Text
            onPress={() => router.push("screens/contact-picker")}
            style={{ color: "#00bbf9" }}
          >
            What's my number?
          </Text>
        </Text>
      </View>

      {/* Phone Input */}
      <View style={styles.textInput}>
        {/* Country Box */}
        <View style={styles.countryBox}>
          <Text style={[{ color: activeColors.text }, styles.countryText]}>
            Nigeria
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={activeColors.primary}
          />
        </View>
        {/* Separator */}
        <View
          style={[{ borderBlockColor: activeColors.primary }, styles.separator]}
        />
        <View style={styles.textInputBox}>
          {/* Country Code */}
          <View style={{ flex: 1, paddingTop: 20 }}>
            <Text style={styles.countryCode}>
              + <Text style={{ color: activeColors.text }}>234</Text>
            </Text>
            <View
              style={[
                { borderBlockColor: activeColors.primary },
                styles.separator,
              ]}
            />
          </View>

          {/* Phone Number Input */}
          <View style={{ flex: 3, paddingTop: 20 - 2 }}>
            <TextInput
              placeholder="Phone number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              numberOfLines={1}
              placeholderTextColor={activeColors.tint}
              focusable={true}
              style={[{ color: activeColors.text }, styles.phoneNumber]}
              keyboardType="number-pad"
            />
            <View
              style={[
                { borderBlockColor: activeColors.primary },
                styles.separator,
              ]}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Agree Button */}
      <Button text="Next" onPress={sendOtp} />
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    paddingTop: 10,
  },
  headerText: {
    flex: 1,
    fontFamily: "nunitoSB",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "center",
  },
  subTextBox: {
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerSubText: {
    fontFamily: "nunito",
    fontSize: 13,
    textAlign: "center",
  },
  textInputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  textInput: {
    marginHorizontal: 40,
    marginTop: 40,
    width: "auto",
  },
  countryBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  countryText: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "nunitoSB",
    fontSize: 15,
  },
  separator: {
    borderBottomWidth: 1,
  },
  countryCode: {
    fontFamily: "nunitoSB",
    fontSize: 15,
    color: 'grey'
  },
  phoneNumber: {
    fontFamily: "nunitoSB",
    fontSize: 15,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10
  },
  loadingText: {
    fontFamily: "nunito",
    fontSize: 15,
  }
});
