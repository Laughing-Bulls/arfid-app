import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, Button, TextInput, FlatList, Image } from 'react-native';
import { STOCK_PHOTOS } from '../constants/stockPhotos';
import useDraftTasting from '../state/useDraftTasting';

export default function StockPickerScreen({ navigation }) {
  console.log('StockPicker: Screen loaded');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  // Use Zustand store to set the photo
  const setPhoto = useDraftTasting((state) => state.setPhoto);

  const cats = useMemo(() => ['All', ...Array.from(new Set(STOCK_PHOTOS.map(p => p.category)))], []);
  const data = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return STOCK_PHOTOS.filter(p => (cat === 'All' || p.category === cat) &&
      (!qq || p.title.toLowerCase().includes(qq) || p.tags.some(t => t.includes(qq))));
  }, [q, cat]);

  const pick = (id) => {
    const photo = { kind: 'stock', id };
    setSelectedPhoto(photo);
  };

  const confirm = () => {
    if (!selectedPhoto) return;

    // Update the draft in the store
    setPhoto(selectedPhoto);
    
    // Navigate back to the form
    navigation.goBack();
  };

  const cancel = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <Pressable 
      onPress={() => pick(item.id)} 
      style={{ 
        width: '48%', 
        marginBottom: 12,
        backgroundColor: selectedPhoto?.id === item.id ? '#e3f2fd' : 'transparent',
        borderRadius: 8,
        padding: 4
      }}
    >
      <Image 
        source={item.src} 
        style={{ width: '100%', height: 120, borderRadius: 8 }} 
      />
      <Text style={{ marginTop: 6, textAlign: 'center', fontSize: 12 }}>{item.title}</Text>
    </Pressable>
  );

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

      <TextInput
        placeholder="Search foods..."
        value={q}
        onChangeText={setQ}
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 6 }}>
        {cats.map(c => {
          const active = c === cat;
          return (
            <Pressable key={c} onPress={() => setCat(c)} style={{
              paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16,
              borderWidth: active ? 0 : 1, borderColor: '#ddd',
              backgroundColor: active ? '#2563eb' : '#fff'
            }}>
              <Text style={{ color: active ? '#fff' : '#111' }}>{c}</Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={data}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 6 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Actions */}
      <View style={{ marginTop: 12, gap: 8 }}>
        <Button title="Use selected photo" onPress={confirm} disabled={!selectedPhoto} />
        <Button title="Cancel" color="#666" onPress={cancel} />
      </View>
    </View>
  );
}
