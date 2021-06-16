import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { PlaceholderUser } from "../../../assets";
import { widthPercent } from "../../config";
import { colorsPalette as cp, pages as p } from "../../constants";
import AppState from "../../redux";
import { Button, TextItem } from "../atom";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

interface ProfileDrawerProps {
  navigation: DrawerNavigationHelpers;
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({ navigation }) => {
  const {
    sessionReducer: { displayName, email, photoURL },
  } = useSelector((state: AppState) => state);

  const source = photoURL ? { uri: photoURL } : PlaceholderUser;

  const s = styles();
  return (
    <Button
      style={s.container}
      onPress={() => navigation.navigate(p.ProfileScreen)}
    >
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

const styles = () =>
  StyleSheet.create({
    childCont: {
      width: widthPercent(12),
      height: widthPercent(12),
      marginRight: 8,
    },
    details: { justifyContent: "center" },
    image: { width: "100%", height: "100%" },
    imageCont: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: widthPercent(12),
      borderWidth: 1,
      borderColor: cp.white2,
    },
    container: {
      flexDirection: "row",
      paddingVertical: 12,
    },
  });

export default ProfileDrawer;
