import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

import { storage, db } from "../../firebase/config";
import {
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import { Fontisto, Feather } from "@expo/vector-icons";
import { Button, ScrollView } from "react-native-web";
import { getAllComments, getAllPosts, getUserPosts } from "../../redux/posts/postsOperation"


export const CreatePostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [location, setLocation] = useState(null);
  const [descriptionFoto, setDescriptionFoto] = useState("");
  const [descriptionLocality, setDescriptionLocality] = useState("");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [countComments, setCountComments] = useState(0);
  const [image, setImage] = useState(null);
  const [countLikes, setCountLikes] = useState(0);

  const { userId, userName, userPhoto } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };

    // requestCameraPermission();
    // navigation.setOptions({tabBarStyle: {display: none}})
  }, []);

  if (!permission) {
    return null;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync({});
    console.log(location.coords);
    setLocation(location.coords);

    // setLocation(location.coords)
  };
  console.log("photo", photo);
  console.log("location", location);


  const sendPhoto = () => {
    if (photo !== "") {
      uploadPostToServer();
      // navigation.navigate("Home");

      // setDescriptionFoto("");
      // setDescriptionLocality("");
      // setPhoto("");
    }
    if (image !== "") {
      uploadPostImageToServer();
    }
    
    navigation.navigate("Home");

    setDescriptionFoto("");
    setDescriptionLocality("");
    setPhoto("");
    setImage("");
  };
  const deletePhoto = () => {
    setPhoto("");
    setImage("");
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(descriptionFoto);
    // console.log(descriptionLocality);
    setDescriptionFoto("");
    setDescriptionLocality("");
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    console.log("photo", photo);
    await addDoc(collection(db, "posts"), {
      photo,
      descriptionFoto,
      location,
      descriptionLocality,
      countComments,
      countLikes,

      userId,
      userName,
      userPhoto,
      // userEmail
    });
    
    dispatch(getUserPosts(userId))
    dispatch(getAllPosts());
  };

  const uploadPostImageToServer = async () => {
    const photo = await uploadImageToServer();
    console.log("photo", photo);
    await addDoc(collection(db, "posts"), {
      photo,
      descriptionFoto,
      location,
      descriptionLocality,
      countComments,
      countLikes,

      userId,
      userName,
      userPhoto,
      // userEmail
    });

    dispatch(getUserPosts(userId))
    dispatch(getAllPosts());
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef = await ref(storage, `postImg/${uniquePostId}`);
    console.log(storageRef);

    await uploadBytes(storageRef, file);
    // await getStorage().ref(`postImg/${uniquePostId}`.put(file));

    const storageDownloadRef = await getDownloadURL(storageRef);
    return storageDownloadRef;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImageToServer = async () => {
    const response = await fetch(image);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef = await ref(storage, `postImg/${uniquePostId}`);
    console.log(storageRef);

    await uploadBytes(storageRef, file);
    // await getStorage().ref(`postImg/${uniquePostId}`.put(file));

    const storageDownloadRef = await getDownloadURL(storageRef);
    return storageDownloadRef;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        > */}
        <View

        // style={{
        //   ...styles.createPostContainer,
        //   // marginBottom: isShowKeyboard ? -190 : 0,
        //   width: dimensions,
        //   ...Platform.select({
        //     ios: {
        //       // marginBottom: isShowKeyboard ? -110 : 0,
        //     },
        //     android: {
        //       // marginTop: isShowKeyboard ? -50 : 0,
        //       // marginBottom: isShowKeyboard ? -160 : 0,
        //       // paddingTop: isShowKeyboard ? 80 : 92,
        //     },
        //   }),
        // }}
        >
          {/* <ScrollView> */}
          <TouchableOpacity onPress={toggleCameraType}>
            <Camera style={styles.camera} ref={setCamera} type={type}>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image source={{ uri: photo }} style={styles.takePhoto} />
                </View>
              )}
              <TouchableOpacity
                onPress={takePhoto}
                style={styles.cameraButtonContainer}
              >
                <Text style={{ backgroundColor: "#fff" }}>
                  <Fontisto name="camera" size={20} color="#BDBDBD" />
                </Text>
              </TouchableOpacity>
            </Camera>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={pickImage}> */}
          {image || photo ? (
            <View style={styles.cameraButtonsChange}>
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.cameraButtonLoad}>Редагувати фото</Text>
                {image && (
                  <Image source={{ uri: image }} style={styles.loadPhoto} />
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cameraButtonsChange}>
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.cameraButtonLoad}>Загрузити фото</Text>
                {image && (
                  <Image source={{ uri: image }} style={styles.loadPhoto} />
                )}
              </TouchableOpacity>
            </View>
          )}
          {/* <Text style={styles.cameraButtonLoad}>Load foto</Text> */}
          {/* {image && (
                <Image source={{ uri: image }} style={styles.loadPhoto} />
              )}
            </TouchableOpacity> */}
          <View style={styles.descriptionContainer}>
            <TextInput
              placeholder="Description"
              value={descriptionFoto}
              style={styles.inputDescriptionFoto}
              onChangeText={(value) => setDescriptionFoto(value)}
            ></TextInput>
          </View>
          <View style={styles.descriptionContainer}>
            <TouchableOpacity
              // onPress={navigation.navigate("Карта",
              //   { location: location }
              // )}
            >
              <Feather
                name="map-pin"
                size={18}
                color="#BDBDBD"
                style={styles.iconLocality}
              />
            </TouchableOpacity>

            <TextInput
              placeholder="Locality"
              value={descriptionLocality}
              style={styles.inputDescriptionLocality}
              onChangeText={(value) => setDescriptionLocality(value)}
            ></TextInput>
          </View>
          {/* <TouchableOpacity
              style={styles.publishButtonWrap}
              activeOpacity={0.8}
            >
              <Text onPress={sendPhoto} style={styles.publishActiveButtonText}>
                Опубліковати
              </Text>
            </TouchableOpacity> */}
          {photo || image ? (
            <TouchableOpacity
              style={styles.publishActiveButtonWrap}
              activeOpacity={0.8}
            >
              <Text onPress={sendPhoto} style={styles.publishActiveButtonText}>
                Опублікувати
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.publishButtonWrap}
              activeOpacity={0.8}
            >
              <Text onPress={sendPhoto} style={styles.publishButtonText}>
                Опублікувати
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.deletePhotoButtonWrap}
            onPress={deletePhoto}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          {/* </ScrollView> */}
        </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  createPostContainer: {},
  camera: {
    marginTop: 32,
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  cameraButtonContainer: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // top: 50,
  },
  cameraButtonsChange: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cameraButtonLoad: {
    fontFamily: "RobotoRegular",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 19,
    fontSize: 16,
    color: "#BDBDBD",
    // marginLeft: 16,
    marginTop: 8,
    marginBottom: 48,
  },
  takePhotoContainer: {
    position: "absolute",
    borderColor: "#fff",
    borderRadius: 8,
    color: "#fff",
    borderWidth: 1,
  },
  takePhoto: {
    height: 240,
    width: 380,
    borderWidth: 1,
    borderRadius: 8,
  },
  loadPhoto: {
    position: "absolute",
    height: 240,
    width: 380,
    borderWidth: 1,
    borderRadius: 8,
    top: -240,
  },
  deletePhotoButtonWrap: {},

  descriptionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 15,
    marginBottom: 32,
  },
  inputDescriptionFoto: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  inputDescriptionLocality: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 28,
  },
  iconLocality: {
    position: "absolute",
    left: 0,
    justifyContent: "center",
    // bottom: 15,
  },
  publishButtonWrap: {
    width: "100%",
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginTop: 27,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  publishActiveButtonWrap: {
    backgroundColor: "#FF6C00",
    width: "100%",
    height: 51,
    borderRadius: 100,
    marginTop: 27,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  publishButtonText: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#BDBDBD",
  },

  publishActiveButtonText: {
    color: "#FFFFFF",
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  deletePhotoButtonWrap: {
    alignItems: "center",
    marginTop: "20%",
  }
});
