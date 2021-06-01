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
      <View
        style={{
          width: widthPercent(12),
          height: widthPercent(12),
          marginRight: 8,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: widthPercent(12),
            borderWidth: 1,
            borderColor: cp.white2,
          }}
        >
          <Image source={source} style={{ width: "100%", height: "100%" }} />
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <TextItem>{displayName || "Username"}</TextItem>
        {email?.length !== 0 && (
          <TextItem style={{ fontSize: 12 }}>{email}</TextItem>
        )}
      </View>
    </Button>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingVertical: 12,
    },
  });

export default ProfileDrawer;
