import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import date from "date-and-time";
import { getAllPosts, getUserPosts } from "../../redux/posts/postsOperation";

export const CommentsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const { userName, userId, userPhoto } = useSelector((state) => state.auth);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
  }, []);

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(getAllPosts());
      dispatch(getUserPosts(userId));
    };
  }, [dispatch]);

  const formatData = () => {
    const now = new Date();
    return date.format(now, "DD MMM, YYYY | HH:mm").toLowerCase();
  };
  const createComment = async () => {
    const postOne = await doc(db, "posts", postId);
    console.log("postOne", postOne);
    await addDoc(collection(postOne, "comments"), {
      comment,
      userName,
      authorId: userId,
      userPhoto,
      time: formatData(),
    });
    keyboardHide()
    setComment("");
  };

  const getAllComments = async () => {
    const commentsAll = await doc(db, "posts", postId);
    await onSnapshot(collection(commentsAll, "comments"), (data) => {
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Image source={{ uri: photo }} style={styles.foto} />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => {
            const isOwner = item.authorId === userId;
            return (
              <View>
                <View
                  style={[
                    styles.commentsContainer,
                    { flexDirection: isOwner ? "row-reverse" : "row" },
                  ]}
                >
                  <View style={styles.commentsUserPhotoContainer}>
                    {userPhoto && (
                      <Image
                        source={{ uri: userPhoto }}
                        style={styles.avatar}
                      />
                    )}
                  </View>

                  {isOwner ? (
                    <View style={styles.ownCommentsTextContainer}>
                      <Text>{item.comment}</Text>
                      <Text style={styles.commentsTime}>{item.time}</Text>
                    </View>
                  ) : (
                    <View style={styles.commentsTextContainer}>
                      <Text>{item.comment}</Text>
                      <Text style={styles.commentsTime}>{item.time}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            width: dimensions,
            ...Platform.select({
              ios: {
                marginBottom: isShowKeyboard ? 125 : 0,
              },
              android: {
                marginTop: isShowKeyboard ? -50 : 0,
              },
            }),
          }}
        >
          <View style={styles.writeCommentContainer}>
            <TextInput
              placeholder="Comment..."
              value={comment}
              style={styles.writeCommentInput}
              onChangeText={(value) => setComment(value)}
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={keyboardHide}
            />
          </View>

          <TouchableOpacity
            style={styles.commentButtonWrap}
            activeOpacity={0.8}
            onPress={createComment}
          >
            <AntDesign
              name="arrowup"
              size={22}
              color="white"
              style={styles.commentButton}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
  },
  postContainer: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  foto: {
    width: "100%",
    height: 200,
    marginBottom: 5,
    borderRadius: 8,
    height: 240,
  },
  commentsContainer: {
    paddingTop: 32,
    marginHorizontal: 16,
  },

  commentsUserPhotoContainer: {
    position: "absolute",
    borderWidth: 1,
    // backgroundColor: "#FF6C00",
    borderColor: "#FF6C00",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    top: 35,
  },

  commentsTextContainer: {
    width: 299,
    // height: 103,
    padding: 16,
    borderWidth: 1,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.03)",
    marginBottom: 24,
    marginLeft: 60,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  ownCommentsTextContainer: {
    width: 299,
    // height: 103,
    padding: 16,
    borderWidth: 1,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.03)",
    marginBottom: 24,
    marginRight: 60,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  avatar: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderRadius: 16,
    zIndex: -1,
  },
  writeCommentContainer: {
    width: 380,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    // paddingBottom: 15,
    // paddingLeft: 16,
    // paddingTop: 16,
    marginTop: 7,
    marginBottom: 16,
    marginHorizontal: 16,
    alignSelf: "center",
    backgroundColor: "#E8E8E8",
    // fontFamily: "RobotoRegular",
    // fontStyle: "normal",
    // fontWeight: 400,
    // fontSize: 13,
    // lineHeight: 20,
    // color: "#BDBDBD",
  },
  writeCommentInput: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 20,
    color: "#BDBDBD",
    paddingBottom: 15,
    paddingLeft: 16,
    paddingTop: 16,
    alignSelf: "flex-start",
    fontFamily: "InterVariableFont",
    fontStyle: "medium",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  commentsTime: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "right",
  },
  commentButtonWrap: {
    position: "absolute",
    borderWidth: 1,
    backgroundColor: "#FF6C00",
    borderColor: "#FF6C00",
    borderRadius: 50,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    bottom: 24,
    right: 24,
  },
  commentButton: {
    alignSelf: "center",
  },
});
