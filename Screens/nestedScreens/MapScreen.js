import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, {Marker} from "react-native-maps";

export const MapScreen = ({ route }) => {
  console.log("route.params.location", route);
  const { latitude, longitude } = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
      style={{flex: 1}}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{latitude, longitude}}/>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
