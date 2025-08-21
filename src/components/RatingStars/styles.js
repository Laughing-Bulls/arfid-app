import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    marginHorizontal: 2,
    padding: 2,
  },
  star: {
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#E0E0E0',
  },
  starHalf: {
    color: '#FFD700',
  },
  ratingText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
