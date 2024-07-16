import { createContext } from "react";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
  mode: ThemeMode;
  updateTheme: (newTheme: { mode?: ThemeMode }) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  updateTheme: () => {},
});