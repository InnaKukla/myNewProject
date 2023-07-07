import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import { Provider, useSelector } from 'react-redux'

import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./redux/store";
import { Main } from "./components/Main";

SplashScreen.preventAutoHideAsync();




export default function App() {

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/font/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/font/Roboto-Medium.ttf"),
    InterVariableFont: require("./assets/font/Inter-VariableFont.ttf")
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
    <Provider store={store}>
      <StatusBar/>
      <View onLayout={onLayoutRootView} style={styles.container}>
        <Main/>
    </View>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
