import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// import { collection, where, query, onSnapshot, doc } from "firebase/firestore";
import { authSingOutUser } from "../../redux/auth/authOperation";
// import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import {getUserPosts} from "../../redux/posts/postsOperation"

export const ProfileScreen = ({ route, navigation }) => {

 const { userName, userPhoto } = useSelector((state) => state.auth);
  const { profilePosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth);
//   
  useEffect(() => {
   dispatch(getUserPosts(userId))
   
  }, [dispatch]);

  const singOut = () => {
    dispatch(authSingOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/imageBackground.png")}
      >
        <View style={styles.registerForm}>
          <View style={styles.imgWrap}>
            {userPhoto
              &&
              (
                  <Image
                    source={{ uri: userPhoto }}
                    style={styles.avatar}
                  />
              )
            }
            {userPhoto ? (<Image
              style={styles.buttonPresentFoto}
              source={require("../../assets/presentPhoto.png")}
            />) : (<Image
              style={styles.buttonAddFoto}
              source={require("../../assets/add.png")}
            />)}
            {/* <Image
              style={styles.buttonAddFoto}
              source={require("../../assets/add.png")}
            /> */}
          </View>
           <View>
            <TouchableOpacity style={styles.iconLogOutWrap} onPress={singOut}>
              <Text style={styles.iconLogOut}>
                <Feather name="log-out" color={"#BDBDBD"} size={24} />
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textName}>{userName}</Text>
          <View style={styles.postsListWrapper}>
            <FlatList
              data={profilePosts}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled
              renderItem={({ item }) => (
                <View style={styles.postContainer}>
                  <Image source={{ uri: item.photo }} style={styles.foto} />
                  <Text style={styles.postDescription}>
                    {item.descriptionFoto}
                  </Text>

                  <View style={styles.iconsContainer}>
                    <TouchableOpacity
                      style={styles.commentsContainer}
                      onPress={() =>
                        navigation.navigate("Коментарі", {
                          postId: item.id,
                          photo: item.photo,
                          countComments: item.countComments,
                        })
                      }
                    >
                      <Feather
                        name="message-circle"
                        size={20}
                        color="#FF6C00"
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
                      <Text style={styles.nameLocation}>
                        {item.descriptionLocality}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.likesContainer}
                      onPress={() => {
                        // setCountLikes((prevState) => (prevState += 1));
                      }}
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  registerForm: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    marginTop: 150,
  },
  imgWrap: {
    position: "absolute",
    width: 120,
    height: 120,
    top: "-10%",
    left: "36%",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    zIndex: 999
  },
   avatar: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderRadius: 16,
    zIndex: -1
  }, 
  buttonAddFoto: {
    position: "absolute",
    top: "65%",
    left: "90%",
    width: 25,
    height: 25,
  },
  buttonPresentFoto: {
    position: "absolute",
    top: "60%",
    left: "85%",
  },
  postsListWrapper: {
    marginTop: 33,
    marginBottom: 90,
  },
  textName: {
    // position: "absolute",
    fontSize: 30,
    // fontWeight: 500,
    fontFamily: "RobotoMedium",
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.16,
    color: "#212121",
    marginTop: 33,
  },

  postContainer: {
    alignItems: "center",
    // marginHorizontal: 16,
  },
  foto: {
    width: 380,
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
    marginRight: 30
  },
  numberComments: {
    left: 15,
    fontFamily: "RobotoRegular",
    fontWeight: 400,
    lineHeight: 19,
    fontSize: 16,
    color: "#212121",
  },

  iconComments: {
    // left: 10,
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 200,
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
    color: "#212121",
    // alignSelf: "flex-end",
  },
  iconLogOut: {
    // marginBottom: 10,
    // paddingRight: 10,
    marginTop: 150,
    marginLeft: 360,
    marginBottom: 0
  },
});
