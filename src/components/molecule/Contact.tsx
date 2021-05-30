import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, memo, PropsWithChildren } from "react";
import { Image, StyleSheet, View } from "react-native";
import { UsersProps } from "../../config/types";
import {
  strings as str,
  spacing as sp,
  colorsPalette as cp,
} from "../../constants";
import { Button, ButtonHeader, TextItem } from "../atom";
import { PlaceholderUser } from "../../../assets";
interface ContactProps {
  user: UsersProps;
  onPress?: any;
}

const Contact: FC<ContactProps> = ({ user, onPress }) => {
  const s = styles();
  const source = user?.photoURL ? { uri: user.photoURL } : PlaceholderUser;
  return (
    <Button style={s.container} onPress={onPress}>
      <View style={s.photoCont}>
        <Image source={source} style={s.photo} />
      </View>
      <TextItem>{user?.displayName || "Username"}</TextItem>
    </Button>
  );
};

const styles = () =>
  StyleSheet.create({
    photo: { width: "100%", height: "100%" },
    photoCont: {
      width: 40,
      height: 40,
      borderRadius: 40,
      borderColor: cp.white2,
      borderWidth: 1,
      marginRight: sp.sm,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    container: {
      flexDirection: "row",
      marginBottom: sp.sm,
      alignItems: "center",
      paddingHorizontal: sp.sm,
    },
  });

export default memo(Contact);
