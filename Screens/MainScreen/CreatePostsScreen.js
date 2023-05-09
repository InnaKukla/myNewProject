import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
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
import { Camera } from "expo-camera";
import { Fontisto, Feather } from "@expo/vector-icons";

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [location, setLocation] = useState(null);
  const [descriptionFoto, setDescriptionFoto] = useState("");
  const [descriptionLocality, setDescriptionLocality] = useState("");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync({});
  };

  const sendPhoto = () => {
    navigation.navigate("Home", {
      photo,
      descriptionFoto,
      descriptionLocality,
    });
    setDescriptionFoto("");
    setDescriptionLocality("");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(descriptionFoto);
    // console.log(descriptionLocality);
    setDescriptionFoto("");
    setDescriptionLocality("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View>
            <Camera style={styles.camera} ref={setCamera}>
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
            <TouchableOpacity>
              <Text style={styles.cameraButtonLoad}>Load foto</Text>
            </TouchableOpacity>
            <View style={styles.descriptionContainer}>
              <TextInput
                placeholder="Description"
                value={descriptionFoto}
                style={styles.inputDescriptionFoto}
                onChangeText={(value) =>
                  setDescriptionFoto((prevState) => ({
                    ...prevState,
                    descriptionFoto: value,
                  }))
                }
              ></TextInput>
            </View>
            <View style={styles.descriptionContainer}>
              <Feather
                name="map-pin"
                size={18}
                color="#BDBDBD"
                style={styles.iconLocality}
              />

              <TextInput
                placeholder="Locality"
                value={descriptionLocality}
                style={styles.inputDescriptionLocality}
                onChangeText={(value) =>
                  setDescriptionLocality((prevState) => ({
                    ...prevState,
                    descriptionLocality: value,
                  }))
                }
              ></TextInput>
            </View>
            <TouchableOpacity
              style={styles.publishButtonWrap}
              activeOpacity={0.8}
            >
              <Text onPress={sendPhoto} style={styles.publishButtonText}>
                Publish
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    width: 355,
    borderWidth: 1,
    borderRadius: 8,
  },
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
    bottom: 15,
  },
  publishButtonWrap: {
    width: 343,
    height: 51,
    backgroundColor: "#F6F6F6",
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
});
