import React from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const PhotoSelector = ({ selectedPhoto, onPhotoSelect, onPhotoCapture }) => {
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Camera and photo library permissions are required to use this feature.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handleChoosePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onPhotoSelect(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select photo from library');
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onPhotoCapture(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      
      {selectedPhoto && (
        <View style={styles.photoContainer}>
          <Image source={{ uri: selectedPhoto }} style={styles.selectedPhoto} />
        </View>
      )}
    </View>
  );
};

export default PhotoSelector;
