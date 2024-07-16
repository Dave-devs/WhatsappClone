import React from "react";
import { Tabs } from "expo-router";
import {
  AntDesign,
} from "@expo/vector-icons";

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <AntDesign name='arrowdown' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
