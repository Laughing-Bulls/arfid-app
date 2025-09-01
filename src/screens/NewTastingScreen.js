// src/screens/NewTastingScreen.js
import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Alert, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { AirbnbRating } from 'react-native-ratings';
import { addItemWithFirstTry } from '../storage/tastings';
import { CATEGORY_OPTIONS } from '../constants/categories';
import { resolvePhotoSource } from '../utils/photos';
import useDraftTasting from '../state/useDraftTasting';

export default function NewTastingScreen() {
  const navigation = useNavigation();
  
  // Use Zustand store instead of local state
  const {
    title, brand, selectedCategory, rating, photo, notes, dateTried,
    setField, setPhoto, reset
  } = useDraftTasting();

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    })();
  }, []);

  const openStockPicker = () => {
    navigation.navigate('StockPicker');
  };

  const choosePhoto = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!r.canceled) setPhoto({ kind: 'uri', uri: r.assets[0].uri });
  };

  const takePhoto = async () => {
    const r = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!r.canceled) setPhoto({ kind: 'uri', uri: r.assets[0].uri });
  };

  const save = async () => {
    if (!title.trim()) return Alert.alert('Missing title', 'Give this tasting a title.');
    
    // Convert the date to date-only ISO string (noon UTC)
    const dateObj = new Date(dateTried + 'T12:00:00.000Z');
    const triedDate = dateObj.toISOString();
    
    try {
      await addItemWithFirstTry(
        { 
          title: title.trim(), 
          brand: brand.trim(), 
          category: selectedCategory, 
          rating, 
          photo, 
          notes 
        }, 
        triedDate
      );
      reset(); // Clear the draft after successful save
      navigation.goBack();
    } catch (error) {
      console.error('Save failed:', error);
      Alert.alert('Error', 'Failed to save tasting: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>New Tasting</Text>

      <Text>Title</Text>
      <TextInput 
        value={title} 
        onChangeText={(text) => setField('title', text)} 
        placeholder="e.g., Honeycrisp apple" 
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} 
      />

      <Text>Brand</Text>
      <TextInput 
        value={brand} 
        onChangeText={(text) => setField('brand', text)} 
        placeholder="e.g., Trader Joe's" 
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} 
      />

      <Text>Category</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingVertical: 6 }}>
        {CATEGORY_OPTIONS.map(c => {
          const active = c === selectedCategory;
          return (
            <Pressable
              key={c}
              onPress={() => setField('selectedCategory', c)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 16,
                borderWidth: active ? 0 : 1,
                borderColor: '#ddd',
                backgroundColor: active ? '#2563eb' : '#fff'
              }}
            >
              <Text style={{ color: active ? '#fff' : '#111' }}>{c}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text>Rating</Text>
      <AirbnbRating 
        defaultRating={rating} 
        onFinishRating={(value) => setField('rating', value)} 
        size={24} 
        showRating 
      />

      <Text>Date Tried</Text>
      <TextInput 
        value={dateTried} 
        onChangeText={(text) => setField('dateTried', text)} 
        placeholder="YYYY-MM-DD" 
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} 
      />

      <Text>Photo</Text>
      {photo ? (
        <Image
          source={resolvePhotoSource(photo)}
          style={{ width: '100%', height: 220, borderRadius: 12 }}
        />
      ) : (
        <View style={{ width: '100%', height: 220, borderRadius: 12, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }}>
          <Text>No photo yet</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button title="Choose Photo" onPress={choosePhoto} />
        <Button title="Take Photo" onPress={takePhoto} />
        <Button title="Stock Photo" onPress={openStockPicker} />
      </View>

      <Text>Notes</Text>
      <TextInput
        value={notes}
        onChangeText={(text) => setField('notes', text)}
        placeholder="Flavor, texture, where you got it..."
        multiline
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, minHeight: 80 }}
      />

      <Button title="Save" onPress={save} />
    </ScrollView>
  );
}
