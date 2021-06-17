import auth from "@react-native-firebase/auth";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/core";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import React, { FC } from "react";
import { Linking, View } from "react-native";
import { useDispatch } from "react-redux";
import { Export, Power } from "../../../../assets";
import {
  colorsPalette as cp,
  pages as p,
  spacing as sp,
  strings as str,
} from "../../../constants";
import { loggingOut } from "../../../redux/actions";
import { Button, TextItem } from "../../atom";
import { ProfileDrawer } from "../../molecule";
import styles from "./styles";

interface DrawerContentProps {
  navigation: DrawerNavigationHelpers;
  state: DrawerNavigationState<ParamListBase>;
  descriptors: DrawerDescriptorMap;
}

const DrawerContent: FC<DrawerContentProps> = (props) => {
  const dispatch = useDispatch();
  const s = styles();

  const logoutPress = async () => {
    try {
      await auth().signOut();
      dispatch(loggingOut());
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
    <DrawerContentScrollView {...props} style={{ paddingHorizontal: sp.sm }}>
      <ProfileDrawer navigation={props.navigation} />
      <Button
        onPress={() => Linking.openURL("http://sbhumanbank.com/account")}
        style={s.buttonContainer}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Export
            width={14}
            height={14}
            fill={cp.white4}
            style={{ marginRight: sp.m }}
          />
          <TextItem>{str.provider}</TextItem>
        </View>
      </Button>
      <Button onPress={logoutPress} style={s.buttonContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Power
            width={14}
            height={14}
            fill={cp.red1}
            style={{ marginRight: sp.m }}
          />
          <TextItem type="normal14Red1">{str.logout}</TextItem>
        </View>
      </Button>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
