import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { getData, storeData } from "@/config/asyncStorage";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'

// Cache Expo JWT token
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export { ErrorBoundary } from "expo-router";
// export const unstable_settings = { initialRouteName: "screens/welcome" };
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    nunito: require("@/assets/fonts/Nunito-Regular.ttf"),
    nunitoM: require("@/assets/fonts/Nunito-Medium.ttf"),
    nunitoSB: require("@/assets/fonts/Nunito-SemiBold.ttf"),
    nunitoB: require("@/assets/fonts/Nunito-Bold.ttf"),
  });

  const [theme, setTheme] = useState<{ mode: ThemeMode }>({ mode: "system" });

  const updateTheme = (newTheme: { mode?: ThemeMode }) => {
    let mode: ThemeMode;
    if (!newTheme.mode) {
      mode = theme.mode === "dark" ? "light" : "dark";
    } else {
      mode = newTheme.mode;
    }
    setTheme({ mode });
    storeData("appTheme", { mode });
  };

  useEffect(() => {
    const fetchStoredTheme = async () => {
      try {
        const themeData = await getData("appTheme");
        if (themeData && themeData.mode) {
          updateTheme({ mode: themeData.mode });
        } else {
          // Default behavior if no stored theme found
          const systemColorScheme = Appearance.getColorScheme();
          updateTheme({ mode: systemColorScheme as ThemeMode });
        }
      } catch (error) {
        alert(error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    fetchStoredTheme();
  }, []);

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({ mode: colorScheme as ThemeMode });
    });

    return () => listener.remove();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ThemeContext.Provider value={{ mode: theme.mode, updateTheme }}>
          <RootLayoutNav />
          <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
        </ThemeContext.Provider>
        <AuthRedirect />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens/welcome" options={{ headerShown: false }} />
      <Stack.Screen name="screens/otp" options={{ headerShown: false, headerBackVisible: false }} />
      <Stack.Screen name="screens/contact-picker" options={{ headerShown: false, headerBackVisible: false }} />
      <Stack.Screen name="screens/verify" options={{ headerShown: true, headerShadowVisible: false, headerBackVisible: false }} />
    </Stack>
  );
}

function AuthRedirect() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(tabs)";

    if (isSignedIn && !inTabsGroup) {
      // router.replace("(tabs)/chats");
      router.replace("(tabs)/chats");
    } else if (!isSignedIn) {
      // router.replace('screens/welcome');
      router.replace("(tabs)/chats");
    }
  }, [isLoaded, isSignedIn]);

  return null;
}
