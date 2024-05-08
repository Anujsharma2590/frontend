import { View, StyleSheet, Image, ActivityIndicator } from "react-native";

import Splash from "./assets/splash.png";

export default function SplashScreenView() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={Splash} style={styles.image} />
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  image: { width: 200, height: 200 },
});
