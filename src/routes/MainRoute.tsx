import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { LogBox } from "react-native";
import { pages as p } from "../constants";
import { ContactListScreen, RoomChatScreen } from "../screens";
import DrawerRoute from "./DrawerRoute";

LogBox.ignoreLogs(["swmansion"]);

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
      <Stack.Screen name={p.ContactListScreen} component={ContactListScreen} />
      <Stack.Screen name={p.RoomChatScreen} component={RoomChatScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;
