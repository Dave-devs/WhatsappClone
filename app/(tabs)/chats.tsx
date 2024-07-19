import { Appearance, Platform, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext, ThemeMode } from '@/context/ThemeContext';
import CustomContainer from '@/components/CustomComponets/CustomContainer';
import CustomText from '@/components/CustomComponets/CustomText';
import { Colors } from '@/constants/Colors';


const ChatsScreen = () => {
  const { mode, updateTheme } = useContext(ThemeContext);

  // Determine active mode based on current theme mode or system appearance
  const activeMode: ThemeMode = mode === "system"
    ? (Appearance.getColorScheme() === "dark" ? "dark" : "light")
    : mode;

  const activeColors = Colors[activeMode];
  const [isDarkMode, setIsDarkMode] = useState(activeMode === "dark");
  // Handle theme toggle
  const switchMode = () => {
    const newMode: ThemeMode = isDarkMode ? "light" : "dark";
    updateTheme({ mode: newMode });
    setIsDarkMode(!isDarkMode);
  };

  // Update toggle state when theme changes externally (e.g., system theme change)
  useEffect(() => {
    setIsDarkMode(mode === "dark");
  }, [mode]);

  return (
   <View style={[{ backgroundColor: activeColors.background }, styles.container]}>
    <Text style={{ color: activeColors.text }}>Chats</Text>
   </View>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
