import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as DropdownMenu from '@zeego/dropdown-menu';

export function MyMenu() {
  return (
    <View style={styles.container}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button title="Open Menu" onPress={() => { }} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          loop={true}
          side="bottom"
          align="center"
          sideOffset={5}
          alignOffset={0}
          avoidCollisions={true}
          collisionTolerance={10}
          style={styles.dropdownContent}
        >
          <DropdownMenu.Label>Options</DropdownMenu.Label>
          <DropdownMenu.Item onSelect={() => alert('Option 1 Selected')}>
            <DropdownMenu.ItemTitle>Option 1</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => alert('Option 2 Selected')}>
            <DropdownMenu.ItemTitle>Option 2</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>

          <DropdownMenu.Separator />

          <DropdownMenu.Item onSelect={() => alert('Option 3 Selected')}>
            <DropdownMenu.ItemTitle>Option 3</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>

          {/* Removed DropdownMenu.Arrow */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export default MyMenu;
