import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { DrawerContent } from "../components";
import { pages as p } from "../constants";
import { HomeScreen, ProfileScreen, AuthScreen } from "../screens";

const Drawer = createDrawerNavigator();

const DrawerRoute = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName={p.HomeScreen}
    >
      <Drawer.Screen name={p.HomeScreen} component={HomeScreen} />
      <Drawer.Screen name={p.AuthScreen} component={AuthScreen} />
      <Drawer.Screen
        name={p.ProfileScreen}
        component={ProfileScreen}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
