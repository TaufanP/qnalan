import React from "react";
import { View } from "react-native";
import { HamburgerMenu } from "../../../../assets";
import { colorsPalette as cp, strings as str } from "../../../constants";
import { ButtonHeader, TextItem } from "../../atom";
import styles from "./styles";

interface HomeHeader {
  onPress?: any;
}

const HomeHeader = ({ onPress }: HomeHeader) => {
  const s = styles();
  return (
    <View style={s.container}>
      <ButtonHeader onPress={onPress}>
        <HamburgerMenu width={24} height={24} stroke={cp.white} />
      </ButtonHeader>
      <View style={s.midContent}>
        <TextItem type="header">{str.roomChat}</TextItem>
      </View>
    </View>
  );
};

export default HomeHeader;
