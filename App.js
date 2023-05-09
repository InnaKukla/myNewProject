import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";

import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

SplashScreen.preventAutoHideAsync();




export default function App() {
  const routing = useRoute(true);
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/font/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/font/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <NavigationContainer>
        {routing}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
});
