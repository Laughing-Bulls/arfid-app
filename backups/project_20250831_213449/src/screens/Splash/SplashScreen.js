import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { colors } from "../../../theme/colors";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={require("../../../assets/icons/cookie100.png")} />
      <Text style={styles.appName}>Brave Bites</Text>
      <Text style={styles.tagline}>Adventure Awaits</Text>
    </View>
  );
}
