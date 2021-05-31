import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { DrawerContent } from "../components";
import { pages as p } from "../constants";
import { HomeScreen, ProfileScreen } from "../screens";

const Drawer = createDrawerNavigator();

const DrawerRoute = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name={p.HomeScreen} component={HomeScreen} />
      <Drawer.Screen name={p.ProfileScreen} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
