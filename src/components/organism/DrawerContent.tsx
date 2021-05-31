import { DrawerNavigationState, ParamListBase } from "@react-navigation/core";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import React, { FC } from "react";
import { Linking, StyleSheet } from "react-native";
import { spacing as sp } from "../../constants";
import { Button, TextItem } from "../atom";
import { ProfileDrawer } from "../molecule";

interface DrawerContentProps {
  navigation: DrawerNavigationHelpers;
  state: DrawerNavigationState<ParamListBase>;
  descriptors: DrawerDescriptorMap;
}

const DrawerContent: FC<DrawerContentProps> = (props) => {
  const s = styles();
  return (
    <DrawerContentScrollView {...props} style={{ paddingHorizontal: sp.sm }}>
      <ProfileDrawer navigation={props.navigation} />
      <Button
        onPress={() => Linking.openURL("http://sbhumanbank.com/account")}
        style={s.buttonContainer}
      >
        <TextItem>SBHumanBank</TextItem>
      </Button>
      <Button
        onPress={() => Linking.openURL("http://sbhumanbank.com/account")}
        style={s.buttonContainer}
      >
        <TextItem type="normal14Red1">Logout</TextItem>
      </Button>
    </DrawerContentScrollView>
  );
};

const styles = () =>
  StyleSheet.create({
    buttonContainer: { paddingVertical: sp.s },
  });

export default DrawerContent;
