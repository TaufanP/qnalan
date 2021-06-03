import React, { FC, PropsWithChildren } from "react";
import { Image, StyleSheet, View } from "react-native";
import { User } from "../../../assets";
import { widthPercent } from "../../config";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { Button } from "../atom";

interface ProfilePhotoProps {
  onPress?: any;
  uri?: string;
}

const ProfilePhoto: FC<PropsWithChildren<ProfilePhotoProps>> = ({
  onPress,
  uri,
}) => {
  const s = styles();
  return (
    <Button onPress={onPress}>
      <View style={s.imageCont}>
        {uri?.length == 0 ? (
          <User
            fill={cp.main}
            width={widthPercent(14)}
            height={widthPercent(14)}
          />
        ) : (
          <Image style={s.image} source={{ uri }} />
        )}
      </View>
    </Button>
  );
};

const styles = () =>
  StyleSheet.create({
    imageCont: {
      justifyContent: "center",
      alignItems: "center",
      width: widthPercent(30),
      height: widthPercent(30),
      borderRadius: widthPercent(30),
      borderColor: cp.main,
      borderWidth: 2,
      marginBottom: sp.l,
      overflow: "hidden",
    },
    image: { width: "100%", height: "100%" },
  });

export default ProfilePhoto;
