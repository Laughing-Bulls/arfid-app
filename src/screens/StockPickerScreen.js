import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, Pressable, Button, TextInput, FlatList, Image } from 'react-native';
import { STOCK_PHOTOS } from '../constants/stockPhotos';
import { CommonActions } from '@react-navigation/native';

// helper: set params on a specific route by name without navigating
function setParamsOnRoute(navigation, routeName, params) {
  const parent = navigation.getParent?.();
  if (!parent?.getState) return false;

  const parentState = parent.getState();              // this is your Root stack
  // Find the nested drawer (named "Root" in our earlier setup) then the AddTasting route key
  const rootRoute = parentState.routes.find(r => r.name === 'Root'); // adjust if your root is named differently
  const drawerState = rootRoute?.state;               // nested drawer state

  const addRoute = drawerState?.routes?.find(r => r.name === routeName);
  const addKey = addRoute?.key;

  if (!addKey) return false;

  parent.dispatch({
    ...CommonActions.setParams({ photo: params.photo }),
    source: addKey,                                   // set params on that exact route
  });
  return true;
}

export default function StockPickerScreen({ navigation, route }) {
  console.log('StockPicker: Screen loaded');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  // Guard against hot reload losing the function
  const onSelectRef = useRef(route?.params?.onSelect);
  useEffect(() => { onSelectRef.current = route?.params?.onSelect; }, [route?.params?.onSelect]);

  const cats = useMemo(() => ['All', ...Array.from(new Set(STOCK_PHOTOS.map(p => p.category)))], []);
  const data = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return STOCK_PHOTOS.filter(p => (cat === 'All' || p.category === cat) &&
      (!qq || p.title.toLowerCase().includes(qq) || p.tags.some(t => t.includes(qq))));
  }, [q, cat]);

  const pick = (id) => {
    const photo = { kind: 'stock', id };
    setSelectedPhoto(photo);    // do not navigate here
  };

  const confirm = () => {
    if (!selectedPhoto) return;

    // 1) fire the callback if it exists (may be missing after hot reload)
    const cb = route?.params?.onSelect;
    if (typeof cb === 'function') {
      // next frame to avoid racing unmount
      requestAnimationFrame(() => cb(selectedPhoto));
    }

    // 2) also set params directly on the AddTasting route so it persists
    setParamsOnRoute(navigation, 'AddTasting', { photo: selectedPhoto });

    // 3) now pop back to the previous screen
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
