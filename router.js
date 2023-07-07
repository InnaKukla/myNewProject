import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RegistrationScreen } from "./Screens/authScreens/RegistrationScreen";
import { LoginScreen } from "./Screens/authScreens/LoginScreen";
import { PostsScreen } from "./Screens/MainScreen/PostsScreen";
import { CreatePostsScreen } from "./Screens/MainScreen/CreatePostsScreen";
import { ProfileScreen } from "./Screens/MainScreen/ProfileScreen";

import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { authSingOutUser } from "./redux/auth/authOperation";
import { useDispatch } from "react-redux";


const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const goBack = () => {
  const navigation= useNavigation()
  return (
  <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
       <Text style={styles.iconBack}>
           <Feather name="arrow-left" color={"rgba(33, 33, 33, 0.8)"} size={24} />
         </Text>
         </TouchableOpacity>
  )
}

export const useRoute = (isAuth) => {
  const dispatch = useDispatch();
    const singOut = () => {
    dispatch(authSingOutUser())
  }

  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarItemStyle: {
          borderRadius: 20,
          width: 70,
          height: 40,
          marginTop: 9,
          marginRight: 15,
          marginLeft: 15
        },
        tabBarShowLabel: false,    //  new
     tabBarShowIcon: true,
        tabBarActiveBackgroundColor: "#FF6C00",
        
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16
        }
      }}
    >
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          // tabBarLabel: false,
          // headerShown: false,
          headerRight: () => (
            <TouchableOpacity onPress={singOut}>
              <Text style={styles.iconLogOut}>
                <Feather name="log-out" color={'gray'} size={24} />
              </Text>
            </TouchableOpacity>
          ),
          headerStyle: {
borderBottomWidth: 1
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={24} color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"} />
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTab.Screen
        backBehavior
        options={{
          
          // headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="plus" color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"} size={24} />
          ),
          headerLeft: () => goBack(),
          
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          // headerRight: () => (
          //   <TouchableOpacity onPress={singOut}>
          //     <Text style={styles.iconLogOut}>
          //       <Feather name="log-out" color={"gray"} size={24} />
          //     </Text>
          //   </TouchableOpacity>
          // ),
          
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="user"
              color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
              size={size}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    paddingTop: 27,
    // paddingRight: 10,
    // marginTop: 27,
  },

  iconLogOut: {
    marginBottom: 10,
    paddingRight: 10,
    // marginTop: 27,
  },
  iconBack: {
    paddingLeft: 16,
  },
});
