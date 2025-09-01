import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';
import databaseHelper from '../database/DatabaseHelper';

export default function SettingsScreen() {
  const [dbInfo, setDbInfo] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDatabaseInfo();
  }, []);

  const loadDatabaseInfo = async () => {
    try {
      const info = databaseHelper.getDatabaseInfo();
      const statistics = await databaseHelper.getDatabaseStats();
      setDbInfo(info);
      setStats(statistics);
    } catch (error) {
      console.error('Error loading database info:', error);
    }
  };

  const clearDatabase = async () => {
    Alert.alert(
      'Clear Database',
      'This will delete all your tastings and events. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseHelper.clearAllData();
              await loadDatabaseInfo();
              Alert.alert('Success', 'Database cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear database: ' + error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Settings</Text>
      
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Database Status</Text>
        {dbInfo && (
          <View style={{ backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8 }}>
            <Text>Initialized: {dbInfo.isInitialized ? '✅' : '❌'}</Text>
            <Text>Storage Type: {dbInfo.storageType}</Text>
            <Text>Keys: {dbInfo.keys.join(', ')}</Text>
          </View>
        )}
      </View>

      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Database Statistics</Text>
        {stats && (
          <View style={{ backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8 }}>
            <Text>Total Items: {stats.totalItems}</Text>
            <Text>Total Events: {stats.totalEvents}</Text>
          </View>
        )}
      </View>

      <View style={{ gap: 12 }}>
        <Button title="Refresh Database Info" onPress={loadDatabaseInfo} />
        <Button title="Clear Database (Dev Only)" onPress={clearDatabase} color="red" />
      </View>

      <View style={{ marginTop: 32, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#ddd' }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Coming Soon</Text>
        <Text>• Default sort preferences</Text>
        <Text>• Default category filter</Text>
        <Text>• Export/Import data</Text>
        <Text>• Backup to cloud storage</Text>
      </View>
    </ScrollView>
  );
}


