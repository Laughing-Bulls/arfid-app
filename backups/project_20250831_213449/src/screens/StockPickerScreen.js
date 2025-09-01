import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default function StockPickerScreen({ navigation, route }) {
  console.log('StockPicker: Screen loaded');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Guard against hot reload losing the function
  const onSelectRef = useRef(route?.params?.onSelect);
  useEffect(() => { onSelectRef.current = route?.params?.onSelect; }, [route?.params?.onSelect]);

  const pick = (id) => {
    const photo = { kind: 'stock', id };
    setSelectedPhoto(photo);    // do not navigate here
  };

  const confirm = () => {
    if (!selectedPhoto) return;
    const photo = selectedPhoto;

    try {
      // 1) Try the callback
      if (typeof onSelectRef.current === 'function') {
        onSelectRef.current(photo);
      }

      // 2) Also push params to the AddTasting route (in case callback got lost)
      navigation.dispatch(
        CommonActions.navigate({
          name: 'AddTasting',            // make sure this matches your route name exactly
          params: { photo },
          merge: true,
        })
      );

      // 3) Prefer going back one screen, fall back to navigating directly
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('AddTasting');
      }
    } catch (err) {
      console.error('Error confirming selection:', err);
    }
  };

  const cancel = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 12, gap: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Choose a stock photo</Text>

      {selectedPhoto && (
        <View style={{
          backgroundColor: '#d4edda',
          padding: 10,
          borderRadius: 8,
          marginBottom: 10
        }}>
          <Text style={{ color: '#155724', textAlign: 'center' }}>
            Selected: {selectedPhoto.id} ✓
          </Text>
        </View>
      )}

      {/* Simple test buttons without images */}
      <Pressable
        onPress={() => pick('apple')}
        style={{
          backgroundColor: '#2563eb',
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <Text style={{ color: 'white' }}>Select Apple</Text>
      </Pressable>

      <Pressable
        onPress={() => pick('banana')}
        style={{
          backgroundColor: '#2563eb',
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <Text style={{ color: 'white' }}>Select Banana</Text>
      </Pressable>

      <Pressable
        onPress={() => pick('orange')}
        style={{
          backgroundColor: '#2563eb',
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <Text style={{ color: 'white' }}>Select Orange</Text>
      </Pressable>

      {/* Actions */}
      <View style={{ marginTop: 12, gap: 8 }}>
        <Button title="Use selected photo" onPress={confirm} disabled={!selectedPhoto} />
        <Button title="Cancel" color="#666" onPress={cancel} />
      </View>
    </View>
  );
}
