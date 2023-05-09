import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [descriptionFoto, setDescriptionFoto] = useState("");
  const [descriptionLocality, setDescriptionLocality] = useState("");
  // console.log("route.params", route.params);
  // console.log("posts", posts);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
      setDescriptionFoto((prevState) => [...prevState, route.params]);
      setDescriptionLocality((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photo }} style={styles.foto} />
            <Text style={styles.postDescription}>Description</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                style={styles.commentsContainer}
                onPress={() => navigation.navigate("CommentsScreen")}
              >
                <Feather
                  name="message-circle"
                  size={20}
                  color="#BDBDBD"
                  style={styles.iconComments}
                />
                <Text style={styles.numberComments}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.locationContainer}
                onPress={() => navigation.navigate("MapScreen")}
              >
                <Feather
                  name="map-pin"
                  size={20}
                  color="#BDBDBD"
                  style={styles.iconLocation}
                />
                <Text style={styles.nameLocation}>Name</Text>
              </TouchableOpacity>
              {/* <Button title="go to map" onPress={()=> navigation.navigate("MapScreen")} />
              <Button title="go to comments" onPress={()=> navigation.navigate("CommentsScreen")} />  */}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  postContainer: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  foto: {
    width: 350,
    height: 200,
    marginBottom: 5,
    borderRadius: 8,
    height: 240,
  },

  postDescription: {
    fontFamily: "RobotoRegular",
    fontWeight: 500,
    lineHeight: 19,
    fontSize: 16,
    color: "#212121",
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 11,
    alignSelf: "start",
  },
  iconsContainer: {
    alignSelf: "start",
    marginBottom: 35,
    flexDirection: "row",
  },
  commentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberComments: {
    left: 15,
    fontFamily: "RobotoRegular",
    fontWeight: 400,
    lineHeight: 19,
    fontSize: 16,
    color: "#BDBDBD",
  },

  iconComments: {
    left: 10,
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconLocation: {
    left: 160,
  },

  nameLocation: {
    alignSelf: "flex-end",
    left: 165,
  },
});

// import React from "react";
// import { Text, View, StyleSheet } from "react-native";

// export const Home = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Home</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     }
// })
