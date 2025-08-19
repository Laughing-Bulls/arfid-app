import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";
import { colors, colorSchemes } from "../../theme/colors";

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: colorSchemes.search.background, 
    borderRadius: 10, 
    width: 250,
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: colorSchemes.search.border,
  },
  searchIcon: { 
    width: 20, 
    height: 20, 
    tintColor: colors.secondary
  },
  searchInput: {
    backgroundColor: colorSchemes.search.background,
    color: colorSchemes.search.text,
    width: 180,
    height: 50,
  }
});

export default styles;
