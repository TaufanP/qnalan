import auth from "@react-native-firebase/auth";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/core";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { Linking, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Export, Power } from "../../../../assets";
import { db } from "../../../config";
import {
  colorsPalette as cp,
  pages as p,
  strings as str,
  node as n,
} from "../../../constants";
import { loggingOut } from "../../../redux/actions";
import { Button, TextItem } from "../../atom";
import { ProfileDrawer } from "../../molecule";
import styles from "./styles";
import AppState from "../../../redux";

interface DrawerContentProps {
  navigation: DrawerNavigationHelpers;
  state: DrawerNavigationState<ParamListBase>;
  descriptors: DrawerDescriptorMap;
}

const DrawerContent = (props: DrawerContentProps) => {
  const dispatch = useDispatch();
  const {
    sessionReducer: { uid },
  } = useSelector((state: AppState) => state);
  const s = styles();

  const logoutPress = async () => {
    try {
      await auth().signOut();
      dispatch(loggingOut());
      db.ref(`${n.users}/${uid}`).update({ token: null });
      props.navigation.closeDrawer();
      // @ts-ignore
      props.navigation.replace(p.Auth);
    } catch (error) {
      dispatch(loggingOut());
      props.navigation.closeDrawer();
      // @ts-ignore
      props.navigation.replace(p.Auth);
    }
  };

  return (
    <DrawerContentScrollView {...props} style={s.drawerContentStyle}>
      <ProfileDrawer navigation={props.navigation} />
      <Button
        onPress={() => Linking.openURL("http://sbhumanbank.com/account")}
        style={s.buttonContainer}
      >
        <View style={s.iconCont}>
          <Export width={14} height={14} fill={cp.white4} style={s.iconStyle} />
          <TextItem>{str.provider}</TextItem>
        </View>
      </Button>
      <Button onPress={logoutPress} style={s.buttonContainer}>
        <View style={s.iconCont}>
          <Power width={14} height={14} fill={cp.red1} style={s.iconStyle} />
          <TextItem type="normal14Red1">{str.logout}</TextItem>
        </View>
      </Button>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
