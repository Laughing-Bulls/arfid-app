// src/screens/EditTastingScreen.js
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AirbnbRating } from 'react-native-ratings';
import { updateItem } from '../storage/tastings';
import BackButton from '../components/BackButton/BackButton';

export default function EditTastingScreen({ navigation, route }) {
  const { item } = route.params;
  
  const [title, setTitle] = useState(item.title || '');
  const [brand, setBrand] = useState(item.brand || '');
  const [category, setCategory] = useState(item.category || 'Other');
  const [rating, setRating] = useState(item.rating || 0);
  const [photoUri, setPhotoUri] = useState(item.photoUri || '');
  const [notes, setNotes] = useState(item.notes || '');

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
    
    await updateItem(item.id, {
      title: title.trim(),
      brand: brand.trim(),
      category: category.trim(),
      rating,
      photoUri,
      notes
    });
    
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Edit Tasting</Text>

      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="e.g., Honeycrisp apple" style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} />

      <Text>Brand</Text>
      <TextInput value={brand} onChangeText={setBrand} placeholder="e.g., Trader Joe's" style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} />

      <Text>Category</Text>
      <TextInput value={category} onChangeText={setCategory} placeholder="Fruits, Vegetables, Meats..." style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} />

      <Text>Rating</Text>
      <AirbnbRating defaultRating={rating} onFinishRating={setRating} size={24} showRating />

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

      <Button title="Save Changes" onPress={save} />
    </ScrollView>
  );
}

