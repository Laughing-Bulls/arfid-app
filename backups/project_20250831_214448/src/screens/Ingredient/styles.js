import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';
import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleIngredient: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.textPrimary,
  },
  photoIngredient: {
    width: '100%',
    height: 250,
    alignSelf: 'center'
  },
  ingredientInfo: {
    color: colors.textPrimary,
    margin: 10,
    fontSize: 19,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category
});

export default styles;