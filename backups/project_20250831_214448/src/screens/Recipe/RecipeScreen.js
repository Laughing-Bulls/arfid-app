import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import styles from "./styles";
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import RatingStars from "../../components/RatingStars/RatingStars";
import PhotoSelector from "../../components/PhotoSelector/PhotoSelector";
import { getItem, logTry, updateItem } from "../../storage/tastings";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;
  const initialItem = route.params?.item;
  console.log('RecipeScreen received item:', { id: initialItem?.id, title: initialItem?.title });
  const slider1Ref = useRef(null)
  const progress = useSharedValue(0)

  // State for the item (will be loaded/reloaded from database)
  const [item, setItem] = useState(initialItem);
  // State for rating and photo
  const [rating, setRating] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Check if this is a tasting item (has id) or old recipe format
  const isTastingItem = item && typeof item.id === 'number';

  // Load item data when screen gains focus (for tasting items only)
  useFocusEffect(useCallback(() => {
    const itemId = initialItem?.id;
    if (!itemId || typeof itemId !== 'number') return;
    
    let mounted = true;
    (async () => {
      try {
        console.log('Loading item from database with id:', itemId);
        const loadedItem = await getItem(itemId);
        console.log('Loaded item from database:', { id: loadedItem?.id, title: loadedItem?.title });
        if (mounted && loadedItem) {
          setItem(loadedItem);
        }
      } catch (error) {
        console.error('Error loading item:', error);
      }
    })();
    return () => { mounted = false; };
  }, [initialItem?.id]));

  const onLogTry = async () => {
    if (!isTastingItem) return;
    
    try {
      await logTry(item.id);
      const updated = await getItem(item.id);
      if (updated) {
        // Force a new object reference to ensure React detects the change
        const freshItem = { ...updated, tries: [...(updated.tries || [])] };
        setItem(freshItem);
      }
    } catch (error) {
      console.error('Error logging try:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        isTastingItem ? (
          <Button 
            title="Edit" 
            onPress={() => navigation.navigate('EditTasting', { item })} 
          />
        ) : (
          <View />
        )
      ),
    });
  }, [isTastingItem, item]);

  const renderImage = ({ item: imageUri }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </View>
    </TouchableHighlight>
  );

  const onPressIngredient = (item) => {
    var name = getIngredientName(item);
    let ingredient = item;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const onPressPagination = (index) =>
    {
      slider1Ref.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      })
    }

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handlePhotoSelect = (photoUri) => {
    setSelectedPhoto(photoUri);
  };

  const handlePhotoCapture = (photoUri) => {
    setSelectedPhoto(photoUri);
  };

  // Prepare data for display based on item type
  const displayData = isTastingItem ? {
    title: item.title,
    photos: item.photoUri ? [item.photoUri] : ['https://via.placeholder.com/300'],
    category: item.category,
    rating: item.rating || 0,
    description: item.notes || 'No notes added yet.',
    brand: item.brand
  } : {
    title: item.title,
    photos: item.photosArray || [],
    category: getCategoryName(item.categoryId),
    rating: 0,
    description: item.description,
    time: item.time
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
              ref={c =>
              {
                slider1Ref.current = c
              }}
            loop={false}
            width={viewportWidth}
            height={viewportWidth}
            autoPlay={false}
            data={displayData.photos}
            scrollAnimationDuration={1000}
            renderItem={renderImage}
            onProgressChange={progress}
          />
          <Pagination.Basic
            renderItem={(item) => (
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,1)",
                  flex: 1,
                }}
              />
            )}
            progress={progress}
            data={displayData.photos}
            dotStyle={styles.paginationDot}
            containerStyle={styles.paginationContainer}
            onPress={onPressPagination}
          />
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{displayData.title}</Text>
        
        {/* Brand Section (for tasting items) */}
        {isTastingItem && displayData.brand && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoRecipe}>Brand: {displayData.brand}</Text>
          </View>
        )}

        {/* Rating Display */}
        {displayData.rating > 0 && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoRecipe}>
              Rating: {'★'.repeat(Math.floor(displayData.rating))} {displayData.rating}/5
            </Text>
          </View>
        )}

        {/* Log Try Button and Stats (for tasting items only) */}
        {isTastingItem && (
          <View style={styles.infoContainer} key={`tries-${item.tries?.length || 0}`}>
            <Button title="Log Try" onPress={onLogTry} />
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 8 }}>
              <Text style={styles.infoRecipe}>
                Last tried: {item.tries?.length ? new Date(item.tries[item.tries.length - 1]).toLocaleDateString() : 'Never'}
              </Text>
              <Button 
                title="All tries" 
                onPress={() => navigation.navigate('TryHistory', { id: item.id })} 
              />
            </View>
            
            <Text style={styles.infoRecipe}>
              Times tried: {item.tries?.length || 0}
            </Text>
          </View>
        )}

        {/* Category */}
        <View style={styles.infoContainer}>
          <Text style={styles.category}>
            {displayData.category.toUpperCase()}
          </Text>
        </View>

        {/* Time (for recipe items) */}
        {!isTastingItem && displayData.time && (
          <View style={styles.infoContainer}>
            <Image
              style={styles.infoPhoto}
              source={require("../../../assets/icons/time.png")}
            />
            <Text style={styles.infoRecipe}>{displayData.time} minutes </Text>
          </View>
        )}

        {/* Ingredients (for recipe items) */}
        {!isTastingItem && item.ingredients && (
          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => {
                let ingredients = item.ingredients;
                let title = "Ingredients for " + item.title;
                navigation.navigate("IngredientsDetails", { ingredients, title });
              }}
            />
          </View>
        )}

        {/* Description/Notes */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{displayData.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}