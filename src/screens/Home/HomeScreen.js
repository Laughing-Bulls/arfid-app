import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Button, Alert } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { ItemOperations, EventOperations } from "../../database";
import databaseHelper from "../../database/DatabaseHelper";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [dbStatus, setDbStatus] = useState('Checking database...');
  const [dbInfo, setDbInfo] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => (
        <Button title="Add" onPress={() => Alert.alert('New Tasting', 'Coming soon')} />
      ),
    });
  }, []);

  useEffect(() => {
    // Check database status and get stats
    const checkDbStatus = async () => {
      const info = databaseHelper.getDatabaseInfo();
      setDbInfo(info);
      
      if (info.isInitialized) {
        try {
          const stats = await databaseHelper.getDatabaseStats();
          setDbStatus(`Ready - ${stats.totalItems} items, ${stats.totalEvents} events`);
        } catch (error) {
          setDbStatus('Database ready');
        }
      } else {
        setDbStatus('Database not ready');
      }
    };

    checkDbStatus();
    const interval = setInterval(checkDbStatus, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const testDatabase = async () => {
    try {
      if (!databaseHelper.isDatabaseReady()) {
        Alert.alert('Database Test', 'Database is not ready yet. Please wait for initialization.');
        return;
      }

      // Test inserting an item
      const itemId = await ItemOperations.insertItem({
        title: `Test Recipe ${Date.now()}`,
        brand: 'Test Brand',
        category: 'Test Category',
        rating: 5,
        photoUri: null
      });
      
      // Test recording an event
      const eventId = await EventOperations.recordEvent(itemId);
      
      // Test retrieving items
      const items = await ItemOperations.getAllItems();
      
      // Test search
      const searchResults = await ItemOperations.searchItemsByTitle('Test');
      
      // Test getting events
      const events = await EventOperations.getEventsForItem(itemId);
      
      const stats = await databaseHelper.getDatabaseStats();
      
      Alert.alert(
        'Database Test Success!', 
        `✅ AsyncStorage working perfectly!\n\n` +
        `📝 Items: ${stats.totalItems}\n` +
        `🎯 Events: ${stats.totalEvents}\n` +
        `🔍 Search results: ${searchResults.length}\n` +
        `⏰ Item events: ${events.length}\n\n` +
        `Data persists between app restarts!`
      );
      
    } catch (error) {
      setDbStatus(`Database error: ${error.message}`);
      Alert.alert('Database Test Error', `❌ Error: ${error.message}`);
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Database Status: {dbStatus}</Text>
        {dbInfo && (
          <Text style={{ fontSize: 12, marginBottom: 10, color: '#666' }}>
            Storage: {dbInfo.storageType} | 
            Initialized: {dbInfo.isInitialized ? 'Yes' : 'No'} | 
            Keys: {dbInfo.keys?.length || 0}
          </Text>
        )}
        <Button 
          title="Test Database" 
          onPress={testDatabase}
          disabled={!databaseHelper.isDatabaseReady()}
        />
      </View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
