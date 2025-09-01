import React from 'react';
import { View, Text } from 'react-native';

export default function FriendsScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Friends</Text>
      <Text>Coming soon, lightweight social</Text>
      <Text>Planned: friend list, simple activity feed, emoji reactions</Text>
    </View>
  );
}


