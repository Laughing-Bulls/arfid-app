import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Button, Alert } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { ItemOperations, EventOperations } from "../../database";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [dbStatus, setDbStatus] = useState('Database not tested');

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

  const testDatabase = async () => {
    try {
      // Test inserting an item
      const itemId = await ItemOperations.insertItem({
        title: 'Test Recipe',
        brand: 'Test Brand',
        category: 'Test Category',
        rating: 5,
        photoUri: null
      });
      
      // Test recording an event
      await EventOperations.recordEvent(itemId);
      
      // Test retrieving items
      const items = await ItemOperations.getAllItems();
      
      setDbStatus(`Database working! Items: ${items.length}`);
      Alert.alert('Database Test', 'Database is working correctly!');
    } catch (error) {
      setDbStatus(`Database error: ${error.message}`);
      Alert.alert('Database Test', `Error: ${error.message}`);
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
        <Button title="Test Database" onPress={testDatabase} />
      </View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
