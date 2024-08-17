import {
  Appearance,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext, ThemeMode } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";
import UpdatesItem from "./UpdatesItem";

type AccordionProps = {
  headerTitle: string;
  data: any;
  status: string;
};

const Accordion = ({ headerTitle, data, status }: AccordionProps) => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const animation = useSharedValue(0);

    const toggleAccordion = () => {
      setAccordionOpen(!accordionOpen);
      animation.value = withTiming(accordionOpen ? 0 : 1, { duration: 300 });
    };

    const animatedStyle = useAnimatedStyle(() => {
      const height = interpolate(animation.value, [0, 1], [0, 250]);
      const opacity = animation.value;
      return {
        height,
        opacity,
      };
    });

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
    <View style={styles.container}>
        {/* Header Components */}
      <Pressable style={[styles.headerContainer]} onPress={toggleAccordion}>
        <Text style={[styles.headerTitle, { color: activeColors.tint }]}>
          {headerTitle}
        </Text>
        <Entypo
          name={accordionOpen ? "chevron-small-up" : "chevron-small-down"}
          size={24}
          color={activeColors.tint}
        />
      </Pressable>
      {/* Content Component */}
      <Animated.View style={[animatedStyle, { overflow: "hidden", }]}>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <UpdatesItem
                image={item.status[0].image}
                name={item.name}
                date={item.status[0].date}
                status={status}
              />
            )}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: "nunitoB",
    fontSize: 13,
  },
});

