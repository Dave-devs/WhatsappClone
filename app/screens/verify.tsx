import {
  Alert,
  Appearance,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";

const CELL_COUNT = 6;

const VerifyScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { phoneNumber, signin } = useLocalSearchParams<{
    phoneNumber: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  useEffect(() => {
    if (code.length === 6) {
      console.log("verify", code);

      if (signin === "true") {
        console.log("signin");
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      });
      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });
      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const resendCode = async () => {
    try {
      if (signin === "true") {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: phoneNumber!,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          }
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });
      } else {
        await signUp!.create({
          phoneNumber: phoneNumber,
        });
        signUp!.preparePhoneNumberVerification();
      }
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
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
    <View
      style={{
        flex: 1,
        backgroundColor: activeColors.background,
        paddingTop: insets.top,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: phoneNumber,
          headerTitleStyle: {
            color: activeColors.text,
            fontFamily: "nunitoSB",
            fontSize: 15,
          },
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerStyle: { backgroundColor: activeColors.background },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <Text
                  style={{
                    color: activeColors.text,
                    fontFamily: "nunitoSB",
                    fontSize: 15,
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      {/* Heading Text */}
      <Text style={[styles.headerText, { color: activeColors.text }]}>
        We have sent you an SMS with a code the number above.
      </Text>
      {/* Code Input */}
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              styles.cellRoot,
              isFocused && styles.focusCell,
              { borderBottomColor: activeColors.primary },
            ]}
          >
            <Text style={[{ color: activeColors.text }, styles.cellText]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      {/* SubHeader Text */}
      <Text style={[styles.subHeaderText, { color: activeColors.text }]}>
        To complete your phone number verification, please enter the 6-digit
        activation code.
      </Text>

      <View style={{ flex: 1 }} />

      <View style={[{ marginBottom: insets.bottom }, styles.resenBtn]}>
        <Text style={[styles.btn, { color: activeColors.text }]}>
          Don't receive the code?
        </Text>
        <TouchableOpacity onPress={resendCode}>
          <Text style={[styles.btn, { color: activeColors.primary }]}>
            Resend
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "nunitoM",
    fontSize: 13,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 15,
  },
  subHeaderText: {
    fontFamily: "nunitoM",
    fontSize: 13,
    marginHorizontal: 15,
    textAlign: "center",
    marginTop: 15,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 4,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  cellText: {
    fontFamily: "nunitoSB",
    fontSize: 23,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 4,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
  resenBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 40,
  },
  btn: {
    fontFamily: "nunitoM",
    fontSize: 13,
  },
});
