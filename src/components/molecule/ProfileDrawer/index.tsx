import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { PlaceholderUser } from "../../../../assets";
import { pages as p } from "../../../constants";
import AppState from "../../../redux";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface ProfileDrawerProps {
  navigation: DrawerNavigationHelpers;
}

const ProfileDrawer = ({ navigation }: ProfileDrawerProps) => {
  const {
    sessionReducer: { displayName, email, photoURL },
  } = useSelector((state: AppState) => state);

  const source = photoURL ? { uri: photoURL } : PlaceholderUser;

  const s = styles();
  return (
    <Button style={s.container} onPress={() => navigation.navigate(p.Profile)}>
      <View style={s.childCont}>
        <View style={s.imageCont}>
          <Image source={source} style={s.image} />
        </View>
      </View>
      <View style={s.details}>
        <TextItem>{displayName || "Username"}</TextItem>
        {email?.length !== 0 && (
          <TextItem type="normal12Text1">{email}</TextItem>
        )}
      </View>
    </Button>
  );
};

export default ProfileDrawer;
