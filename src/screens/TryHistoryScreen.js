// src/screens/TryHistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getItem } from '../storage/tastings';

export default function TryHistoryScreen({ route }) {
  const { id } = route.params;
  const [dates, setDates] = useState([]);

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
