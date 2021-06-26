import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import React from "react";
import { DrawerContent } from "../components";
import { pages as p } from "../constants";
import { Auth, Profile, RoomList } from "../screens";

const Drawer = createDrawerNavigator();

const DrawerRoute = () => {
  const drawerContent = (props: DrawerContentComponentProps) => (
    <DrawerContent {...props} />
  );
  return (
    <Drawer.Navigator
      drawerContent={drawerContent}
      initialRouteName={p.RoomList}
    >
      <Drawer.Screen name={p.RoomList} component={RoomList} />
      <Drawer.Screen name={p.Auth} component={Auth} />
      <Drawer.Screen
        name={p.Profile}
        component={Profile}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
