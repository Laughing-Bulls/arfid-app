// src/screens/TryHistoryScreen.js
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getItem } from '../storage/tastings';
import BackButton from '../components/BackButton/BackButton';

export default function TryHistoryScreen({ route, navigation }) {
  const { id } = route.params;
  const [dates, setDates] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const it = await getItem(id);
      const arr = (it?.tries || []).slice().sort().reverse(); // newest first
      if (mounted) setDates(arr);
    })();
    return () => { mounted = false; };
  }, [id]);

  const renderRow = ({ item }) => {
    const d = new Date(item);
    return (
      <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
        <Text style={{ fontSize: 16 }}>{d.toLocaleDateString()}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={dates}
        keyExtractor={(iso) => iso}
        renderItem={renderRow}
        ListEmptyComponent={<Text>No tries yet</Text>}
      />
    </View>
  );
}
