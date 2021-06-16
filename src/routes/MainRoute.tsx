import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { pages as p } from "../constants";
import { ContactListScreen, RoomChatScreen, VideoCallScreen } from "../screens";
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
      <Stack.Screen name={p.ContactListScreen} component={ContactListScreen} />
      <Stack.Screen name={p.RoomChatScreen} component={RoomChatScreen} />
      <Stack.Screen name={p.VideoCallScreen} component={VideoCallScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;
