import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { pages as p } from "../constants";
import { Auth } from "../screens";
import DrawerRoute from "./DrawerRoute";

const Stack = createStackNavigator();

const AuthRoute = () => {
  const screenOptions = ({ route, navigation }: any) => ({
    headerShown: false,
    // gestureEnabled: true,
    cardOverlayEnabled: true,
    headerStatusBarHeight:
      navigation.dangerouslyGetState().routes.indexOf(route) > 0
        ? 0
        : undefined,
    ...TransitionPresets.SlideFromRightIOS,
  });
  return (
    <Stack.Navigator
      initialRouteName={p.Auth}
      headerMode="none"
      screenOptions={screenOptions}
      mode="card"
    >
      <Stack.Screen name={p.Auth} component={Auth} />
      <Stack.Screen name={p.DrawerRoute} component={DrawerRoute} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
