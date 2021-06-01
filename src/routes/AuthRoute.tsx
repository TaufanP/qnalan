import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { pages as p } from "../constants";
import { AuthScreen, HomeScreen } from "../screens";
import DrawerRoute from "./DrawerRoute";

const Stack = createStackNavigator();

const AuthRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={p.AuthScreen}
      headerMode="none"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0
            ? 0
            : undefined,
        ...TransitionPresets.SlideFromRightIOS,
      })}
      mode="card"
    >
      <Stack.Screen name={p.AuthScreen} component={AuthScreen} />
      <Stack.Screen name={p.DrawerRoute} component={DrawerRoute} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
