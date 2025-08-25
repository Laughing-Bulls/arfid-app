import React, { useLayoutEffect, useState, useEffect, useCallback } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Button, Alert, TextInput, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { ItemOperations, EventOperations } from "../../database";
import databaseHelper from "../../database/DatabaseHelper";
import { queryItems, computeStreak } from "../../storage/tastings";
import { CATEGORY_OPTIONS } from "../../constants/categories";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [dbStatus, setDbStatus] = useState('Checking database...');
  const [dbInfo, setDbInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [streak, setStreak] = useState(0);
  
  // Search, sort, and filter state
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest'); // 'newest', 'rating', 'title'
  const [category, setCategory] = useState('');
  const [searchDebounceTimer, setSearchDebounceTimer] = useState(null);

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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#666' }}>
            Streak: {streak} days
          </Text>
          <Button title="Add" onPress={() => navigation.navigate('AddTasting')} />
        </View>
      ),
    });
  }, [streak]);

  // Load data function
  const loadData = useCallback(async () => {
    try {
      const data = await queryItems({ search, category, sort });
      const s = await computeStreak();
      setItems(data);
      setStreak(s);
    } catch (error) {
      console.error('Error loading data:', error);
      setItems([]);
      setStreak(0);
    }
  }, [search, category, sort]);

  // Load items and streak when screen gains focus
  useFocusEffect(useCallback(() => {
    loadData();
  }, [loadData]));

  // Debounced search handler
  const handleSearchChange = useCallback((text) => {
    setSearch(text);
    
    // Clear existing timer
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }
    
    // Set new timer for debounced search
    const timer = setTimeout(() => {
      // loadData will be called automatically due to useCallback dependency
    }, 250);
    
    setSearchDebounceTimer(timer);
  }, [searchDebounceTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }
    };
  }, [searchDebounceTimer]);

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

  const onPressItem = (item) => {
    console.log('Clicked item:', { id: item.id, title: item.title });
    navigation.navigate("Recipe", { item });
  };

  const renderItems = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressItem(item)}>
      <View style={styles.container}>
        <Image 
          style={styles.photo} 
          source={{ uri: item.photoUri || 'https://via.placeholder.com/150' }} 
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        {item.rating > 0 && (
          <Text style={{ fontSize: 12, color: '#666' }}>
            {'★'.repeat(Math.floor(item.rating))} {item.rating}/5
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );

  // Render filter header
  const renderFilterHeader = () => (
    <View style={{ backgroundColor: '#f8f9fa', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e9ecef' }}>
      {/* Search Input */}
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: '#dee2e6',
          marginBottom: 12,
          fontSize: 16
        }}
        placeholder="Search tastings..."
        value={search}
        onChangeText={handleSearchChange}
        clearButtonMode="while-editing"
      />

      {/* Sort Toggle */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#495057' }}>Sort by:</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {['newest', 'rating', 'title'].map((sortOption) => (
            <TouchableOpacity
              key={sortOption}
              onPress={() => setSort(sortOption)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: sort === sortOption ? '#007AFF' : '#e9ecef',
                borderWidth: 1,
                borderColor: sort === sortOption ? '#007AFF' : '#dee2e6'
              }}
            >
              <Text style={{
                color: sort === sortOption ? 'white' : '#495057',
                fontSize: 14,
                fontWeight: sort === sortOption ? '600' : 'normal'
              }}>
                {sortOption === 'newest' ? 'Newest' : sortOption === 'rating' ? 'Rating' : 'Title'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Category Chips */}
      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#495057' }}>Categories:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['All', ...CATEGORY_OPTIONS].map(c => {
            const value = c === 'All' ? '' : c;
            const active = value === category;
            return (
              <Pressable
                key={c}
                onPress={() => setCategory(value)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={{
                  paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16,
                  borderWidth: active ? 0 : 1, borderColor: '#ddd',
                  backgroundColor: active ? '#2563eb' : '#fff'
                }}
              >
                <Text style={{ color: active ? '#fff' : '#111' }}>{c}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Filter Header */}
      {renderFilterHeader()}
      
      {/* Debug Info (can be removed in production) */}
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
      
      {/* Items List */}
      <FlatList 
        style={{ flex: 1 }}
        vertical 
        showsVerticalScrollIndicator={false} 
        numColumns={2} 
        data={items} 
        renderItem={renderItems} 
        keyExtractor={(item) => `${item.id}`}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#666' }}>
              {search || category ? 'No matching tastings' : 'No tastings yet'}
            </Text>
            <Text style={{ fontSize: 14, color: '#999', marginTop: 5 }}>
              {search || category 
                ? 'Try adjusting your search or filters' 
                : 'Tap the "Add" button to create your first tasting!'
              }
            </Text>
          </View>
        }
      />
    </View>
  );
}
