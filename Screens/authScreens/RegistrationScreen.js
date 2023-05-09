import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Keyboard,
  Button,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  console.log(navigation);

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
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
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
                ...styles.registerForm,
                marginBottom: isShowKeyboard ? -190 : 0,
                width: dimensions,
                ...Platform.select({
                  ios: {
                    marginBottom: isShowKeyboard ? -190 : 0,
                  },
                  android: {
                    marginTop: isShowKeyboard ? -50 : 0,
                    marginBottom: isShowKeyboard ? -160 : 0,
                    paddingTop: isShowKeyboard ? 80 : 92,
                  },
                }),
              }}
            >
              <View style={styles.imgWrap}>
                <Image
                  style={styles.buttonAddFoto}
                  source={require("../../assets/add.png")}
                />
              </View>
              <Text
                style={{
                  ...styles.textRegister,
                  ...Platform.select({
                    android: {
                      marginBottom: isShowKeyboard ? 10 : 33,
                    },
                  }),
                }}
              >
                Регистрация
              </Text>

              <View>
                <TextInput
                  placeholder="Логин"
                  value={state.login}
                  style={styles.inputForm}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                ></TextInput>
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
                    value={state.password}
                    style={styles.inputForm}
                    secureTextEntry={isShowPassword}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Text
                    style={styles.inputFormText}
                    onPress={() => {
                      setIsShowPassword((prevState) => !prevState);
                    }}
                  >
                    {isShowPassword ? "Показать" : "Скрыть"}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.buttonWrap}
                  activeOpacity={0.8}
                  onPress={keyboardHide}
                >
                  <Text style={styles.buttonText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.underFormText}>
                    Уже есть аккаунт? Войти
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
  registerForm: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    paddingTop: 92,
  },
  imgWrap: {
    position: "absolute",
    width: 120,
    height: 120,
    top: "-15%",
    left: "36%",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  buttonAddFoto: {
    position: "absolute",
    top: "65%",
    left: "90%",
    width: 25,
    height: 25,
  },
  textRegister: {
    // position: "absolute",
    fontSize: 30,
    fontWeight: 500,
    fontFamily: "RobotoMedium",
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.16,
    color: "#212121",
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
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
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
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },

  underFormText: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
    paddingBottom: 78,
  },
});
