import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { computeStreak, getAllItems } from '../storage/tastings';

export default function StatsScreen() {
  const [streak, setStreak] = useState(0);
  const [totals, setTotals] = useState({ tastings: 0, tries: 0 });

  useEffect(() => {
    (async () => {
      const s = await computeStreak();
      const items = await getAllItems();
      const tries = items.reduce((n, it) => n + (it.tries?.length || 0), 0);
      setStreak(s);
      setTotals({ tastings: items.length, tries });
    })();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Stats</Text>
      <Text>Streak idea: consecutive days with any try</Text>
      <Text>Current streak: {streak} days</Text>
      <Text>Total tastings: {totals.tastings}</Text>
      <Text>Total tries: {totals.tries}</Text>
      <Text>Future ideas: most tried items, highest rated items, weekly chart</Text>
    </View>
  );
}


