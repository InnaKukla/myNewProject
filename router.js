import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RegistrationScreen } from "./Screens/authScreens/RegistrationScreen";
import { LoginScreen } from "./Screens/authScreens/LoginScreen";
import { PostsScreen } from "./Screens/MainScreen/PostsScreen";
import { CreatePostsScreen } from "./Screens/MainScreen/CreatePostsScreen";
import { ProfileScreen } from "./Screens/MainScreen/ProfileScreen";

import { MaterialCommunityIcons, Ionicons, Feather} from "@expo/vector-icons";


const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth ) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator >
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.iconLogOut}>
                <Feather name="log-out" color={"gray"} size={24} />
              </Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          // headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={35} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.iconBack}>
                <Feather name="arrow-left" color={"rgba(33, 33, 33, 0.8)"} size={24} />
              </Text>
            </TouchableOpacity>
          ),
        }}
        name="Create Posts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              color={color}
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
