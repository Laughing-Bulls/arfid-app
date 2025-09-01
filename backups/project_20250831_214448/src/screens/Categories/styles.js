import { StyleSheet } from 'react-native';
import { colors, colorSchemes } from '../../theme/colors';

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: colorSchemes.recipeCard.border,
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: colorSchemes.recipeCard.background,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    elevation: 3
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colorSchemes.recipeCard.title,
    marginTop: 8
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5,
    color: colors.secondary,
    fontWeight: '600',
  }
});

export default styles;
