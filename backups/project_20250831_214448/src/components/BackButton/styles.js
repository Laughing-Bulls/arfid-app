// BackButton/styles.js
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20, 
    padding: 10, 
    margin: 8, 
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnIcon: {
    height: 20, 
    width: 20,
    tintColor: colors.primary,
  },
});

export default styles;