import React from "react";
import { Image, View } from "react-native";
import { User } from "../../../../assets";
import { widthPercent } from "../../../config";
import { colorsPalette as cp } from "../../../constants";
import { Button } from "../../atom";
import styles from "./styles";

interface ProfilePhotoProps {
  onPress?: any;
  uri?: string;
}

const ProfilePhoto = ({ onPress, uri }: ProfilePhotoProps) => {
  const s = styles();
  return (
    <Button onPress={onPress} style={{ alignItems: "center" }}>
      <View
        style={[
          s.imageCont,
          {
            borderWidth: uri?.length == 0 || uri?.length == undefined ? 2 : 0,
          },
        ]}
      >
        {uri?.length == 0 || uri?.length == undefined ? (
          <User
            fill={cp.main}
            width={widthPercent(14)}
            height={widthPercent(14)}
          />
        ) : (
          <Image style={s.image} source={{ uri }} resizeMode="cover" />
        )}
      </View>
    </Button>
  );
};

export default ProfilePhoto;
