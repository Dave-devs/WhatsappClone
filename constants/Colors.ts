import { ThemeMode } from "@/context/ThemeContext";

type ColorScheme = {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  text: string;
  tint: string;
  background: string;
  activeIcon: string;
  inactiveIcon: string;
  senderChip: string;
  receiverChip: string;
  statusIcon: string;
  ellipsis: string;
};

export const Colors: Record<Exclude<ThemeMode, "system">, ColorScheme> = {
  light: {
    primary: "#22c35d",
    secondary: "#c2f8cb",
    tertiary: "#075e54",
    accent: '#f5f3f4',
    text: '#000000',
    tint: "#c3cad5",
    background: '#ffffff',
    activeIcon: '#075e54',
    inactiveIcon: '#000000',
    senderChip: '#b7efc5',
    receiverChip: '#ffffff',
    statusIcon: '#FFFFFF',
    ellipsis: '#f8f9fa'
  },
  dark: {
    primary: "#00e600",
    secondary: "#075E54",
    tertiary: "#d8f3dc",
    accent: '#343a40',
    text: '#FFFFFF',
    tint: "#a5afc0",
    background: '#001219',
    activeIcon: '#d8f3dc',
    inactiveIcon: '#FFFFFF',
    senderChip: '#247b7b',
    receiverChip: '#00171f',
    statusIcon: '#000000',
    ellipsis: '#1b263b'
  },
};