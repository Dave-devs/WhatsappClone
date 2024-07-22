import {
  Alert,
  Appearance,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as Contacts from "expo-contacts";
import { ThemeContext } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Contact {
  id: string;
  name: string;
  phoneNumbers: { number: string }[];
}

const ContactPicker = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        const phoneContacts = data.filter(
          (contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0
        ) as Contact[];
        setContacts(phoneContacts);
      } else {
        Alert.alert(
          "Permission denied",
          "Cannot access contacts without permission"
        );
      }
    })();
  }, []);

  const handleContactPress = (contact: any) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      const phoneNumber = contact.phoneNumbers[0].number;
      router.replace({
        pathname: "screens/otp",
        params: { phoneNumber: JSON.stringify(phoneNumber) },
      });
    } else {
      Alert.alert(
        "No phone number",
        "This contact does not have a phone number"
      );
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
      style={[
        {
          backgroundColor: activeColors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        styles.container,
      ]}
    >
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleContactPress(item)}
            style={{ paddingVertical: 10 }}
          >
            <Text style={[{ color: activeColors.text }, styles.text]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ContactPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'nunito',
    fontSize: 14,
  }
});
