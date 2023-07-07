import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../nestedScreens/Home";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator >
      <NestedScreen.Screen options={{headerShown: false}} name="Home" component={Home} />
      <NestedScreen.Screen options={{headerBackTitleVisible: false }} name="Коментарі" component={CommentsScreen} />
      <NestedScreen.Screen options={{headerBackTitleVisible: false}} name="Карта" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
