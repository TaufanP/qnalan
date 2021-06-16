import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { DrawerContent } from "../components";
import { pages as p } from "../constants";
import { Auth, HomeScreen, ProfileScreen, RoomListScreen } from "../screens";

const Drawer = createDrawerNavigator();

const DrawerRoute = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName={p.HomeScreen}
    >
      <Drawer.Screen name={p.HomeScreen} component={HomeScreen} />
      <Drawer.Screen name={p.RoomListScreen} component={RoomListScreen} />
      <Drawer.Screen name={p.Auth} component={Auth} />
      <Drawer.Screen
        name={p.ProfileScreen}
        component={ProfileScreen}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
