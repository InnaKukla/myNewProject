import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  collection,
  onSnapshot,
  doc,
  query,
  addDoc,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, getUserPosts } from "../../redux/posts/postsOperation";

export const Home = ({ route, navigation }) => {

  const { userName, userEmail, userPhoto, userId } = useSelector(
    (state) => state.auth
  );
  const { posts } = useSelector((state) => state.posts);
  const [countLikes, setCountLikes] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserPosts(userId));
  }, [dispatch]);

  const createLikes = async () => {
    setCountLikes((prevState) => (prevState += 1));
    posts.map(async (post) => {
      const postId = post.id;
      const postOne = await doc(db, "posts", postId);
      console.log("postOne", postOne);
      await addDoc(collection(postOne, "likes"), {
        countLikes,
      });
    });
    dispatch(getAllPosts());
    dispatch(getUserPosts(userId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.authWrap}>
        {/* <View> */}
        <View style={styles.imgAuthWrap}>
          {userPhoto && (
            <Image source={{ uri: userPhoto }} style={styles.avatar} />
          )}
        </View>
        <View style={styles.authData}>
          <Text style={styles.authName}>{userName}</Text>
          <Text style={styles.authEmail}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.postsListWrapper}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image source={{ uri: item.photo }} style={styles.foto} />
              <Text style={styles.postDescription}>{item.descriptionFoto}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  style={styles.commentsContainer}
                  onPress={() =>
                    navigation.navigate("Коментарі", {
                      postId: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <Feather
                    name="message-circle"
                    size={20}
                    color="#BDBDBD"
                    style={styles.iconComments}
                  />
                  <Text style={styles.numberComments}>
                    {item.countComments}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.locationContainer}
                  onPress={() =>
                    navigation.navigate("Карта", {
                      location: item.location,
                    })
                  }
                >
                  <Feather
                    name="map-pin"
                    size={20}
                    color="#BDBDBD"
                    style={styles.iconLocation}
                  />
                </TouchableOpacity>
                <Text style={styles.nameLocation}>
                  {item.descriptionLocality}
                </Text>
                <TouchableOpacity
                  style={styles.likesContainer}
                  onPress={createLikes}
                >
                  <Feather
                    name="thumbs-up"
                    size={20}
                    color="#FF6C00"
                    style={styles.iconLikes}
                  />
                  <Text style={styles.numberLikes}>{item.countLikes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  authWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 32,
  },

  imgAuthWrap: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderRadius: 16,
    zIndex: -1,
  },
  authData: {
    marginLeft: 8,
  },
  authName: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    textAlign: "start",
    letterSpacing: 0.16,
    color: "#212121",
  },
  authEmail: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 11,
    lineHeight: 13,
    textAlign: "start",
    letterSpacing: 0.16,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsListWrapper: {
    // marginTop: 33,
    marginBottom: 100,
  },
  postContainer: {
    alignItems: "center",
    // marginHorizontal: 16,
  },
  foto: {
    width: "100%",
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
    marginRight: 30
  },
  numberComments: {
    left: 15,
    fontFamily: "RobotoRegular",
    fontWeight: 400,
    lineHeight: 19,
    fontSize: 16,
    color: "#BDBDBD",
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 200
  },

  nameLocation: {
    alignSelf: "flex-end",
    left: 5,
    textDecorationLine: "underline",
  },
  likesContainer: {
    flexDirection: "row",
    // alignItems: "flex-end",
  },
  numberLikes: {
    marginLeft: 10,
    fontFamily: "RobotoRegular",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 19,
    fontSize: 16,
    color: "#BDBDBD",
    // alignSelf: "flex-end",
  },
});
