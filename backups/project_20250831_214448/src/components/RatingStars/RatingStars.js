import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const RatingStars = ({ rating, onRatingChange, size = 24, showLabel = true }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleStarPress = (starValue) => {
    onRatingChange(starValue);
  };

  const renderStar = (starValue) => {
    const isFilled = starValue <= rating;
    const isHalf = starValue === Math.ceil(rating) && rating % 1 !== 0;
    
    return (
      <TouchableOpacity
        key={starValue}
        onPress={() => handleStarPress(starValue)}
        style={styles.starContainer}
      >
        <Text style={[
          styles.star,
          { fontSize: size },
          isFilled ? styles.starFilled : styles.starEmpty,
          isHalf && styles.starHalf
        ]}>
          {isHalf ? '★' : (isFilled ? '★' : '☆')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>
        {stars.map(renderStar)}
      </View>
      {showLabel && (
        <Text style={styles.ratingText}>
          {rating > 0 ? `${rating.toFixed(1)} / 5` : 'Tap to rate'}
        </Text>
      )}
    </View>
  );
};

export default RatingStars;


