import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { HamburgerMenu, Search } from "../../../assets";
import { strings as str } from "../../constants";
import { ButtonHeader, TextItem } from "../atom";
interface HomeHeader {
  navigation?: CompositeNavigationProp<any, any>;
  onPress?: any;
}

const HomeHeader: FC<PropsWithChildren<HomeHeader>> = ({
  children,
  onPress,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <ButtonHeader onPress={onPress}>
        <HamburgerMenu width={24} height={24} stroke={"#FFF"} />
      </ButtonHeader>
      <View style={s.midContent}>
        <TextItem type="header">{str.roomChat}</TextItem>
      </View>
      {/* <ButtonHeader>
        <Search width={20} height={20} fill={"#FFF"} />
      </ButtonHeader> */}
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    midContent: { flex: 1, justifyContent: "center" },
    container: {
      flexDirection: "row",
    },
  });

export default HomeHeader;
