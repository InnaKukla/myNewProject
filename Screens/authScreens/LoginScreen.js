import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

const initialState = { email: "", password: "" };

export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/imageBackground.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.loginForm,
                ...Platform.select({
                  ios: {
                    marginBottom: isShowKeyboard ? -230 : 0,
                  },
                  android: {
                    paddingTop: isShowKeyboard ? 80 : 32,
                    marginBottom: isShowKeyboard ? -160 : 0,
                    marginTop: isShowKeyboard ? -50 : 0,
                  },
                }),
                // marginBottom: isShowKeyboard ? -230 : 0,
              }}
            >
              <Text style={styles.textLogin}>Войти</Text>
              <View>
                <TextInput
                  placeholder="Адрес электронной почты"
                  value={state.email}
                  style={styles.inputForm}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                ></TextInput>
                <View>
                  <TextInput
                    placeholder="Пароль"
                    style={styles.inputForm}
                    secureTextEntry={isShowPassword}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Text
                    style={styles.inputFormText}
                    onPress={() => setIsShowPassword((prevState) => !prevState)}
                  >
                    {isShowPassword ? "Показать" : "Скрыть"}
                  </Text>
                </View>

                <TouchableOpacity style={styles.buttonWrap} activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.underFormText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  loginForm: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    paddingTop: 32,
  },

  textLogin: {
    // position: "absolute",
    fontSize: 30,
    fontWeight: 500,
    // fontFamily: "RobotoRegular",
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.02,
    color: "#212121",
    // marginTop: 32,
    marginBottom: 33,
  },

  inputForm: {
    width: 343,
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 16,
    paddingLeft: 16,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    // textAlign: 'right',
    // justifyContent: 'space-around',
    alignItems: "flex-end",
  },
  inputFormText: {
    fontFamily: "RobotoRegular",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 19,
    fontSize: 16,
    position: "absolute",
    top: 16,
    left: 260,
    color: "#1B4371",
  },
  buttonWrap: {
    width: 343,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  buttonText: {
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },

  underFormText: {
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
    paddingBottom: 132,
  },
});
