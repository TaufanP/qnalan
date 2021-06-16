import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { pages as p } from "../constants";
import { ContactList, RoomChat, VideoCall } from "../screens";
import DrawerRoute from "./DrawerRoute";

const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={p.DrawerRoute}
      headerMode="none"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        // gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0
            ? 0
            : undefined,
        ...TransitionPresets.SlideFromRightIOS,
      })}
      mode="card"
    >
      <Stack.Screen name={p.DrawerRoute} component={DrawerRoute} />
      <Stack.Screen name={p.ContactList} component={ContactList} />
      <Stack.Screen name={p.RoomChat} component={RoomChat} />
      <Stack.Screen name={p.VideoCall} component={VideoCall} />
    </Stack.Navigator>
  );
};

export default MainRoute;
