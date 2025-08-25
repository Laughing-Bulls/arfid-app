// src/screens/NewTastingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Alert, TouchableOpacity, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AirbnbRating } from 'react-native-ratings';
import { addItemWithFirstTry } from '../storage/tastings';
import { CATEGORY_OPTIONS } from '../constants/categories';

export default function NewTastingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Other');
  const [rating, setRating] = useState(0);
  const [photoUri, setPhotoUri] = useState('');
  const [notes, setNotes] = useState('');
  const [dateTried, setDateTried] = useState(new Date().toISOString().split('T')[0]); // Default to today

  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    })();
  }, []);

  const choosePhoto = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!r.canceled) setPhotoUri(r.assets[0].uri);
  };

  const takePhoto = async () => {
    const r = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!r.canceled) setPhotoUri(r.assets[0].uri);
  };

  const save = async () => {
    if (!title.trim()) return Alert.alert('Missing title', 'Give this tasting a title.');
    
    // Convert the date to date-only ISO string (noon UTC)
    const dateObj = new Date(dateTried + 'T12:00:00.000Z');
    const triedDate = dateObj.toISOString();
    
    await addItemWithFirstTry(
      { 
        title: title.trim(), 
        brand: brand.trim(), 
        category: selectedCategory, 
        rating, 
        photoUri, 
        notes 
      }, 
      triedDate
    );
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>New Tasting</Text>

      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="e.g., Honeycrisp apple" style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} />

      <Text>Brand</Text>
      <TextInput value={brand} onChangeText={setBrand} placeholder="e.g., Trader Joe's" style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} />

      <Text>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 6 }}>
        {CATEGORY_OPTIONS.map(c => {
          const active = c === selectedCategory;
          return (
            <Pressable
              key={c}
              onPress={() => setSelectedCategory(c)}
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
      </ScrollView>

      <Text>Rating</Text>
      <AirbnbRating defaultRating={rating} onFinishRating={setRating} size={24} showRating />

      <Text>Date Tried</Text>
      <TextInput 
        value={dateTried} 
        onChangeText={setDateTried} 
        placeholder="YYYY-MM-DD" 
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} 
      />

      <Text>Photo</Text>
      {photoUri
        ? <Image source={{ uri: photoUri }} style={{ width: '100%', height: 220, borderRadius: 12 }} />
        : <View style={{ width: '100%', height: 220, borderRadius: 12, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }}><Text>No photo yet</Text></View>}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button title="Choose Photo" onPress={choosePhoto} />
        <Button title="Take Photo" onPress={takePhoto} />
      </View>

      <Text>Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Flavor, texture, where you got it..."
        multiline
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, minHeight: 80 }}
      />

      <Button title="Save" onPress={save} />
    </ScrollView>
  );
}
