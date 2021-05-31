import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { pages as p } from "../constants";
import { HomeScreen, ContactListScreen, RoomChatScreen } from "../screens";

const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={p.HomeScreen}
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
      <Stack.Screen name={p.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={p.ContactListScreen} component={ContactListScreen} />
      <Stack.Screen name={p.RoomChatScreen} component={RoomChatScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;
