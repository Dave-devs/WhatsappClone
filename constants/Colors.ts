import { ThemeMode } from "@/context/ThemeContext";

type ColorScheme = {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  text: string;
  tint: string;
  background: string;
};

export const Colors: Record<Exclude<ThemeMode, "system">, ColorScheme> = {
  light: {
    primary: "#25D366",
    secondary: "#c2f8cb",
    tertiary: "#075e54",
    accent: '#f5f3f4',
    text: '#020202',
    tint: "#c7ccdb",
    background: '#ffffff'
  },
  dark: {
    primary: "#25D366",
    secondary: "#075E54",
    tertiary: "#d8f3dc",
    accent: '#495057',
    text: '#FFFFFF',
    tint: "#adb5bd",
    background: '#273443'
  },
};